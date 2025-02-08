import * as THREE from "../../js/three.module.js";
function CenterAll(group) {
  let box3 = new THREE.Box3();
  box3.expandByObject(group);
  console.log("查看包围盒box3", box3);
  let size = new THREE.Vector3();
  box3.getSize(size);
  console.log("查看返回的包围盒的尺寸", size);
  let center = new THREE.Vector3();
  box3.getCenter(center);
  console.log("几何中心", center);
}
export { CenterAll };
