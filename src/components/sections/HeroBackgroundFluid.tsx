"use client";

import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { fluidShader, vertexShader, gradientShader } from "../../shaders/FluidShader.glsl";

function useFlags() {
  const isMobile = typeof window !== "undefined" ? window.matchMedia("(pointer:coarse)").matches : false;
  const reduceMotion = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
  return { isMobile, reduceMotion };
}

export default function HeroBackgroundFluid() {
  const { gl, size, camera, scene } = useThree();
  const { isMobile, reduceMotion } = useFlags();

  const fluidPlane = useRef<THREE.Mesh>(null);
  const displayPlane = useRef<THREE.Mesh>(null);
  const frameCount = useRef(0);
  const mouse = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const lastInteractionTime = useRef(0);
  const lastFrameTime = useRef(0);

  const scale = isMobile ? 0.2 : 0.6;
  const renderWidth = Math.max(128, Math.round(size.width * scale));
  const renderHeight = Math.max(128, Math.round(size.height * scale));

  const rtOpts = useMemo(
    () => ({
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false
    }),
    []
  );

  const rt1 = useMemo(() => new THREE.WebGLRenderTarget(renderWidth, renderHeight, rtOpts), [renderWidth, renderHeight, rtOpts]);
  const rt2 = useMemo(() => new THREE.WebGLRenderTarget(renderWidth, renderHeight, rtOpts), [renderWidth, renderHeight, rtOpts]);
  const currentRT = useRef(rt1);
  const previousRT = useRef(rt2);

  const iterations = isMobile ? 1 : 4;

  const fluidMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: fluidShader,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2(renderWidth, renderHeight) },
          iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
          iFrame: { value: 0 },
          iPreviousFrame: { value: null },
          uBrushSize: { value: isMobile ? 0.7 : 0.5 },
          uBrushStrength: { value: isMobile ? 0.7 : 1 },
          uFluidDecay: { value: 0.92 },
          uTrailLength: { value: 0.95 },
          uStopDecay: { value: 0.75 },
          uLastInteractionTime: { value: 0.0 },
          uIterations: { value: iterations }
        },
        glslVersion: THREE.GLSL1
      }),
    [renderWidth, renderHeight, isMobile, iterations]
  );

  const displayMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: gradientShader,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2(size.width, size.height) },
          iFluid: { value: null },
          uDistortionAmount: { value: isMobile ? 0.6 : 0.7 },
          uColor1: { value: new THREE.Color("#73080D") },
          uColor2: { value: new THREE.Color("#8C0812") },
          uColor3: { value: new THREE.Color("#FCE8DB") },
          uColor4: { value: new THREE.Color("#25100A") },
          uColorIntensity: { value: 1.35 },
          uSoftness: { value: 1 }
        },
        glslVersion: THREE.GLSL1
      }),
    [size, isMobile]
  );

  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const fluid = new THREE.Mesh(geometry, fluidMaterial);
    const display = new THREE.Mesh(geometry, displayMaterial);
    fluid.frustumCulled = false;
    display.frustumCulled = false;
    fluidPlane.current = fluid;
    displayPlane.current = display;
    scene.add(display);

    const toRT = (x: number, y: number) => {
      const sx = renderWidth / size.width;
      const sy = renderHeight / size.height;
      return { x: x * sx, y: y * sy };
    };

    const updateMouse = (x: number, y: number) => {
      if (mouse.current.x !== x || mouse.current.y !== y) {
        mouse.current.px = mouse.current.x;
        mouse.current.py = mouse.current.y;
        mouse.current.x = x;
        mouse.current.y = y;
        lastInteractionTime.current = performance.now() * 0.001;
      }
    };

    function onMouseMove(e: MouseEvent) {
      const rect = gl.domElement.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = rect.height - (e.clientY - rect.top);
      const p = toRT(cx, cy);
      updateMouse(p.x, p.y);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = gl.domElement.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = rect.height - (e.clientY - rect.top);
      const p = toRT(cx, cy);
      updateMouse(p.x, p.y);
    }

    function onTouchStart(e: TouchEvent) {
      if (!e.touches.length) return;
      const rect = gl.domElement.getBoundingClientRect();
      const cx = e.touches[0].clientX - rect.left;
      const cy = rect.height - (e.touches[0].clientY - rect.top);
      const p = toRT(cx, cy);
      updateMouse(p.x, p.y);
    }

    function onTouchMove(e: TouchEvent) {
      if (!e.touches.length) return;
      const rect = gl.domElement.getBoundingClientRect();
      const cx = e.touches[0].clientX - rect.left;
      const cy = rect.height - (e.touches[0].clientY - rect.top);
      const p = toRT(cx, cy);
      updateMouse(p.x, p.y);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      rt1.dispose();
      rt2.dispose();
      geometry.dispose();
    };
  }, [gl, fluidMaterial, displayMaterial, rt1, rt2, scene, renderWidth, renderHeight, size.width, size.height]);

  useFrame(() => {
    if (!fluidPlane.current || !displayPlane.current) return;

    const time = performance.now() * 0.001;
    const frame = frameCount.current++;

    if (reduceMotion) return;

    if (isMobile) {
      const dt = time - lastFrameTime.current;
      if (dt < 1 / 30) return;
      lastFrameTime.current = time;
    }

    const idleFor = time - lastInteractionTime.current;
    const recentlyActive = idleFor < 1.0;
    const skipFluid = isMobile ? !recentlyActive : idleFor > 2.0 && frame % 2 !== 0;

    displayMaterial.uniforms.iTime.value = time;
    displayMaterial.uniforms.iFluid.value = previousRT.current.texture;

    if (!skipFluid) {
      fluidMaterial.uniforms.iTime.value = time;
      fluidMaterial.uniforms.iFrame.value = frame;
      fluidMaterial.uniforms.iPreviousFrame.value = previousRT.current.texture;
      fluidMaterial.uniforms.iMouse.value.set(mouse.current.x, mouse.current.y, mouse.current.px, mouse.current.py);
      fluidMaterial.uniforms.uLastInteractionTime.value = lastInteractionTime.current;

      gl.setRenderTarget(currentRT.current);
      gl.render(fluidPlane.current, camera);
      gl.setRenderTarget(null);

      const temp = currentRT.current;
      currentRT.current = previousRT.current;
      previousRT.current = temp;
    }

    gl.render(displayPlane.current, camera);
  });

  return null;
}
