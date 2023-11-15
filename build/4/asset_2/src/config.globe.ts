export const globeConfig = {
  pointSize: 1,
  globeColor: 'rgb(23, 24, 81)',
  showAtmosphere: true,
  atmosphereColor: 'rgb(78, 105, 246)',
  atmosphereAltitude: 0.3,
  emissive: '',
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: 'white',
  ambientLight: '#000000',
  directionalLeftLight: '#000000',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
  arcTime: 1000,
  arcLength: 2,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const latLong = [
  {
    lat: 28.6139,
    lng: 77.209,
  },
  {
    lat: 3.139,
    lng: 101.6869,
  },
  {
    lat: -19.885592,
    lng: -43.951191,
  },
  {
    lat: -1.303396,
    lng: 36.852443,
  },
  {
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    lat: 36.162809,
    lng: -115.119411,
  },
  {
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    lat: 22.3193,
    lng: 114.1694,
  },
  {
    lat: -6.2088,
    lng: 106.8456,
  },
  {
    lat: 51.5072,
    lng: -0.1276,
  },
  {
    lat: -34.6037,
    lng: -58.3816,
  },
  {
    lat: 22.3193,
    lng: 114.1694,
  },
  {
    lat: 51.5072,
    lng: -0.1276,
  },
  {
    lat: 48.8566,
    lng: -2.3522,
  },
  {
    lat: 14.5995,
    lng: 120.9842,
  },
  {
    lat: 51.5072,
    lng: -0.1276,
  },
  {
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    lat: -33.8688,
    lng: 151.2093,
  },

  {
    lat: 1.094136,
    lng: -63.34546,
  },
  {
    lat: 37.5665,
    lng: 126.978,
  },
  {
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    lat: 22.3193,
    lng: 114.1694,
  },
  {
    lat: 51.5072,
    lng: -0.1276,
  },
  {
    lat: -19.885592,
    lng: -43.951191,
  },
  {
    lat: -8.833221,
    lng: 13.264837,
  },
  {
    lat: -33.936138,
    lng: 18.436529,
  },
  {
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    lat: 40.7128,
    lng: -74.006,
  },
  {
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    lat: -34.6037,
    lng: -58.3816,
  },
  {
    lat: -6.2088,
    lng: 106.8456,
  },
  {
    lat: 52.3676,
    lng: 4.9041,
  },
  {
    lat: -6.2088,
    lng: 106.8456,
  },
  {
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    lat: 22.3193,
    lng: 114.1694,
  },
  {
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    lat: 22.3193,
    lng: 114.1694,
  },
  {
    lat: 22.3193,
    lng: 114.1694,
  },
  {
    lat: 11.986597,
    lng: 8.571831,
  },
  {
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    lat: -22.9068,
    lng: -43.1729,
  },
  {
    lat: -34.6037,
    lng: -58.3816,
  },
  {
    lat: -33.936138,
    lng: 18.436529,
  },
  {
    lat: 21.395643,
    lng: 39.883798,
  },
  {
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    lat: 22.3193,
    lng: 114.1694,
  },
  {
    lat: 37.5665,
    lng: 126.978,
  },
  {
    lat: 41.902782,
    lng: 12.496366,
  },
  {
    lat: 28.6139,
    lng: 77.209,
  },
  {
    lat: 31.2304,
    lng: 121.4737,
  },
  {
    lat: 22.3193,
    lng: 114.1694,
  },
  {
    lat: 40.7128,
    lng: -74.006,
  },
  {
    lat: 6.5244,
    lng: 3.3792,
  },
  {
    lat: 40.7128,
    lng: -74.006,
  },
  {
    lat: -23.5505,
    lng: -46.6333,
  },
  {
    lat: -34.6037,
    lng: -58.3816,
  },
  {
    lat: -23.5505,
    lng: -46.6333,
  },
  {
    lat: -12.0464,
    lng: -77.0428,
  },
  {
    lat: -33.936138,
    lng: 18.436529,
  },
  {
    lat: 48.1351,
    lng: 11.582,
  },
  {
    lat: 55.7558,
    lng: 37.6173,
  },
  {
    lat: 49.2827,
    lng: -123.1207,
  },
  {
    lat: 24.8607,
    lng: 67.0011,
  },
  {
    lat: 19.076,
    lng: 72.8777,
  },
];

const arcs = Array.from({ length: 20 }, () => {
  const arraySize = latLong.length;
  const start = Math.floor(Math.random() * arraySize);
  const end = Math.floor(Math.random() * arraySize);
  const startLat = latLong[start].lat;
  const startLng = latLong[start].lng;
  const endLat = latLong[end].lat;
  const endLng = latLong[end].lng;

  return {
    startLat,
    startLng,
    endLat,
    endLng,
    color: '#b039a6',
  };
});
const random = Math.floor(Math.random() * latLong.length);
arcs.push({
  startLat: 52.520008,
  startLng: 13.404954, // Berlin
  endLat: latLong[random].lat,
  endLng: latLong[random].lng,
  color: '#b039a6',
});

export { arcs };
