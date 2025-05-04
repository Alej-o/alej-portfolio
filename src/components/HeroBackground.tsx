"use client";

import React from "react"; 
import { useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { Plane } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "../shaders/GradientShader.glsl";

export const HeroBackground = () => {
  const shaderMaterialRef = React.useRef<THREE.ShaderMaterial>(null);
  const target = new THREE.Vector2();
  const { width, height } = useThree((state) => state.viewport);

  const shaderProps = {
    uniforms: {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2() },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    },
    vertexShader,
    fragmentShader,
  };

  useFrame(({ mouse, size }) => {
    const material = shaderMaterialRef.current;
    if (!material) return;

    material.uniforms.u_time.value += 0.005;
    target.set((mouse.x + 1) * 0.5, (mouse.y + 1) * 0.5);
    material.uniforms.u_mouse.value.lerp(target, 0.1);
    material.uniforms.u_resolution.value.set(size.width, size.height);
    console.log('mouse', mouse.x.toFixed(2), mouse.y.toFixed(2));
  });

  return (
    <Plane args={[width, height]}>
    <shaderMaterial
      ref={shaderMaterialRef}
      args={[shaderProps]}
      transparent
      depthWrite={false}
    />
  </Plane>
  );
};
