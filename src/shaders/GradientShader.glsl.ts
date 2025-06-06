"use client";

export const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
precision mediump float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 v_uv;

// --- Hash noise ---
float random(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*(3.0 - 2.0*f);

  return mix(
    mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
    mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// --- Palette sunset vintage ---
const vec3 black = vec3(0.147, 0.059, 0.039);
const vec3 color1 = vec3(0.675, 0.157, 0.004);
const vec3 color2 = vec3(0.816, 0.357, 0.016);
const vec3 color3 = vec3(0.970, 0.89, 0.810);

void main() {
  vec2 st = v_uv * 3.0;
  vec2 mouse = u_mouse;

  // --- Trace tourbillonnante autour de la souris ---
  vec2 toMouse = st - mouse * 3.0;
  float d = length(toMouse);
  vec2 swirl = vec2(-toMouse.y, toMouse.x); // rotation fluide
  float strength = exp(-d * 6.0);
  st += swirl * strength * 0.2 * sin(u_time * 2.0 + d * 10.0);

  // --- Domain Warping organique ---
 float t = u_time * 0.09;
vec2 q = vec2(
  fbm(st + vec2(10.7, 9.2) + t),
  fbm(st + vec2(8.3, 2.8) - t)
);

vec2 r = vec2(
  fbm(st + 1.5 * q + vec2(80.5, 4.5)),
  fbm(st + 1.5 * q + vec2(5.5, 6.5))
);

float n = fbm(st + r * 1.5);

  // --- Couleurs Sunset Vintage ---
  float n1 = smoothstep(0., 0.5, n);
  float n2 = smoothstep(0.5, 0.7, n);
  float n3 = smoothstep(0.7, 0.85, n);
  float n4 = smoothstep(0.85, 1.0, n);

  vec3 color = mix(black, color1, n1);
  color = mix(color, color2, n2);
  color = mix(color, color3, n3);
  color = mix(color, black, n4);

  // --- Interaction directe de la souris ---
  float force = exp(-d * 8.0);
  st += normalize(toMouse) * force * 0.1;


  // --- Vignettage doux ---
  float vignette = 0.5 + 0.5 * sqrt(16.0 * v_uv.x * v_uv.y * (1.0 - v_uv.x) * (1.0 - v_uv.y));
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;
