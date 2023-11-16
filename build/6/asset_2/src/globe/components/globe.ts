import { Color } from 'three';
import { arcsProps } from '..';
import countries from '../assets/globe.json';
import { Globe as ThreeGlobe } from '../assets/systems/Globe';
import { genRandomNumbers, hexToRgb } from '../assets/systems/utils';

interface GlobeProps {
  pointSize?: number;
  atmosphereColor?: string;
  showAtmosphere?: boolean;
  atmosphereAltitude?: number;
  polygonColor?: string;
  globeColor?: string;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
}

class Globe {
  instance: ThreeGlobe;
  pointsData: {
    size: number;
    order: number;
    color: (t: number) => string;
    label: string;
    lat: number;
    lng: number;
  }[];

  pointSize: number;
  atmosphereColor: string;
  showAtmosphere: boolean;
  atmosphereAltitude: number;
  polygonColor: string;
  globeColor: string;
  emissive: string;
  emissiveIntensity: number;
  shininess: number;
  arcTime: number;
  arcLength: number;
  rings: number;
  maxRings: number;

  arcs: arcsProps[] = [];

  RING_PROPAGATION_SPEED = 3;
  interval = 2;
  deltaGlobe = 0;
  numbersOfRings = [0];

  static defaultProps = {
    pointSize: 1,
    atmosphereColor: '#ffffff',
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: 'rgba(255,255,255,0.7)',
    globeColor: '#1d072e',
    emissive: '#000000',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 3000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
  };

  constructor(props: GlobeProps, arcs: arcsProps[]) {
    this.pointSize = props.pointSize || Globe.defaultProps.pointSize;
    this.showAtmosphere = props.showAtmosphere || Globe.defaultProps.showAtmosphere;
    this.atmosphereColor = props.atmosphereColor || Globe.defaultProps.atmosphereColor;
    this.atmosphereAltitude = props.atmosphereAltitude || Globe.defaultProps.atmosphereAltitude;
    this.polygonColor = props.polygonColor || Globe.defaultProps.polygonColor;
    this.globeColor = props.globeColor || Globe.defaultProps.globeColor;
    this.emissive = props.emissive || Globe.defaultProps.emissive;
    this.emissiveIntensity = props.emissiveIntensity || Globe.defaultProps.emissiveIntensity;
    this.shininess = props.shininess || Globe.defaultProps.shininess;
    this.arcTime = props.arcTime || Globe.defaultProps.arcTime;
    this.arcLength = props.arcLength || Globe.defaultProps.arcLength;
    this.rings = props.rings || Globe.defaultProps.rings;
    this.maxRings = props.maxRings || Globe.defaultProps.maxRings;

    if (arcs.length > 0) {
      arcs.map((arc) => this.arcs.push(arc));
    }
    this.instance = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: false,
    });
    this.pointsData = [];

    this._buildData();
    this._buildMaterial();

    this.instance.tick = (delta: number) => this.tick(delta);
  }

  init() {
    this.initCountries(0);
    this.initAnimationData(0);
  }

  initCountries(delay: number) {
    setTimeout(() => {
      this.instance
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(this.showAtmosphere)
        .atmosphereColor(this.atmosphereColor)
        .atmosphereAltitude(this.atmosphereAltitude)
        .hexPolygonColor((e) => {
          return this.polygonColor;
        });
    }, delay);
  }

  initAnimationData(delay: number) {
    setTimeout(() => {
      this.instance
        .arcsData(this.arcs)
        .arcColor((e: any) => (e as { color: string }).color)
        .arcStroke(0.5)
        .arcDashLength(1)
        .arcDashInitialGap(1)
        .arcDashGap(2)
        .arcDashAnimateTime(() => Math.random() * 4000 + 3000)
        .pointsData(this.pointsData)
        .pointColor((e) => (e as { color: string }).color)
        .pointsMerge(true)
        .pointAltitude(0.0)
        .pointRadius(0.25)
        .ringsData([])
        .ringColor((e: any) => (t: any) => e.color(t))
        .ringMaxRadius(this.maxRings)
        .ringPropagationSpeed(this.RING_PROPAGATION_SPEED)
        .ringRepeatPeriod((this.arcTime * this.arcLength) / this.rings);
    }, delay);
  }

  tick(delta: number) {
    this.deltaGlobe += delta;
    if (this.deltaGlobe > this.interval) {
      this.numbersOfRings = genRandomNumbers(0, this.pointsData.length, Math.floor((this.pointsData.length * 4) / 5));
      this.instance.ringsData(this.pointsData.filter((d, i) => this.numbersOfRings.includes(i)));

      this.deltaGlobe = this.deltaGlobe % this.interval;
    }
  }

  _buildData() {
    const arcs = this.arcs;
    let points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      let str=arc.color;
      if(str===undefined)str="";
      const rgb = hexToRgb(str) as { r: number; g: number; b: number };
      points.push({
        size: this.pointSize,
        color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        label: arc.from || '',
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: this.pointSize,
        color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        label: arc.to || '',
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }
  }

  _buildMaterial() {
    const globeMaterial = this.instance.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(this.globeColor);
    globeMaterial.emissive = new Color(this.emissive);
    globeMaterial.emissiveIntensity = this.emissiveIntensity;
    globeMaterial.shininess = this.shininess;
  }
}

export { Globe };
