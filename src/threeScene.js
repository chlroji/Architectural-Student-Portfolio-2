import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function createThreeScene(containerSelector, objPath) {
  const container = document.querySelector(containerSelector);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070d0d);

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(2, 2, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const gridHelper = new THREE.GridHelper(10, 10, 0xffffff, 0xffffff);
  scene.add(gridHelper);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
  pointLight.position.set(2, 5, 5);
  scene.add(pointLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(0, 0, 0);
  controls.update();

  const objLoader = new OBJLoader();

  objLoader.load(
    objPath,
    (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          child.geometry.computeVertexNormals();
          child.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            wireframe: false,
            transparent: true,
          });
        }
      });

      object.position.set(0, 0, 0);
      object.scale.set(1, 1, 1);

      scene.add(object);
    },
    (xhr) => {
      console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      console.error("An error occurred while loading the model:", error);
    }
  );

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  return { scene, camera, renderer };
}
