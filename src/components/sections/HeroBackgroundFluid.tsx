// HeroBackgroundFluid.tsx
"use client";

import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef } from 'react';
import { fluidShader,vertexShader,displayShader } from '../../shaders/FluidShader.glsl';

export default function HeroBackgroundFluid() {
  const { gl, size, camera, scene } = useThree();

  const fluidPlane = useRef<THREE.Mesh>(null);
  const displayPlane = useRef<THREE.Mesh>(null);
  const lastMoveTime = useRef(0);
  const frameCount = useRef(0);
  const mouse = useRef({ x: 0, y: 0, px: 0, py: 0 });

  const rt1 = useMemo(() => new THREE.WebGLRenderTarget(size.width, size.height), [size]);
  const rt2 = useMemo(() => new THREE.WebGLRenderTarget(size.width, size.height), [size]);
  const currentRT = useRef(rt1);
  const previousRT = useRef(rt2);

  const fluidMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: fluidShader,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(size.width, size.height) },
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
      iFrame: { value: 0 },
      iPreviousFrame: { value: null },
      uBrushSize: { value: 20 },
      uBrushStrength: { value: 3.0 },
      uFluidDecay: { value: 0.985 },
      uTrailLength: { value: 0.995 },
    }
  }), [size]);

  const displayMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: displayShader,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(size.width, size.height) },
      iFluid: { value: null },
      uDistortionAmount: { value: 1.0 },
     
      uColor1: { value: new THREE.Color('#8b0a10') },
      uColor2: { value: new THREE.Color('#a30b12') },
      uColor3: { value: new THREE.Color('#FCE8DB') },
      uColor4: { value: new THREE.Color('#73080D') },
    }
  }), [size]);

  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(size.width, size.height);
    const fluid = new THREE.Mesh(geometry, fluidMaterial);
    const display = new THREE.Mesh(geometry, displayMaterial);
    fluidPlane.current = fluid;
    displayPlane.current = display;
    scene.add(display);

    const updateMouse = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = rect.height - (e.clientY - rect.top);
      mouse.current.px = mouse.current.x;
      mouse.current.py = mouse.current.y;
      mouse.current.x = x;
      mouse.current.y = y;
      lastMoveTime.current = performance.now();

      fluidMaterial.uniforms.iMouse.value.set(x, y, mouse.current.px, mouse.current.py);
    };

    

    window.addEventListener('mousemove', updateMouse);
  
    return () => {
      window.removeEventListener('mousemove', updateMouse);
    };
  }, [gl, fluidMaterial, displayMaterial, scene, size.width, size.height]);

 useFrame(() => {
  if (!fluidPlane.current || !displayPlane.current) return;

  const time = performance.now() * 0.001;
  const frame = frameCount.current++;

  fluidMaterial.uniforms.iTime.value = time;
  fluidMaterial.uniforms.iFrame.value = frame;
  fluidMaterial.uniforms.iPreviousFrame.value = previousRT.current.texture;

  displayMaterial.uniforms.iTime.value = time;
  displayMaterial.uniforms.iFluid.value = currentRT.current.texture;

  gl.setRenderTarget(currentRT.current);
  gl.render(fluidPlane.current, camera);

  gl.setRenderTarget(null);
  gl.render(displayPlane.current, camera);

  const temp = currentRT.current;
  currentRT.current = previousRT.current;
  previousRT.current = temp;
});



  return null;
}
