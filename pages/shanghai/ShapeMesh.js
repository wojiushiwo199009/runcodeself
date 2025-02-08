import * as THREE from "../../js/three.module.js";
let vector2Arr = [];
function ShapeMesh(pointsArr) {
  pointsArr.forEach((elem, index) => {
    vector2Arr.push(new THREE.Vector2(elem[0], elem[1]));
  });
  console.log(vector2Arr, "vvv");
  let shape = new THREE.Shape(vector2Arr);
  let geometry = new THREE.ShapeGeometry(shape);
  let material = new THREE.MeshLambertMaterial({
    color: 0x0099ff,
  });
  let mesh = new THREE.Mesh(geometry, material);
  console.log(mesh);
  return mesh;
}
export { ShapeMesh };
