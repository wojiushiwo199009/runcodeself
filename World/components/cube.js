import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
  MathUtils,
} from "../../js/three.module.js";

function createMaterial() {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load("../../static/image/texture/ring_9.png");
  texture.repeat.set(1, 1);
  // const material = new MeshStandardMaterial({ color: "purple" });
  const material = new MeshStandardMaterial({
    map: texture,
    emissive: "red",
    fog: true,
    metalness: 1,
    rotation: 30,
    bumpScale: 0.4,
    roughness: 1,
  });
  return material;
}
function createCube() {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = createMaterial();
  const cube = new Mesh(geometry, material);
  cube.rotation.set(-0.5, -0.1, 0.8); //旋转
  // cube.scale.set(2, 2, 2);
  // cube.position.z = 6;
  const radiansPerSecond = MathUtils.degToRad(30);
  // let idx = 1;
  // setTimeout(() => {
  //   idx = -1;
  //   console.log(cube.position.x);
  // }, 5000);
  // setTimeout(() => {
  //   idx = 0;
  // }, 10000);
  cube.tick = (delta) => {
    cube.rotation.z += radiansPerSecond * delta;

    cube.rotation.x += radiansPerSecond * delta;

    cube.rotation.y += radiansPerSecond * delta;
  };
  return cube;
}
export { createCube };
