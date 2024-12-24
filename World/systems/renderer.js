import { WebGLRenderer } from "../../../js/three.module.js";

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true }); //抗锯齿
  renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };
