import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  canvas: document.querySelector("#bg"),
});
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
const controls = new OrbitControls(camera, renderer.domElement);
const scene = new THREE.Scene();

let boxArr = [];

function init() {
  const ambientLight = new THREE.AmbientLight(0xffffff);
  gsap.registerPlugin(ScrollTrigger);

  controls.enabled = false;
  controls.autoRotate = true;
  camera.position.setZ(550);
  renderer.setSize(window.innerWidth, window.innerHeight);


  scene.add(ambientLight);
}
init();

function addBox() {
  let boxSize = Math.floor(Math.random() * (30 - 7) + 10);
  const colors = ["0xFF0000", " 0x0000FF", "0xFFFF00"];
  const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  const material = new THREE.MeshPhysicalMaterial();
  const box = new THREE.Mesh(geometry, material);
  box.material.color.setHex(`${colors[Math.floor(Math.random() * 3)]}`);

  //random position of box's
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));
  box.position.set(x, y, z);

  scene.add(box);
  return box;
}

//generating boxes 
for (let i = 0; i < 1500; i++) {
  boxArr.push(addBox());
}

function randNum(spread) {
  let x = THREE.MathUtils.randFloatSpread(spread);
  return x;
}

//projects transition
boxArr.forEach((box) => {
  gsap.to(box.position, {
    x: randNum(1000),
    y: randNum(1000),
    z: randNum(1000),
    duration: 3,
    scrollTrigger: {
      trigger: ".projects",
      scrub: 3,
      end: "start",
    },
  });
});

//Contact page scroll animation
boxArr.forEach((box) => {
  gsap.to(box.scale, {
    scrollTrigger: {
      trigger: ".contact",
      scrub: 3,
      end: "start",
    },
    x: randNum(4),
    y: randNum(4),
    z: randNum(4),
    delay: 5,
    duration: 3,
  });
});

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
