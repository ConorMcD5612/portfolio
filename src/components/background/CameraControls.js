import React, { useRef} from 'react'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useThree, useFrame, extend } from "@react-three/fiber"

//https://codeworkshop.dev/blog/2020-04-03-adding-orbit-controls-to-react-three-fiber/

extend({OrbitControls})

export const CameraControls = () => {
const {
    camera, 
    //refrence to the canvas dom element 
    gl: {domElement},
} = useThree()

const controls = useRef()

//hook into animation loop, update controls each frame 
useFrame((state) => controls.current.update())

  return <orbitControls enabled={false} autoRotate={true} ref={controls} args={[camera, domElement]} />
  
}
