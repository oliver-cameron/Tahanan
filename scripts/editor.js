import * as THREE from "three";
import { OrbitControls } from "orbit";
// import * as addons from "three/addons";
import { OBJLoader } from "obj";
import { MTLLoader } from "mtl";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const objloader = new OBJLoader();
const mtlloader = new MTLLoader();
mtlloader.load("assets/tinyhome.mtl", function (materials) {
  materials.preload();
  objloader.setMaterials(materials);
  objloader.load("assets/tinyhome.obj", function (object) {
    object.position.set(0, 0, 0);
    object.scale.set(0.01, 0.01, 0.01);
    let box = new THREE.Box3().setFromObject(object);
    let center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center);
    console.log(object);
    scene.add(object);
  });
});
// This code was written by a human that's why it sucks
const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
renderer.domElement.id = "threeCanvas";
document.getElementById("viewerContainer").appendChild(renderer.domElement);
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
camera.position.y = 5;
camera.position.z = 5;
camera.lookAt(0, 0, 0);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
function animate() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}
window.addEventListener("DOMContentLoaded", function (event) {
  console.log(
    window.getComputedStyle(document.body).getPropertyValue("--white"),
  );
  let white = window
    .getComputedStyle(document.body)
    .getPropertyValue("--white");
  scene.background = new THREE.Color(white);
});
