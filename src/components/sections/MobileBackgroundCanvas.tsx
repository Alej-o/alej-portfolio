"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { vertexShader, mobileShader } from "../../shaders/FluidShader.glsl";

function MobileBackground() {
  const { size } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(size.width, size.height) },
    uColor1: { value: new THREE.Color("#8B1538") },
    uColor2: { value: new THREE.Color("#A01B47") }, 
    uColor3: { value: new THREE.Color("#C4375F") }, 
    uColor4: { value: new THREE.Color("#4A0D1E") },
    uColorIntensity: { value: 0.85 }, 
    uFlow: { value: 0.4 },         
    uStreak: { value: 0.3 }         
  }), [size.width, size.height]);

  useFrame(() => {
    if (!mat.current) return;
    mat.current.uniforms.iTime.value = performance.now() * 0.001;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={mobileShader}
        uniforms={uniforms}
        glslVersion={THREE.GLSL1}
      />
    </mesh>
  );
}

export default function MobileBackgroundCanvas() {
  return (
    <Canvas
      orthographic
      frameloop="always"
      dpr={[1, 1]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power", preserveDrawingBuffer: false }}
      camera={{ position: [0, 0, 1], near: 0.1, far: 10, left: -1, right: 1, top: 1, bottom: -1 }}
      className="absolute inset-0"
      aria-hidden
      role="presentation"
      onCreated={({ gl }) => {
        gl.setClearColor(0x0f0807, 1);
      }}
    >
      <MobileBackground />
    </Canvas>
  );
}