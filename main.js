import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const loader = new GLTFLoader();

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.SphereGeometry(10);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    opacity: 0.7,
    transparent: true,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('ocean.jpg');
scene.background = spaceTexture;

// Avatar

// const jeffTexture = new THREE.TextureLoader().load('russ.jpg');

// const jeff = new THREE.Mesh(
//   new THREE.BoxGeometry(3, 3, 3),
//   new THREE.MeshBasicMaterial({ map: jeffTexture })
// );

// scene.add(jeff);

// Fish
loader.load(
  './sea_star/scene.gltf',
  function (fish) {
    scene.add(fish.scene);
    fish.scene.scale.multiplyScalar(0.02);
    fish.scene.position.x = 3;
    fish.scene.position.z = -5;
    fish.scene.position.y = -2;
    console.log(fish.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Moon
loader.load(
  './scallop/scene.gltf',
  function (fish) {
    scene.add(fish.scene);
    fish.scene.scale.multiplyScalar(0.12);
    fish.scene.name = 'scallop';
    fish.scene.position.z = 30;
    fish.scene.position.y = -3;
    fish.scene.position.x = -10;
    console.log(fish.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

// scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

// jeff.position.z = -5;
// jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const fish = scene.getObjectByName('OSG_Scene');
  const scallop = scene.getObjectByName('scallop');
  console.log(fish);
  const t = document.body.getBoundingClientRect().top;

  if (fish) {
    fish.position.z = t * -0.01 - 5;
    fish.position.x = t * -0.0002 + 3;
    fish.position.y = -2;
    // fish.rotation.x += 0.05;
  }
  if (scallop) {
    scallop.rotation.x += 0.02;
    scallop.rotation.y += 0.04;
    scallop.rotation.z += 0.02;
  }

  // jeff.rotation.y += 0.01;
  // jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.005;

  moon.rotation.x += 0.005;

  const fish = scene.getObjectByName('OSG_Scene');
  if (fish) {
    fish.rotation.y += 0.005;
    fish.rotation.z += 0.001;
  }

  const scallop = scene.getObjectByName('scallop');
  if (scallop) {
    scallop.rotation.y += 0.02;
  }

  // controls.update();

  renderer.render(scene, camera);
}

animate();
