// src/components/StripePass.tsx
"use client";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass    } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass    } from "three/examples/jsm/postprocessing/ShaderPass.js";
import * as THREE      from "three";

import stripeVert from "../shaders/stripeVertex.glsl";
import stripeFrag from "../shaders/stripeFragment.glsl";

export default function StripePass({
  stripes   = 60,
  amplitude = 0.02,
  speed     = 0.01,
}: {
  stripes?: number;
  amplitude?: number;
  speed?: number;
}) {
  const composerRef   = useRef<EffectComposer | null>(null);
  const stripePassRef = useRef<ShaderPass| null>(null);
  const { gl, scene, camera, size } = useThree();

  // 1) Setup composer + passes
  useEffect(() => {
    const composer = new EffectComposer(gl);
    composer.setSize(size.width, size.height);

    // a) pass de rendu normal
    composer.addPass(new RenderPass(scene, camera));

    // b) ta passe custom
    const material = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse:    { value: null },
        u_time:      { value: 0 },
        u_stripes:   { value: stripes },
        u_amplitude: { value: amplitude },
      },
      vertexShader:   stripeVert,
      fragmentShader: stripeFrag,
    });
    const pass = new ShaderPass(material);
    composer.addPass(pass);

    composerRef.current   = composer;
    stripePassRef.current = pass;
  }, [gl, scene, camera, size, stripes, amplitude]);

  // 2) À chaque frame : animate + scissoring
  useFrame(({ clock }) => {
    const composer = composerRef.current!;
    const pass     = stripePassRef.current!;
    if (!composer || !pass) return;
    // update du temps
    pass.uniforms.u_time.value = clock.elapsedTime * speed;

    // 2a) draw normal full-screen
    gl.setScissorTest(false);
    gl.render(scene, camera);

    // 2b) draw composer (RenderPass + ShaderPass) sur la moitié gauche
    gl.setScissorTest(true);
    gl.setScissor(0, 0, size.width / 3, size.height);
    composer.render();

    // 2c) cleanup
    gl.setScissorTest(false);
  }, 1);

  return null;
}
