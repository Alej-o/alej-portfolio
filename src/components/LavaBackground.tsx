"use client";

import { useRef, useEffect, } from "react";


import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LavaBackground() {
    const shaderRef = useRef<THREE.ShaderMaterial>(null!);
   

  // Mise à jour du temps pour l'animation
  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (shaderRef.current) {
        shaderRef.current.uniforms.u_mouse.value = new THREE.Vector2(
          e.clientX / window.innerWidth,
          1.0 - e.clientY / window.innerHeight
        );
      }
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <mesh>
      {/* Un grand plan plein écran */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={shaderRef}
        uniforms={{
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2(1, 1) },
            u_mouse: { value: new THREE.Vector2(0, 0) },
          }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

// Vertex shader minimal
const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

// Fragment shader — on affichera un fond ambre simple (provisoire)
const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

varying vec2 vUv;

// ---- BRUIT (simplex style approximé) ----
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
    mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 st) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    value += noise(st) * amp;
    st *= 2.0;
    amp *= 0.5;
  }
  return value;
}

// ---- MAIN SHADER ----
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st = st * 2.0 - 1.0;
  st.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.2;

  // Texture de lave mouvante
  vec2 q = vec2(fbm(st + vec2(0.0, t)), fbm(st + vec2(1.0, t)));
  vec2 r = vec2(fbm(q + 1.7), fbm(q - 1.3));
  float f = fbm(st + r + t);

  // Couleur de la lave fluide
  vec3 lava = mix(vec3(0.3, 0.05, 0.01), vec3(1.0, 0.4, 0.1), f);
  lava = mix(lava, vec3(1.0, 0.8, 0.5), pow(f, 4.0));

  // Révélateur bulle contrôlé par la souris
  vec2 mouse = u_mouse * 2.0 - 1.0;
  float d = distance(st, mouse);
  float mask = smoothstep(0.3, 0.0, d); // bord doux

  // Fond sombre "inactif"
  vec3 background = vec3(0.05, 0.02, 0.01);
  vec3 finalColor = mix(background, lava, mask);

  gl_FragColor = vec4(finalColor, 1.0);
}


`;
