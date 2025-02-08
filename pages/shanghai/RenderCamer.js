import * as THREE from "../../js/three.module.js";

let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.25,
  600
);
camera.position.set(114, 23, 135);
camera.lookAt(116, 25, 0);
export { camera };
