import { AnimationMixer, MathUtils } from "../../js/three.module.js";
function setupModel(data) {
  console.log(data);
  const model = data.scene.children[0];
  const clip = data.animations[0];
  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  // 在点击开始按钮2秒后开始动画，并且动画播放速度变为原速度的0.5倍，halt到8秒逐渐停止动画
  action.startAt(2).setEffectiveTimeScale(0.5).halt(8).play();
  model.tick = (delta) => {
    const radiansPerSecond = Math.random();
    console.log(radiansPerSecond, data, "da");
    mixer.update(delta);
    if (radiansPerSecond > 0.5) {
      model.material.opacity = 0.5;
    }
    model.scale.set(
      radiansPerSecond * delta,
      radiansPerSecond * delta,
      radiansPerSecond * delta
    );
  };
  return model;
}
export { setupModel };
