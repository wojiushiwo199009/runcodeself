import * as THREE from "../../js/three.module.js";
import output_fragment from "./output_fragment.glsl.js";
let modal = new THREE.Group();
let c = [0, 0, 60, 0, 60, 80, 40, 120, -20, 80, 0, 0];
let geometry = new THREE.BufferGeometry(); //声名一个空几何体对象
let posArr = [];
let uvrr = [];
let h = 20;
for (let i = 0; i < c.length - 2; i += 2) {
  console.log(c[i]);
  // 三角形1 三个顶点坐标
  posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], 0, c[i + 2], c[i + 3], h);
  // 三角形2, 三个顶点坐标;
  posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], h, c[i], c[i + 1], h);

  // 注意顺序问题，和顶点位置坐标对应
  uvrr.push(0, 0, 0.3, 0, 0.3, 1);
  uvrr.push(0, 0, 0.3, 1, 0, 1);
}

console.log(posArr, "pos");
// 设置几何体position属性
geometry.attributes.position = new THREE.BufferAttribute(
  new Float32Array(posArr),
  3
);
// geometry.attributes.uv = new THREE.BufferAttribute(new Float32Array(uvrr), 2);
geometry.computeVertexNormals();
const wallbg = new THREE.TextureLoader().load("../../static/image/wall-bg.png");
var material = new THREE.MeshLambertMaterial({
  // color: 0xffff00,
  map: wallbg,
  side: THREE.DoubleSide,
  // wireframe: true, //查看三角形结构
  // transparent: true, //需要开启透明度计算，否则着色器透明度设置无效
  // opacity: 0.5, //整体改变透明度
  depthTest: false,
});

var mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);
console.log(mesh, "mss");
// modal.add(mesh);

plane();
roll();
function plane() {
  let gridHelper = new THREE.GridHelper(300, 15, 0x003333, 0x003333);
  modal.add(gridHelper);
  // let geometry = new THREE.PlaneGeometry(310, 310);
  // let material = new THREE.MeshLambertMaterial({
  //   // map:texture,
  //   color: 0xffff00,
  //   transparent: true,
  //   opacity: 0.9,
  //   side: THREE.DoubleSide,
  // });
  // let mesh = new THREE.Mesh(geometry, material);
  // mesh.position.y = 1;
  // modal.add(mesh);
  // mesh.rotateX(-Math.PI / 2);

  const texture = new THREE.TextureLoader().load(
    "../../static/image/wall-bg2.png"
  );
  texture.warpS = THREE.RepeatWrapping;
  texture.warpT = THREE.RepeatWrapping;
  texture.repeat.x = 3;
  texture.repeat.y = 1;
  // texture.rotation = Math.PI * 0.5;
  texture.center.x = 0.3;
  texture.center.y = 0.5;

  texture.offset.x = 0.4;
  texture.offset.y = 0.6;

  const uv = new Float32Array([0, 1, 0.3, 1, 0, 0, 0.3, 0]);
  const geometry = new THREE.PlaneGeometry(120, 20);

  // 定义顶点坐标（立方体）
  const vertices = new Float32Array([
    // 前面
    -1,
    -1,
    1, // 左下前
    1,
    -1,
    1, // 右下前
    1,
    1,
    1, // 右上前
    -1,
    1,
    1, // 左上前

    // 后面
    -1,
    -1,
    -1, // 左下后
    1,
    -1,
    -1, // 右下后
    1,
    1,
    -1, // 右上后
    -1,
    1,
    -1, // 左上后
  ]);

  // 定义顶点索引（12 个三角形）
  const indices = [
    // 前面
    0, 1, 2, 2, 3, 0,

    // 右面
    1, 5, 6, 6, 2, 1,

    // 后面
    5, 4, 7, 7, 6, 5,

    // 左面
    4, 0, 3, 3, 7, 4,

    // 顶面
    3, 2, 6, 6, 7, 3,

    // 底面
    4, 5, 1, 1, 0, 4,
  ];

  // 定义 UV 坐标
  const uvs = new Float32Array([
    // 前面
    0,
    0, // 左下前
    1,
    0, // 右下前
    1,
    1, // 右上前
    0,
    1, // 左上前

    // 后面
    0,
    0, // 左下后
    1,
    0, // 右下后
    1,
    1, // 右上后
    0,
    1, // 左上后
  ]);

  // 将顶点、索引和 UV 坐标添加到几何体中
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  // geometry.attributes.uv = new THREE.BufferAttribute(uv, 2);
  // const material = new THREE.MeshBasicMaterial({
  //   map: texture,
  //   side: THREE.DoubleSide,
  // });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  mesh.name = "flower";
  console.log(mesh, "mesh");
  modal.add(mesh);
}

function roll() {
  // 当我们需要在所有素材加载成 功后移除进度条并展示内容时，加载管理器就特别有用。
  const loadingManager = new THREE.LoadingManager();

  loadingManager.onStart = () => {
    console.log("loading started");
  };
  loadingManager.onLoad = () => {
    console.log("loading finished");
  };
  loadingManager.onProgress = () => {
    console.log("loading progressing");
  };
  loadingManager.onError = () => {
    console.log("loading error");
  };

  // 加载纹理
  const textureLoader = new THREE.TextureLoader(loadingManager);

  // 加载颜色纹理
  const colorTexture = textureLoader.load(
    "../../static/image/roll-bg.png" //反照率纹理
  );
  colorTexture.minFilter = THREE.NearestFilter;

  // 加载高度纹理（位移贴图）
  const heightTexture = textureLoader.load("../../static/image/roll-bg2.png");
  //加载透明度纹理
  const opacityTexture = textureLoader.load(
    "../../static/image/gray-floral.png"
  );
  // 加载环境光遮蔽纹理（AO纹理）
  const aoTexture = textureLoader.load("../../static/image/roll-bg3.png");
  // 法线纹理
  const normalTexture = textureLoader.load("../../static/image/55.awebp");
  // 加载金属度纹理：
  const metalnessTexture = textureLoader.load(
    "../../static/image/roll-bg4.png"
  );

  const geometry = new THREE.SphereGeometry(20, 32, 16);
  const material = new THREE.MeshStandardMaterial({
    map: colorTexture, // 颜色纹理
    aoMap: aoTexture, //AO纹理
    aoMapIntensity: 1, //控制AO效果的强度
    transparent: true,
    opacity: 1,
    displacementMap: heightTexture, // 高度纹理（位移贴图）
    displacementScale: 1, // 位移强度
    side: THREE.DoubleSide,
    emissive: 0x000000, //自发光
    metalness: 0.8, //控制整体金属度
    metalnessMap: metalnessTexture, // 金属度纹理
    roughness: 0.8, //控制整体粗糙度
    clearcoat: 1, //清漆层厚度
    clearcoatRoughness: 0.03, //清漆层粗糙度
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "roll";
  // mesh.position.set(20, 0, -30);
  console.log(mesh, "roll");
  // modal.add(mesh);

  const geometry1 = new THREE.BoxGeometry(100, 100, 100);
  const edges = new THREE.EdgesGeometry(geometry1);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xff0000 })
  );
  // modal.add(line);
}
export { modal };
