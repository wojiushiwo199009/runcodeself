export class TilesFadePlugin {
  get fadeDuration() {
    return this._fadeManager.duration;
  }

  set fadeDuration(value) {
    this._fadeManager.duration = Number(value);
  }

  get fadingTiles() {
    return this._fadeManager.fadeCount;
  }

  constructor(options) {
    options = {
      maximumFadeOutTiles: 50,
      fadeRootTiles: false,
      fadeDuration: 250,
      ...options,
    };

    this.name = "FADE_TILES_PLUGIN";

    this.tiles = null;
    this._fadeManager = new FadeManager();
    this._initialLayerRendered = false;
    this._prevCameraTransforms = null;
    this._fadeGroup = null;
    this._tileMap = null;

    this.maximumFadeOutTiles = options.maximumFadeOutTiles;
    this.fadeRootTiles = options.fadeRootTiles;
    this.fadeDuration = options.fadeDuration;
  }
  init(tiles) {
    const fadeGroup = new Group();
    fadeGroup.name = "TilesFadeGroup";
    tiles.group.add(fadeGroup);

    const fadeManager = this._fadeManager;
    fadeManager.onFadeSetStart = () =>
      tiles.dispatchEvent({ type: "fade-start" });
    fadeManager.onFadeSetComplete = () =>
      tiles.dispatchEvent({ type: "fade-end" });
    fadeManager.onFadeComplete = onFadeComplete.bind(this);

    this.tiles = tiles;
    this._fadeManager = fadeManager;
    this._fadeGroup = fadeGroup;
    this._tileMap = new Map();
    this._prevCameraTransforms = new Map();

    tiles.cameras.forEach((camera) => {
      this._prevCameraTransforms.set(camera, new Matrix4());
    });

    this._onLoadModel = (e) => onLoadModel.call(this, e.scene, e.tile);
    this._onDisposeModel = (e) => onDisposeModel.call(this, e.scene);
    this._onTileVisibilityChange = (e) =>
      onTileVisibilityChange.call(this, e.scene, e.tile, e.visible);
    this._onAddCamera = (e) => onAddCamera.call(this, e.camera);
    this._onDeleteCamera = (e) => onDeleteCamera.call(this, e.camera);
    this._onUpdateBefore = () => onUpdateBefore.call(this);
    this._onUpdateAfter = () => onUpdateAfter.call(this);

    tiles.addEventListener("load-model", this._onLoadModel);
    tiles.addEventListener("dispose-model", this._onDisposeModel);
    tiles.addEventListener(
      "tile-visibility-change",
      this._onTileVisibilityChange
    );
    tiles.addEventListener("add-camera", this._onAddCamera);
    tiles.addEventListener("delete-camera", this._onDeleteCamera);
    tiles.addEventListener("update-before", this._onUpdateBefore);
    tiles.addEventListener("update-after", this._onUpdateAfter);
  }

  dispose() {
    const tiles = this.tiles;
    tiles.removeEventListener("load-model", this._onLoadModel);
    tiles.removeEventListener("dispose-model", this._onDisposeModel);
    tiles.removeEventListener(
      "tile-visibility-change",
      this._onTileVisibilityChange
    );
    tiles.removeEventListener("add-camera", this._onAddCamera);
    tiles.removeEventListener("delete-camera", this._onDeleteCamera);
    tiles.removeEventListener("update-before", this._onUpdateBefore);
    tiles.removeEventListener("update-after", this._onUpdateAfter);
  }
}
