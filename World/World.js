import * as THREE from "../js/three.module.js";
import { createCamera } from "./components/camera.js";
import { createCube } from "./components/cube.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";
import { Train } from "./components/Train.js";
import { loadBirds } from "./components/birds.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import { createControls } from "./systems/controls.js";
let camera;
let renderer;
let scene;
let loop;
let controls;
let parrot,
  flamingo,
  stork,
  clock1,
  curBird = 0;
class World {
  constructor(container) {
    clock1 = new THREE.Clock();

    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    // 旋转
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    // 鼠标控制缩放平移等
    controls = createControls(camera, renderer.domElement);

    const cube = createCube();
    const { ambientLight, mainLight } = createLights();
    const train = new Train();
    // 复制对象的位置来将控件指向对象;
    // controls.target.copy(cube.position);
    // 旋转代码开始，
    // 选择不能与缩放一起打开，否则不起作用
    loop.updatables.push(controls, train);
    // loop.updatables.push(cube);
    // loop.updatables.push(camera);
    // loop.updatables.push(mainLight);
    // 旋转代码结束
    // 立方体
    // scene.add(cube);
    // scene.add(train);
    scene.add(mainLight, ambientLight);
    const geometry = new THREE.CylinderGeometry(5, 5, 3, 82, 1, false, 0, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cylinder = new THREE.Mesh(geometry, material);

    // 圆柱体
    const geometry1 = new THREE.CylinderGeometry(5, 5, 3, 82, 1, false, 2, 4);
    const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cylinder1 = new THREE.Mesh(geometry1, material1);
    const geometry2 = new THREE.CylinderGeometry(5, 5, 3, 82, 1, false, 4, 6);
    const material2 = new THREE.MeshBasicMaterial({ color: "blue" });
    const cylinder2 = new THREE.Mesh(geometry2, material2);

    // scene.add(cylinder);
    // scene.add(cylinder1);
    // scene.add(cylinder2);
    const resizer = new Resizer(container, camera, renderer);
    resizer.onResize = () => {
      this.render();
    };
    controls.addEventListener("change", () => {
      this.render();
    });
  }
  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }
  start() {
    loop.start();
  }
  stop() {
    loop.stop();
  }
  async init() {
    let data = await loadBirds();
    console.log(data, "da");
    parrot = data.parrot;
    flamingo = data.flamingo;
    stork = data.stork;
    console.log(parrot, "parrot");
    loop.updatables.push(parrot, flamingo, stork);

    scene.add(parrot, flamingo, stork);

    controls.target.copy(parrot.position);
    this.render();
  }

  nextPos() {
    console.log(
      scene,
      flamingo,
      camera,
      flamingo.position,
      flamingo.position.x
    );
    // camera.position.set(7.5, 0, 12.5);
    ++curBird;
    let children = scene.children;
    let objArr = [];
    scene.children.forEach((item) => {
      if (item.type == "Mesh") {
        objArr.push(item);
      }
    });
    if (curBird >= objArr.length) {
      curBird = 0;
    }

    camera.position.x = objArr[curBird].position.x;
    camera.position.y = objArr[curBird].position.y;
    controls.target.copy(objArr[curBird].position);
    this.render();
  }
}

export { World };
