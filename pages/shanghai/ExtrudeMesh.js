import * as THREE from "../../js/three.module.js";

const length = 12,
  width = 8;

const shape1 = new THREE.Shape();
shape1.moveTo(0, 0);
shape1.lineTo(0, width);
shape1.lineTo(length, width);
shape1.lineTo(length, 0);
shape1.lineTo(0, 0);

const extrudeSettings = {
  steps: 2,
  depth: 16,
  bevelEnabled: true, //有无倒角
  bevelThickness: 1,
  bevelSize: 1,
  bevelOffset: 0,
  bevelSegments: 1,
};

const geometry1 = new THREE.ExtrudeGeometry(shape1, extrudeSettings);
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh1 = new THREE.Mesh(geometry1, material1);
export { mesh1 };
