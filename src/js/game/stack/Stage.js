/*eslint no-undef: 0*/
import * as THREE from 'three';
import { TweenLite} from 'gsap';

class Stage {

  constructor(reactEL) {
    const _this = this;

    this.render = () => this.renderer.render(this.scene, this.camera);
    this.add = elem => this.scene.add(elem);
    this.remove = elem => this.scene.remove(elem);

    this.container = reactEL;

    // renderer
    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor('#ffffff', 1);
    this.container.appendChild(this.renderer.domElement);

    // scene
    this.scene = new THREE.Scene();

    // camera
    const aspect = window.innerWidth / window.innerHeight;
    const d = 20;
    this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, -100, 1000);
    this.camera.position.x = 2;
    this.camera.position.y = 2;
    this.camera.position.z = 2;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    //light
    this.light = new THREE.DirectionalLight(0xffffff, 0.5);
    this.light.position.set(0, 499, 0);
    this.scene.add(this.light);

    this.softLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(this.softLight);

    window.addEventListener('resize', function () { return _this.onResize(); });
    this.onResize();
  }

  setCamera = (y, speed = 0.3) => {
    TweenLite.to(this.camera.position, speed, { y: y + 4, ease: Power1.easeInOut });
    TweenLite.to(this.camera.lookAt, speed, { y: y, ease: Power1.easeInOut });
  };

  onResize = () => {
    const viewSize = 30;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.left = window.innerWidth / -viewSize;
    this.camera.right = window.innerWidth / viewSize;
    this.camera.top = window.innerHeight / viewSize;
    this.camera.bottom = window.innerHeight / -viewSize;
    this.camera.updateProjectionMatrix();
  };
}

export default Stage;
