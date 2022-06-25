import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import gsapCore from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/all";
import { CameraHelper } from "three";
import { _getTarget } from "gsap/Observer";
import { MathUtils } from "three";
let boxRotation = true;
let spread = 300;
gsap.registerPlugin(ScrollTrigger);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  canvas: document.querySelector("#bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

function init() {
  controls.enabled = false;
  controls.autoRotate = true;
}

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

let boxArr = [];
init();
function addBox() {
  let boxSize = Math.floor(Math.random() * (30 - 7) + 10);
  const colors = ["0xFF0000", " 0x0000FF", "0xFFFF00"];

  const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  
  const material = new THREE.MeshPhysicalMaterial();
  const box = new THREE.Mesh(geometry, material);
  box.material.color.setHex(`${colors[Math.floor(Math.random() * 3)]}`);

  //its in the same position
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(spread));
  box.position.set(x, y, z);
  
  scene.add(box);
  return box;
}

for (let i = 0; i < 1500; i++) {
  boxArr.push(addBox());
}

camera.position.setZ(550);

function rotationAnimation() {
  // if (boxRotation) {
  //   for (let i = 0; i < boxArr.length; i++) {
  //     boxArr[i].rotation.x += Math.random() * 0.01;
  //     boxArr[i].rotation.z += Math.random() * 0.05;
  //     boxArr[i].rotation.y += Math.random() * 0.02;
  //   }
  // }
}

let projectsTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".projects",
    scrub: 3,
    markers: true,
    end: "start",
  },
});
init();
projectsTL.to(camera.position, { y: 0, duration: 3 });
boxArr.forEach((box) => {
  gsap.to(box.position, {
    x: boxPosition(1000),
    y: boxPosition(1000),
    z: boxPosition(1000),
    duration: 3,
    scrollTrigger: {
      trigger: ".projects",
      scrub: 3,
      end: "start",
    },
  });
});

function boxPosition(spread) {
  let x = THREE.MathUtils.randFloatSpread(spread);
  return x;
}

//Contact page scroll animation 
boxArr.forEach((box) => {
  // gsap.to(box.position, {
  //   scrollTrigger: {
  //     trigger: ".contact",
  //     scrub: 3,
  //     end: "start",
  //   },
  //   x: boxPosition(1500) ,
  //   z: boxPosition(1500) ,
  //   y: boxPosition(1500),
  //   duration: 5,
  // })

  gsap.to(box.scale, {
    scrollTrigger: {
      trigger: ".contact",
      scrub: 3,
      end: "start",
    },
    x: boxPosition(4),
    y: boxPosition(4),
    z: boxPosition(4),
    delay: 5,
    duration: 3,
  })
  
});


const axesHelper = new THREE.AxesHelper( 500 );
scene.add( axesHelper );
function animate() {
  controls.update();
  rotationAnimation();
  renderer.render(scene, camera);
  console.log(camera.position);
  requestAnimationFrame(animate);
}

animate();
