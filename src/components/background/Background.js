import React, {useRef, useEffect, useLayoutEffect} from "react";
import { Canvas } from "react-three-fiber";
import { Box } from "./Box";
import { useThree } from "@react-three/fiber"
import {CameraControls} from "./CameraControls"



function ThreeHook() {
 
  useThree(({ camera }) => {
    camera.position.setZ(335);
  });

}



export const Background = () => {

  return (
    <div id="canvas-container">
      <Canvas resize={{scroll: false}}>
        <CameraControls />
        <ThreeHook />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        {Array(1500)
          .fill()
          .map((i) => (
            <Box key={i} />
          ))}
      </Canvas>
    </div>
  );
};
