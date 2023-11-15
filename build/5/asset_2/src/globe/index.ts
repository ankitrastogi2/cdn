import { Fog, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
// import webgl as dynamic import

import { arcs as arcsDefault } from '../config.globe';
import { Globe } from './components/globe';
import { createLights } from './components/lights';
import { aspect, cameraZ, canvasHeight, canvasWidth } from './assets/systems/config';
import { createControls } from './assets/systems/controls';
import { Loop } from './assets/systems/loop';
import { Orbit } from './assets/systems/Orbit';
import { pointOfView } from './assets/systems/utils';

export type arcsProps = {
  order?: number;
  from?: string;
  to?: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng?: number;
  arcAlt?: number;
  color?: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

class World {
  static defaultProps = {
    initialPosition: { lat: 51.1657, lng: 10.4515 },
  };

  globeConfig: GlobeConfig = {};
  arcs: arcsProps[] = [];

  camera: PerspectiveCamera;
  controls: Orbit;
  renderer: WebGLRenderer;
  scene: Scene;
  loop: Loop;
  globe: Globe;

  constructor(container: Element, arcs?: arcsProps[], props?: GlobeConfig) {
    this.globeConfig.initialPosition = props?.initialPosition || World.defaultProps.initialPosition;
    this.globeConfig.pointSize = props?.pointSize;
    this.globeConfig.showAtmosphere = props?.showAtmosphere;
    this.globeConfig.atmosphereColor = props?.atmosphereColor;
    this.globeConfig.atmosphereAltitude = props?.atmosphereAltitude;
    this.globeConfig.polygonColor = props?.polygonColor;
    this.globeConfig.globeColor = props?.globeColor;
    this.globeConfig.emissive = props?.emissive;
    this.globeConfig.emissiveIntensity = props?.emissiveIntensity;
    this.globeConfig.shininess = props?.shininess;
    this.globeConfig.arcTime = props?.arcTime;
    this.globeConfig.arcLength = props?.arcLength;
    this.globeConfig.rings = props?.rings;
    this.globeConfig.maxRings = props?.maxRings;
    this.globeConfig.autoRotate = props?.autoRotate;
    this.globeConfig.autoRotateSpeed = props?.autoRotateSpeed;
    this.globeConfig.ambientLight = props?.ambientLight;
    this.globeConfig.directionalLeftLight = props?.directionalLeftLight;
    this.globeConfig.directionalTopLight = props?.directionalTopLight;
    this.globeConfig.pointLight = props?.pointLight;

    if (arcs) {
      arcs.map((arc) => this.arcs.push(arc));
    } else {
      arcsDefault.map((arc) => this.arcs.push(arc));
    }

    this.scene = new Scene();

    // this.scene =
    this.scene.fog = new Fog(0xffffff, 400, 2000);

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvasWidth(), canvasHeight());
    this.renderer.setClearColor(0xffaaff, 0);
    this.renderer.domElement.id = 'globe-canvas';

    this.camera = new PerspectiveCamera(50, aspect, 180, 1800);
    this.camera.position.set(0, 0, cameraZ);

    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = createControls({
      camera: this.camera,
      canvas: this.renderer.domElement,
      autoRotate: this.globeConfig.autoRotate,
      autoRotateSpeed: this.globeConfig.autoRotateSpeed,
    });
    this.controls.update();
    this.loop.updatables.push(this.controls);

    const { ambientLight, dLight, dLight1, dLight2 } = createLights({
      ambient: this.globeConfig.ambientLight,
      directionalLeft: this.globeConfig.directionalLeftLight,
      directionalTop: this.globeConfig.directionalTopLight,
      point: this.globeConfig.pointLight,
    });
    this.camera.add(ambientLight, dLight, dLight1, dLight2);

    this.globe = new Globe(
      {
        pointSize: this.globeConfig.pointSize,
        atmosphereColor: this.globeConfig.atmosphereColor,
        atmosphereAltitude: this.globeConfig.atmosphereAltitude,
        showAtmosphere: this.globeConfig.showAtmosphere,
        polygonColor: this.globeConfig.polygonColor,
        globeColor: this.globeConfig.globeColor,
        emissive: this.globeConfig.emissive,
        emissiveIntensity: this.globeConfig.emissiveIntensity,
        shininess: this.globeConfig.shininess,
        arcTime: this.globeConfig.arcTime,
        arcLength: this.globeConfig.arcLength,
        rings: this.globeConfig.rings,
        maxRings: this.globeConfig.maxRings,
      },
      this.arcs
    );
    this.globe.init();
    this.loop.updatables.push(this.globe.instance);

    this.scene.add(this.camera, this.globe.instance);

    pointOfView(this.camera, this.controls, this.globe.instance, this.globeConfig.initialPosition, 1000);

    const pJS_canvas_id = 'globe-canvas';

    const exist_canvas = document.getElementById(pJS_canvas_id);

    if (exist_canvas) {
      container.removeChild(exist_canvas);
    }

    container.prepend(this.renderer.domElement);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
    this.renderer.setAnimationLoop(null);
  }
}

export { World };
