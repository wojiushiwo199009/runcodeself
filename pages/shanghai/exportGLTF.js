import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
function exportGLTF(input) {
  var gltfExporter = new GLTFExporter();
  let options = {
    trs: false,
    onlyVisible: true,
    binary: true, //是否导出.gltf的二进制格式.glb控制导出.gltf还是.glb
  };
  gltfExporter.parse(
    input,
    function (result) {
      if (result instanceof ArrayBuffer) {
        save(
          new Blob([result], { type: "application/octet-stream" }),
          "scene.glb"
        );
      } else {
        var output = JSON.stringify(result, null, 2);
        save(new Blob([output], { type: "text/plain" }), "scene.gltf");
      }
    },
    options
  );
}
var link = document.createElement("a");
link.style.display = "none";
function save(blob, filename) {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
export { exportGLTF };
