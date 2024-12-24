import {
  AmbientLight,
  HemisphereLight,
  DirectionalLight,
  MathUtils,
} from "../../js/three.module.js";
function createLights() {
  const mainLight = new DirectionalLight("white", 0.5); //光的颜色和强度
  mainLight.position.set(10, 10, 10);
  const ambientLight = new AmbientLight("white", 7);
  // const hemisphereLight = new HemisphereLight(
  //   "red", // bright sky color
  //   "dark", // dim ground color
  //   100 // intensity
  // );
  // hemisphereLight.position.set(10, 10, 10);
  const radiansPerSecond = MathUtils.degToRad(30);
  mainLight.tick = (delta) => {
    mainLight.position.z += radiansPerSecond * delta;

    mainLight.position.x += radiansPerSecond * delta;

    mainLight.position.y += radiansPerSecond * delta;
  };
  return { mainLight, ambientLight };
}
export { createLights };
