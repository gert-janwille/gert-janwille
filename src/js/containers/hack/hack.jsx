import React, {Component} from 'react';
import Game from '../../game/stack/';

class Hack extends Component {

  state = {
    game: null
  }

  componentDidMount = () => this.setState({game: new Game(document.querySelector('#container'))});

  componentWillUnmount = () => {
    const {game} = this.state;
    game.quit();
  }

  render() {
    return(
      <div id="container">
        <p className="show-highscore">
          <span>Highscore</span>
          <b className='html-score'>0</b>
          <span>by <b className="html-username">Unknown</b></span>
        </p>

        <div id="game"></div>
        <div id="score">0</div>
        <div id="instructions">Click (or press the spacebar) to place the block</div>

        <div className="game-over">
          <h2>Game Over</h2>
          <p>You did great, you're the best.</p>
          <p>Click or spacebar to start again</p>
        </div>

        <div className="highscore">
          <h2>New Highscore</h2>
          <p>You received a highscore!</p>
          <p>Enter your name to show off</p>

          <div className="form">
            <input type="text" className='winner-username' placeholder='Enter your name'/>
            <a>Send</a>
          </div>
        </div>

        <div className="game-ready">
          <div id="start-button">Start</div>
          <div></div>
        </div>

    </div>
    )
  }
}

export default Hack;
