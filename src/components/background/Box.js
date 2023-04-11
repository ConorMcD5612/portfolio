import React, { useRef, useLayoutEffect, useEffect, useMemo,  } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";


const fragmentShader = `
varying vec2 vUvs;
varying vec3 vNormal;
varying vec3 vPosition;

uniform vec3 size;
uniform float time;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

vec3 linearTosRGB(vec3 value ) {
  vec3 lt = vec3(lessThanEqual(value.rgb, vec3(0.0031308)));
  
  vec3 v1 = value * 12.92;
  vec3 v2 = pow(value.xyz, vec3(0.41666)) * 1.055 - vec3(0.055);

	return mix(v2, v1, lt);
}

float edgeFactor(vec2 p){
    	vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p) / 3.0;
  		return min(grid.x, grid.y);
}



void main() {
 vec3 baseColor;
 
 baseColor = vec3(0.5, 1.0, vUvs.x); 
 
 
vec3 lighting = vec3(0.0);
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(cameraPosition - vPosition);

  // Ambient
  vec3 ambient = vec3(0.5);

  // Hemi light
  vec3 skyColor= vec3(0.0, 0.3, 0.6);
  vec3 groundColor = vec3(0.6, 0.3, 0.1);

  float hemiMix = remap(normal.y, -1.0, 1.0, 0.0, 1.0);
  vec3 hemi = mix(groundColor, skyColor, hemiMix);

  // Diffuse lighting
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 lightColor = vec3(1.0, 1.0, 0.9);
  float dp = max(0.5, dot(lightDir, normal));

  vec3 diffuse = dp * lightColor;

  // Phong specular
  vec3 r = normalize(reflect(-lightDir, normal));
  float phongValue = max(0.0, dot(viewDir, r));
  phongValue = pow(phongValue, 32.0);

  vec3 specular = vec3(phongValue);

  lighting = ambient * .5 + hemi * .5 + diffuse * .3;

  float a = edgeFactor(vUvs);

  vec3 color = baseColor * lighting + specular;

  // color = linearTosRGB(color);
  color = pow(color, vec3(1.0 / 2.2));
  baseColor = mix(vec3(1), color, a);

  gl_FragColor = vec4(baseColor, 1.0);
}

`;

const vertexShader = `
varying vec2 vUvs;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float time;

mat3 rotateY(float radians)
{
  float s = sin(radians);
  float c = cos(radians);

  return mat3(
    c, 0.0, s,
    0.0, 1.0, 0.0,
    -s, 0.0, c
  );
}
void main() {
  vec3 localSpacePosition = position;
  localSpacePosition = rotateY(time) * localSpacePosition;

gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0);
  vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vUvs = uv;
}
`;




export const Box = (props) => {
 
  const colors = ["red", "yellow", "blue"];
  const boxSize = Math.floor(Math.random() * 23 + 10);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  const boxRef = useRef()

  gsap.registerPlugin(ScrollTrigger);

  const randomNum = (spread) => {
    let x = THREE.MathUtils.randFloatSpread(spread);
    return x;
  };
  
  const uniforms = useMemo(
    () => ({
      time: {
        value: 0.0
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    boxRef.current.material.uniforms.time.value = clock.getElapsedTime();
    
  });
  
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
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
    </mesh>
  );
};
