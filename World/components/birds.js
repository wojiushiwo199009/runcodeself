import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel.js";

async function loadBirds() {
  const loader = new GLTFLoader();
  const parrotData = await loader.loadAsync("../../static/gltf/Parrot.glb");
  const flamingoData = await loader.loadAsync("../../static/gltf/Flamingo.glb");
  const storkData = await loader.loadAsync("../../static/gltf/Stork.glb");
  const parrot = setupModel(parrotData);
  parrot.scale.set(0.05, 0.05, 0.05);
  parrot.position.set(0, 0, 2.5);
  const flamingo = setupModel(flamingoData);
  flamingo.position.set(7.5, 0, -10);
  const stork = setupModel(storkData);
  stork.scale.set(0.05, 0.05, 0.05);
  stork.position.set(0, -2.5, -10);
  console.log(parrotData, "parrotData");
  return { parrot, flamingo, stork };
}
export { loadBirds };
