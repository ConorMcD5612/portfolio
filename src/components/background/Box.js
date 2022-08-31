import React, { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import * as THREE from "three";



export const Box = (props) => {
 
  const colors = ["red", "yellow", "blue"];
  const boxSize = Math.floor(Math.random() * (30 - 7) + 10);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  const boxRef = useRef()

  gsap.registerPlugin(ScrollTrigger);

  const randomNum = (spread) => {
    let x = THREE.MathUtils.randFloatSpread(spread);
    return x;
  };
  
  
  //project page
  useEffect(() => {
    
    const expandAnimation = gsap.to(boxRef.current.position, {
      x: randomNum(1000),
      y: randomNum(1000),
      z: randomNum(1000),
      duration: 3,
      scrollTrigger: {
        trigger: ".projects",
        scrub: 3,
        end: "start",
      }
    });

    return () => {
      expandAnimation.kill();
      expandAnimation.scrollTrigger.kill();
    };
  }, []);

  useEffect(() => {
    const scaleAnimation = gsap.to(boxRef.current.scale, {
      scrollTrigger: {
        trigger: "form",
        scrub: 3,
        end: "start",
      },
      x: randomNum(4),
      y: randomNum(4),
      z: randomNum(4),
      duration: 3,
    });

    return () => {
      scaleAnimation.kill();
      scaleAnimation.scrollTrigger.kill();
    };
   
  }, []);

 
  return (
    <mesh className="box" ref={boxRef}  position={[x, y, z]}>
      <boxBufferGeometry args={[boxSize, boxSize, boxSize]} />
      <meshStandardMaterial color={colors[Math.floor(Math.random() * 3)]} />
    </mesh>
  );
};
