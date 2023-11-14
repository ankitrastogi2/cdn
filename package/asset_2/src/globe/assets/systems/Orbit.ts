import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Orbit extends OrbitControls {
  tick = () => this.update();
}

export { Orbit };
