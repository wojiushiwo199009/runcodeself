import * as THREE from "../../js/three.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { modal } from "./modal.js";
import { camera } from "./RenderCamer.js";
// import {animate2}
let scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

scene.add(camera);

scene.add(modal);

const renderer = new THREE.WebGLRenderer({
  antialias: true, //抗锯齿
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
let controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(114, 23, 0); //改变中心点
// 平行光1
let directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
directionalLight.position.set(40, 20, 30);

// 平行光辅助对象
const directionalLighthelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1
);
scene.add(directionalLighthelper);
scene.add(directionalLight);
// 平行光2
let directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.6);
directionalLight2.position.set(-300, 600, -300);
scene.add(directionalLight2);
// 环境光
let ambient = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambient);
// 坐标系
const axesHelper = new THREE.AxesHelper(30);
scene.add(axesHelper);

animate2();
function animate2() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate2);
}

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // 使用鼠标位置和当前相机来更新射线投射器
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  console.log(intersects, "intersects");
  if (intersects.length > 0) {
    console.log(intersects[0].object.parent);
    // 通过.ancestors属性判断那个模型对象被选中了
    // outlinePass.selectedObjects = [intersects[0].object];
    //tag会标注在intersects[0].object.ancestors模型的局部坐标系原点位置
  } else {
  }
}
// 监听鼠标移动事件
document.addEventListener("click", onClick, false);
export { scene };
