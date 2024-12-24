import * as THREE from "../../js/three.module.js";
function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x00ff00);
  return scene;
}
export { createScene };
