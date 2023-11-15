import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Globe as threeGlobe } from './Globe';
import { Orbit } from './Orbit';

class Loop {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  updatables: [Orbit, threeGlobe];

  clock: Clock;

  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [] as unknown as [Orbit, threeGlobe];

    this.clock = new Clock();
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = this.clock.getDelta();

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };
