import * as THREE from "../../js/three.module.js";
import output_fragment from "./output_fragment.glsl.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

let modal = new THREE.Group();
// addText();
// 加载字体
function addText() {
  const fontLoader = new FontLoader();
  fontLoader.load("../../js/fonts/helvetiker_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry("Hello Three.js", {
      font: font,
      size: 5, // 表示文本大小，即字体高度，默认为 100
      height: 0.2, // 表示文本厚度，默认为 50
      curveSegments: 12, // 表示圆角段数，默认为 12
      bevelEnabled: true, // 表示是否启用斜角，默认为 false
      bevelThickness: 0.01, // 表示斜角的深度，默认为 10
      bevelSize: 0.01, // 表示斜角的高度，默认为 8
      bevelOffset: 0, // 表示斜角相对于文本的偏移量，默认为 0
      bevelSegments: 1, // 表示斜角的段数，默认为 3
    });

    const textMaterial = new THREE.MeshLambertMaterial({ color: "red" });
    const text = new THREE.Mesh(textGeometry, textMaterial);

    modal.add(text);
    setTimeout(() => {
      textGeometry.translate(
        -textGeometry.boundingSphere.center.x,
        -textGeometry.boundingSphere.center.y,
        -textGeometry.boundingSphere.center.z
      );
    }, 200);
  });
}
// five();
// 五边形的围墙
function five() {
  let c = [0, 0, 60, 0, 60, 80, 40, 120, -20, 80, 0, 0];
  let geometry = new THREE.BufferGeometry(); //声名一个空几何体对象
  let posArr = [];
  let uvrr = [];
  let h = 20;
  for (let i = 0; i < c.length - 2; i += 2) {
    console.log(c[i]);
    // 三角形1 三个顶点坐标
    posArr.push(
      c[i],
      c[i + 1],
      0,
      c[i + 2],
      c[i + 3],
      0,
      c[i + 2],
      c[i + 3],
      h
    );
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
  const wallbg = new THREE.TextureLoader().load(
    "../../static/image/wall-bg.png"
  );
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
  modal.add(mesh);
}

// plane();
// 六面体设置各个面的纹理
function plane() {
  let gridHelper = new THREE.GridHelper(300, 15, 0x003333, 0x003333);
  modal.add(gridHelper);

  const textureLoader = new THREE.TextureLoader();
  const textures = [
    textureLoader.load("../../static/image/wall-bg1.png"), // 前面
    textureLoader.load("../../static/image/wall-bg2.png"), // 右面
    textureLoader.load("../../static/image/wall-bg2.png"), // 后面
    textureLoader.load("../../static/image/wall-bg2.png"), // 左面
    textureLoader.load("../../static/image/wall-bg2.png"), // 顶面
    textureLoader.load("../../static/image/wall-bg2.png"), // 底面
  ];

  // 创建材质数组
  const materials = textures.map((texture, idx) => {
    if (idx != 0) {
      texture.warpS = THREE.RepeatWrapping;
      texture.warpT = THREE.RepeatWrapping;
      texture.repeat.x = 0.3;
      texture.repeat.y = 1;
      // texture.rotation = Math.PI * 0.5;
      texture.center.x = 0.4;
      texture.center.y = 0.5;
    }

    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
  });

  const mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), materials);
  mesh.position.set(0, 0, 0);
  mesh.name = "flower";
  console.log(mesh, "mesh");
  modal.add(mesh);
}

// roll();
// 加载球和线
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
  //标准材质
  //  const material = new THREE.MeshStandardMaterial({});
  // 物理材质
  const material = new THREE.MeshPhysicalMaterial({
    map: colorTexture, // 颜色纹理
    specularMap: colorTexture, //镜面高光纹理,调整物体的反射和高光效果，增强物体的光照效果。
    normalMap: normalTexture, //法线纹理,给物体表面添加细节和深度感。
    // flatShading: true, //控制材质的平滑程度 true 时，表示平面着色,false 时，表示光滑着色
    aoMap: aoTexture, //环境光遮蔽纹理（Ambient Occlusion Texture）」，调整物体表面的阴影和遮蔽效果。
    aoMapIntensity: 1, //控制AO效果的强度
    // alphaMap: opacityTexture, //透明度纹理，实现透明效果
    transparent: true,
    opacity: 1,
    // displacementMap: heightTexture, // 高度纹理（位移贴图）使物体表面产生凸起或凹陷的效果。
    displacementScale: 1, // 位移强度
    side: THREE.DoubleSide,
    // emissiveMap: "", //自发光纹理 实现物体表面的自发光效果，使物体更具有光泽感。
    // envMap:'',//环境纹理（Environment Texture）」，实现反射和折射效果。
    emissive: 0x000000, //自发光
    metalness: 0.8, //控制整体金属度
    // metalnessMap: metalnessTexture, // 金属度纹理
    roughness: 0.8, //控制整体粗糙度
    clearcoat: 1, //清漆层厚度
    clearcoatRoughness: 0.03, //清漆层粗糙度
    shininess: 100, //控制物体表面材质的反光效果，该值越高，表面越亮；
    clearcoat: 1,
    transmission: 0.8,
    reflectivity: 0.8,
    sheen: 0.8,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "roll";
  // mesh.position.set(20, 0, -30);
  console.log(mesh, "roll");
  modal.add(mesh);

  const geometry1 = new THREE.BoxGeometry(100, 100, 100);
  const edges = new THREE.EdgesGeometry(geometry1);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xff0000 })
  );
  modal.add(line);
}
depthShape();
// 渐变的有depth拉伸的立方体颜色设置
function depthShape() {
  // 创建一个示例网格
  const w = 50;
  const shape = new THREE.Shape();
  shape.moveTo(-w, -w);
  shape.lineTo(w, -w);
  shape.lineTo(w, w);
  shape.lineTo(-w, w);
  shape.lineTo(-w, -w);

  const extrudeSettings = {
    steps: 1,
    depth: -w,
    bevelEnabled: false,
  };
  const texture = new THREE.TextureLoader().load(
    "../../static/image/wall-bg2.png"
  );
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 },
    },
    vertexShader: `
    varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        void main() {
            // 计算到中心点的距离
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center);

            // 创建径向渐变效果，从橙到粉
            float gradient = smoothstep(0.0, 0.8, dist);
            vec3 orange = vec3(1.0, 0.65, 0.0);
            vec3 pink = vec3(1.0, 0.41, 0.71);

            // 在两个颜色之间进行插值
            vec3 color = mix(orange, pink, gradient);

            gl_FragColor = vec4(color, 1.0);
        }
    `,
  });

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  const mesh = new THREE.Mesh(geometry, material);
  // 手动设置UV坐标以实现整面渐变效果
  const uvs = [];
  const positions = geometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    // 将3D坐标映射到0-1的UV空间
    const x = (positions[i] + w) / (2 * w);
    const y = (positions[i + 1] + w) / (2 * w);
    uvs.push(x, y);
  }
  // 重新设置geometry的UV属性
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

  console.log(positions);

  console.log(geometry);
  modal.add(mesh);
}
export { modal };
