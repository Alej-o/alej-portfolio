"use client";

import { Plane } from "@react-three/drei";
import { useFrame,useThree } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "../shaders/GradientShader.glsl";

export const HeroBackground = () => {
    const { viewport } = useThree();
  const uniforms = {
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2() },
    u_resolution: { value: new THREE.Vector2() },
  };

  const shaderProps = {
    uniforms,
    vertexShader,
    fragmentShader,
  };

  const target = new THREE.Vector2();

  useFrame(({ mouse, size }) => {
    uniforms.u_time.value += 0.005;
  
    const targetX = (mouse.x + 1) * 0.5;
    const targetY = (mouse.y + 1) * 0.5;
  
    target.set(targetX, targetY);
    uniforms.u_mouse.value.lerp(target, 0.1);
  
    uniforms.u_resolution.value.set(size.width, size.height);
    
  });

  return (
    <Plane args={[viewport.width, viewport.height]}>
  <shaderMaterial args={[shaderProps]} />
</Plane>
  );
};

//   const uniforms = {
//     u_time: { value: 0 },
//     u_mouse: { value: new THREE.Vector2() },
//     u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
//   };

//   const shader = {
//     uniforms,
//     vertexShader,
//     fragmentShader,
//   };

//   const target = new THREE.Vector2();

//   useFrame(({ mouse, size }) => {
//     // Time
//     uniforms.u_time.value += 0.005;

//     // Smooth mouse
//     target.set((mouse.x + 1) * 0.5, (mouse.y + 1) * 0.5);
//     uniforms.u_mouse.value.lerp(target, 0.1);

//     // Resolution
//     uniforms.u_resolution.value.set(size.width, size.height);
//   });

//   return (
//     <Plane args={[2, 2]}>
//       <shaderMaterial args={[shader]} />
//     </Plane>
//   );
// };
