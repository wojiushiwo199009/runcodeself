import { OrbitControls } from "../../js/OrbitControls.js";
function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  //   禁用平移;
  controls.enablePan = true;
  //   启用阻尼
  controls.enableDamping = true;
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 10;
  //   controls.minDistance = 1;
  //   controls.maxDistance = 100;
  controls.listenToKeyEvents(window);
  controls.tick = () => controls.update();
  controls.saveState();

  // sometime later:
  controls.reset();
  return controls;
}
export { createControls };
