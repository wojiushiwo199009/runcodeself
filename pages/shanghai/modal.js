import * as THREE from "../../js/three.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ShapeMesh } from "./ShapeMesh.js";
import { CenterAll } from "./centerAll.js";
import { mesh1 } from "./ExtrudeMesh.js";
let modal = new THREE.Group();
let arr = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(60, 0),
  new THREE.Vector2(60, 80),
  new THREE.Vector2(40, 120),
  new THREE.Vector2(-20, 80),
];
console.log(arr, "arrr");
let shape = new THREE.Shape(arr);
let geometry = new THREE.ShapeGeometry(shape);
let material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  //   wireframe: true,
});
let mesh = new THREE.Mesh(geometry, material);
modal.add(mesh);
modal.add(mesh1);

let fileLoader = new THREE.FileLoader();
fileLoader.setResponseType("json");
fileLoader.load(
  "../../static/mock/dongyuanxian/dongyuan_polyline.geojson",
  function (data) {
    let buildGroup = new THREE.Group();
    data.features.forEach((build) => {
      buildGroup.add(ShapeMesh(build.geometry.coordinates[0]));
    });
    // buildGroup.translateX(-620);
    // buildGroup.translateY(22);
    CenterAll(buildGroup);
    modal.add(buildGroup);
  }
);

const geometry2 = new THREE.BufferGeometry();
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
// 因为在两个三角面片里，这两个顶点都需要被用到。
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

  1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
]);

// itemSize = 3 因为每个顶点都是一个三元组。
geometry2.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh2 = new THREE.Mesh(geometry2, material2);
modal.add(mesh2);

const geometry3 = new THREE.BufferGeometry();

const vertices3 = new Float32Array([
  -1.0,
  -1.0,
  1.0, // v0
  1.0,
  -1.0,
  1.0, // v1
  1.0,
  1.0,
  1.0, // v2
  -1.0,
  1.0,
  1.0, // v3
]);

const indices = [0, 1, 2, 2, 3, 0];

geometry3.setIndex(indices);
geometry3.setAttribute("position", new THREE.BufferAttribute(vertices3, 3));

const material3 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh3 = new THREE.Mesh(geometry3, material3);
modal.add(mesh3);

let loader = new GLTFLoader();
loader.load("../../static/gltf/city-shanghai/scene.gltf", function (gltf) {
  gltf.scene.scale.set(120, 120, 120);
  gltf.scene.translateX(120);
  gltf.scene.translateZ(120);
  modal.add(gltf.scene);

  let floor = gltf.scene.getObjectByName("Shanghai-09-Floor_Floor_0");
  floor.material = new THREE.MeshLambertMaterial({
    color: 0x444433,
  });

  let river = gltf.scene.getObjectByName("Shanghai-08-River_River_0");
  river.material = new THREE.MeshLambertMaterial({
    color: 0x336633,
  });

  gltf.scene.getObjectByName("Shanghai-01").traverse((object) => {
    if (object.type == "Mesh") {
      object.material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
      });
    }
  });
  let dongfangmingzhu = gltf.scene.getObjectByName(
    "04-dongfangmingzhu_dongfangmingzhu_0"
  );
  dongfangmingzhu.material = new THREE.MeshLambertMaterial({
    color: "red",
  });
});
export { modal };
