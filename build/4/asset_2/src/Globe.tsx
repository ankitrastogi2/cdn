import React, { useEffect } from 'react';
import { World } from './globe';
import { globeConfig } from './config.globe';
import { aspect } from './globe/assets/systems/config';

function GGlobe() {
  useEffect(() => {
    if (!document.getElementById('globe-canvas')) {
      const container = document.querySelector('#scene-container');
      const world = new World(container as Element, undefined, globeConfig);
      world.start();
    }

    const canvas = document.querySelector('#globe-canvas') as HTMLElement;
    const container = document.querySelector('#scene-container') as HTMLElement;

    const setCanvasSize = () => {
      if (window.innerWidth < 500) {
        canvas.style.width = '300px';
        canvas.style.height = `${300 / aspect}px`;
        container.style.width = '300px';
        container.style.height = '100px';
        container.style.top = '100px';
        container.style.position = 'relative';
      } else if (window.innerWidth < 768) {
        canvas.style.width = '500px';
        canvas.style.height = `${500 / aspect}px`;
        container.style.width = '500px';
        container.style.height = '500px';
        container.style.top = '0px';
        container.style.position = 'static';
      } else if (window.innerWidth < 1000) {
        canvas.style.width = '800px';
        canvas.style.height = `${800 / aspect}px`;
        container.style.width = '800px';
        container.style.height = '800px';
        container.style.top = '0px';
        container.style.position = 'static';
      } else {
        canvas.style.width = '1050px';
        canvas.style.height = `${1050 / aspect}px`;
        container.style.width = '1050px';
        container.style.height = '1050px';
        container.style.top = '0px';
        container.style.position = 'static';
      }
    };

    setCanvasSize();

    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return <div id="scene-container" className="w-[1000px] h-[1000px] flex items-center justify-center"></div>;
}

export default GGlobe;
