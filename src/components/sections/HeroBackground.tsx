"use client";

import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef } from 'react';

import { vertexShader, fluidShader, displayShader } from '../../shaders/FluidShader.glsl';

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
      uBrushSize: { value: 0.2 },
      uBrushStrength: { value: 1.0 },
      uFluidDecay: { value: 0.96 },
      uTrailLength: { value: 0.99 },
      uStopDecay: { value: 0.9 },
    },
  }), [size]);

  const displayMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: displayShader,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(size.width, size.height) },
      iFluid: { value: null },
      uDistortionAmount: { value: 1.0 },
      uColor1: { value: new THREE.Color('#36150A') },
      uColor2: { value: new THREE.Color('#720B12') },
      uColor3: { value: new THREE.Color('#FCE8DB') },
      uColor4: { value: new THREE.Color('#000000') },
      uColorIntensity: { value: 1.0 },
      uSoftness: { value: 0.6 },
    },
  }), [size]);

  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(2, 2);
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

    const resetMouse = () => fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);



    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseleave', resetMouse);
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseleave', resetMouse);
    };
  }, [gl, fluidMaterial, displayMaterial, scene]);

  useFrame(() => {
    const time = performance.now() * 0.001;
    const frame = frameCount.current++;

    fluidMaterial.uniforms.iTime.value = time;
    fluidMaterial.uniforms.iFrame.value = frame;
    fluidMaterial.uniforms.iPreviousFrame.value = previousRT.current.texture;

    displayMaterial.uniforms.iTime.value = time;
    displayMaterial.uniforms.iFluid.value = currentRT.current.texture;

    if (performance.now() - lastMoveTime.current > 100) {
      fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
    }

    gl.setRenderTarget(currentRT.current);
    gl.render(fluidPlane.current!, camera);

    gl.setRenderTarget(null);
    gl.render(displayPlane.current!, camera);

    const temp = currentRT.current;
    currentRT.current = previousRT.current;
    previousRT.current = temp;
  });

  return null;
}
