/*eslint no-undef: 0*/
import * as THREE from 'three';
import { TweenLite } from 'gsap';

import Stage from './Stage';
import Block from './Block';

import GamesAPI from '../../lib/api/games';
import token from '../../lib/token';

class Game {

  constructor(reactEL) {
    const _this = this;

    this.STATES = {
      'LOADING': 'loading',
      'PLAYING': 'playing',
      'READY': 'ready',
      'ENDED': 'ended',
      'RESETTING': 'resetting',
      'HIGHSCORE': 'highscore'
    };

    this.highscore = {
      score: 2,
      username: 'Gert-Jan Wille'
    };

    GamesAPI.get('stack')
      .then(({scores}) => this.highscore = this.setHighscore(scores))

    this.blocks = [];
    this.state = this.STATES.LOADING;
    this.stage = new Stage(reactEL);

    this.mainContainer = document.getElementById('container');
    this.scoreContainer = document.getElementById('score');
    this.startButton = document.getElementById('start-button');
    this.instructions = document.getElementById('instructions');

    this.scoreContainer.innerHTML = '0';

    this.newBlocks = new THREE.Group();
    this.placedBlocks = new THREE.Group();
    this.choppedBlocks = new THREE.Group();

    this.stage.add(this.newBlocks);
    this.stage.add(this.placedBlocks);
    this.stage.add(this.choppedBlocks);

    this.addBlock();
    this.tick();
    this.updateState(this.STATES.READY);

    document.addEventListener('keydown', e => (e.keyCode === 32) ? _this.onAction() : null);
    document.addEventListener('click', () => _this.onAction());
    document.addEventListener('touchstart', e => {
        e.preventDefault();
        // this.onAction();
    });

    document.querySelector('.highscore a').addEventListener('click', () => _this.saveHighscore());
  }

  updateState = (newState) => {
    for (const key in this.STATES) this.mainContainer.classList.remove(this.STATES[key]);
    this.mainContainer.classList.add(newState);
    this.state = newState;
  };

  onAction = () => {
    switch (this.state) {
      case this.STATES.READY:
        this.startGame();
        break;

      case this.STATES.PLAYING:
        this.placeBlock();
        break;

      case this.STATES.ENDED:
        this.restartGame();
        break;

      case this.STATES.HIGHSCORE:
        break;

      default:
        this.restartGame();
    }
  };

  startGame = () => {
    if (this.state === this.STATES.PLAYING) return;
    this.scoreContainer.innerHTML = '0';
    this.updateState(this.STATES.PLAYING);
    this.addBlock();
  };

  restartGame = () => {
    const _this = this;

    this.updateState(this.STATES.RESETTING);

    const oldBlocks = this.placedBlocks.children;
    const removeSpeed = 0.2;
    const delayAmount = 0.02;

    for (let i = 0; i < oldBlocks.length; i++) {
      TweenLite.to(oldBlocks[i].scale, removeSpeed, { x: 0, y: 0, z: 0, delay: (oldBlocks.length - i) * delayAmount, ease: Power1.easeIn, onComplete: () => _this.placedBlocks.remove(oldBlocks[i]) });
      TweenLite.to(oldBlocks[i].rotation, removeSpeed, { y: 0.5, delay: (oldBlocks.length - i) * delayAmount, ease: Power1.easeIn });
    }

    const cameraMoveSpeed = removeSpeed * 2 + (oldBlocks.length * delayAmount);
    const countdown = { value: this.blocks.length - 1 };

    this.stage.setCamera(2, cameraMoveSpeed);
    TweenLite.to(countdown, cameraMoveSpeed, { value: 0, onUpdate: () => _this.scoreContainer.innerHTML = String(Math.round(countdown.value)) });
    this.blocks = this.blocks.slice(0, 1);

    setTimeout(() => _this.startGame(), cameraMoveSpeed * 1000);
  };

  placeBlock = () => {
    const _this = this;

    const currentBlock = this.blocks[this.blocks.length - 1];
    const newBlocks = currentBlock.place();

    this.newBlocks.remove(currentBlock.mesh);

    if (newBlocks.placed) this.placedBlocks.add(newBlocks.placed);
    if (!newBlocks.chopped) return this.addBlock();

    this.choppedBlocks.add(newBlocks.chopped);

    const positionParams = { y: '-=30', ease: Power1.easeIn, onComplete: () => _this.choppedBlocks.remove(newBlocks.chopped) };
    const rotateRandomness = 10;
    const rotationParams = {
      delay: 0.05,
      x: newBlocks.plane === 'z' ? ((Math.random() * rotateRandomness) - (rotateRandomness / 2)) : 0.1,
      z: newBlocks.plane === 'x' ? ((Math.random() * rotateRandomness) - (rotateRandomness / 2)) : 0.1,
      y: Math.random() * 0.1,
    };

    (newBlocks.chopped.position[newBlocks.plane] > newBlocks.placed.position[newBlocks.plane])
      ? positionParams[newBlocks.plane] = '+=' + (40 * Math.abs(newBlocks.direction))
      : positionParams[newBlocks.plane] = '-=' + (40 * Math.abs(newBlocks.direction));

    TweenLite.to(newBlocks.chopped.position, 1, positionParams);
    TweenLite.to(newBlocks.chopped.rotation, 1, rotationParams);

    this.addBlock();
  };

  addBlock = () => {
    const lastBlock = this.blocks[this.blocks.length - 1];

    if (lastBlock && lastBlock.state === lastBlock.STATES.MISSED) return this.endGame();
    this.scoreContainer.innerHTML = String(this.blocks.length - 1);

    const newKidOnTheBlock = new Block(lastBlock);
    this.newBlocks.add(newKidOnTheBlock.mesh);
    this.blocks.push(newKidOnTheBlock);

    this.stage.setCamera(this.blocks.length * 2);

    if (this.blocks.length >= 5) this.instructions.classList.add('hide');
  };

  endGame = () => (this.blocks.length - 2 > this.highscore.score) ? this.updateState(this.STATES.HIGHSCORE) : this.updateState(this.STATES.ENDED);

  tick = () => {
    const _this = this;
    this.blocks[this.blocks.length - 1].tick();
    this.stage.render();
    this.animationFrame = requestAnimationFrame(() => _this.tick());
  };

  setHighscore = (scores) => {
    const {score, username} = scores;
    document.querySelector('.html-score').innerHTML = score;
    document.querySelector('.html-username').innerHTML = username;
    return scores;
  }

  saveHighscore = () => {
    const score = this.blocks.length - 2;
    let username = document.querySelector('.highscore input').value;
    if (username.trim() === '') username = 'unknown';

    GamesAPI.insert({type: 'stack', username, score}, {token: JSON.parse(token.get())})
      .then(newhighscore => this.highscore = this.setHighscore(newhighscore))
      .then(this.restartGame());
  }

  quit = () => {
    cancelAnimationFrame(this.animationFrame);
    this.scene = null;
    this.projector = null;
    this.camera = null;
    this.controls = null;
  };
}

export default Game
