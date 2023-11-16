const aspect = 1.2;
const cameraZ = 300;

const canvasWidth = () => 1000;

const canvasHeight = () => canvasWidth() / aspect;

// const canvasHeight = () => container()?.offsetHeight ?? 500;
// const canvasWidth = () => canvasHeight() * aspect;

export { aspect, cameraZ, canvasWidth, canvasHeight };
