import { PerspectiveCamera, MathUtils } from "../../js/three.module.js";
function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 12.5);
  const radiansPerSecond = MathUtils.degToRad(30);
  camera.tick = (delta) => {
    camera.position.z += delta * 1;
  };
  return camera;
}
export { createCamera };
