"use client";

import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { fluidShader, vertexShader, gradientShader } from "../../shaders/FluidShader.glsl";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.matchMedia("(pointer:coarse)").matches);
    }
  }, []);
  return isMobile;
}

export default function HeroBackgroundFluid() {
  const { gl, size, camera, scene } = useThree();

  const fluidPlane = useRef<THREE.Mesh>(null);
  const displayPlane = useRef<THREE.Mesh>(null);
  const frameCount = useRef(0);
  const mouse = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const lastInteractionTime = useRef(0);

  const isMobile = useIsMobile();

 
  const [initialSize] = useState(() => ({
    width: typeof window !== "undefined" && isMobile
      ? Math.max(160, Math.round(window.innerWidth * 0.33))
      : (typeof window !== "undefined" ? window.innerWidth : 1920),
    height: typeof window !== "undefined" && isMobile
      ? Math.max(160, Math.round(window.innerHeight * 0.33))
      : (typeof window !== "undefined" ? window.innerHeight : 1080),
  }));
  const renderWidth = isMobile ? initialSize.width : size.width;
  const renderHeight = isMobile ? initialSize.height : size.height;

  const rt1 = useMemo(() => new THREE.WebGLRenderTarget(renderWidth, renderHeight), [renderWidth, renderHeight]);
  const rt2 = useMemo(() => new THREE.WebGLRenderTarget(renderWidth, renderHeight), [renderWidth, renderHeight]);
  const currentRT = useRef(rt1);
  const previousRT = useRef(rt2);

  const fluidMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: fluidShader,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(renderWidth, renderHeight) },
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
      iFrame: { value: 0 },
      iPreviousFrame: { value: null },
      uBrushSize: { value: 0.5 },
      uBrushStrength: { value: 1 },
      uFluidDecay: { value: 0.92 },
      uTrailLength: { value: 0.95 },
      uStopDecay: { value: 0.75 },
      uLastInteractionTime: { value: 0.0 },
    },
  }), [renderWidth, renderHeight]);

  const displayMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: gradientShader,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(size.width, size.height) },
      iFluid: { value: null },
      uDistortionAmount: { value: 0.8 },
      uColor1: { value: new THREE.Color("#73080D") },
      uColor2: { value: new THREE.Color("#8C0812") },
      uColor3: { value: new THREE.Color("#FCE8DB") },
      uColor4: { value: new THREE.Color("#25100A") },
      uColorIntensity: { value: 1.5 },
      uSoftness: { value: 1 },
    },
  }), [size]);

  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const fluid = new THREE.Mesh(geometry, fluidMaterial);
    const display = new THREE.Mesh(geometry, displayMaterial);
    fluidPlane.current = fluid;
    displayPlane.current = display;
    scene.add(display);

    if (!isMobile) {
      const updateMouse = (x: number, y: number) => {
        if (mouse.current.x !== x || mouse.current.y !== y) {
          mouse.current.px = mouse.current.x;
          mouse.current.py = mouse.current.y;
          mouse.current.x = x;
          mouse.current.y = y;
          lastInteractionTime.current = performance.now() * 0.001;
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = gl.domElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = rect.height - (e.clientY - rect.top);
        updateMouse(x, y);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        rt1.dispose();
        rt2.dispose();
      };
    } else {
      return () => {
        rt1.dispose();
        rt2.dispose();
      };
    }
  }, [isMobile, gl, fluidMaterial, displayMaterial, rt1, rt2, scene, size]);

  useFrame(() => {
    if (!fluidPlane.current || !displayPlane.current) return;

    const time = performance.now() * 0.001;
    const frame = frameCount.current++;

    fluidMaterial.uniforms.iTime.value = time;
    fluidMaterial.uniforms.iFrame.value = frame;
    fluidMaterial.uniforms.iPreviousFrame.value = previousRT.current.texture;

    if (isMobile) {
      fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
    } else {
      fluidMaterial.uniforms.iMouse.value.set(
        mouse.current.x, mouse.current.y,
        mouse.current.px, mouse.current.py
      );
    }
    fluidMaterial.uniforms.uLastInteractionTime.value = lastInteractionTime.current;

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
