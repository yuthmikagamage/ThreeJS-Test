import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
const colors = [
  new THREE.Color(1, 0, 0),
  new THREE.Color(0, 1, 0),
  new THREE.Color(0, 0, 1),
  new THREE.Color(1, 1, 1),
];

let index = 0;

const clock = new THREE.Clock();
let accumulator = 0;
const interval = 1000;

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function animate() {
  const delta = clock.getDelta() * 1000;
  accumulator += delta;

  if (accumulator >= interval) {
    cube.material.color.copy(colors[index]);
    index = (index + 1) % colors.length;
    accumulator = 0;
  }

  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
