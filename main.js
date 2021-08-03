import './style.css';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// import { } from 'three/examples/jsm/loaders/BasisTextureLoader'

var loadProgress = 0;

import oceanURI from './ocean2.jpg';
import scallop_texture_uri from './scallop_texture.png';
import seastar_texture_uri from './seastar_texture.jpeg';

const loader = new DRACOLoader();
loader.setDecoderPath('./draco/');

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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
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
const oceanTexture = new THREE.TextureLoader().load(oceanURI);
scene.background = oceanTexture;

//Load seastar
const seastarTexture = new THREE.TextureLoader().load(seastar_texture_uri);
// Sea Star
loader.load(
  './seastar.drc',
  function (geometry) {
    const material = new THREE.MeshStandardMaterial({ map: seastarTexture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.multiplyScalar(0.03);
    mesh.name = 'seastar';
    mesh.position.z = -5;
    mesh.position.y = -1;
    mesh.position.x = 3;
    scene.add(mesh);
    loadProgress++;
    if (loadProgress === 2) {
      document.querySelector('body').classList.toggle('loaded');
    }
  },
  // called as loading progresses
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

//Load scallop
const scallopTexture = new THREE.TextureLoader().load(scallop_texture_uri);

loader.load(
  './scallop.drc',
  function (geometry) {
    const material = new THREE.MeshStandardMaterial({ map: scallopTexture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.multiplyScalar(0.08);
    mesh.name = 'scallop';
    mesh.position.z = 17;
    mesh.position.y = 0;
    mesh.position.x = -10;
    scene.add(mesh);
    loadProgress++;
    if (loadProgress === 2) {
      document.querySelector('body').classList.toggle('loaded');
    }
  },
  // called as loading progresses
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

// Scroll Animation

function moveCamera() {
  const fish = scene.getObjectByName('seastar');
  const scallop = scene.getObjectByName('scallop');
  const t = document.body.getBoundingClientRect().top;

  if (fish) {
    fish.position.z = t * -0.01 - 5;
    fish.position.x = t * -0.0002 + 3;
    fish.position.y = -1;
    // fish.rotation.x += 0.05;
  }
  if (scallop) {
    scallop.rotation.x += 0.015;
    scallop.rotation.y += 0.03;
    scallop.rotation.z += 0.015;
    if (t < -3000) {
      scallop.position.z = (t + 3000) * -0.005 + 17;
      scallop.position.x = (t + 3000) * -0.0002 - 10;
    }
  }

  // jeff.rotation.y += 0.01;
  // jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  // camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.001;
  torus.rotation.y += 0.001;
  torus.rotation.z += 0.001;

  const fish = scene.getObjectByName('seastar');
  if (fish) {
    fish.rotation.x -= 0.0017;
    fish.rotation.z += 0.009;
  }

  const scallop = scene.getObjectByName('scallop');
  if (scallop) {
    scallop.rotation.y += 0.01;
  }

  // controls.update();

  renderer.render(scene, camera);
}

animate();
