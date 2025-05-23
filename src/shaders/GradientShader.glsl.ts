"use client";
import { cnoise21 } from "./noise/GradientNoise.glsl";

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

${cnoise21}

float random(vec2 p) {
  vec2 k1 = vec2(
    23.14069263277926, // e^pi (Gelfond's constant)
    2.665144142690225 // 2^sqrt(2) (Gelfond–Schneider constant)
  );
  return fract(
    cos(dot(p, k1)) * 12345.6789
  );
}

const vec3 black = vec3(0.147, 0.059, 0.039);
const vec3 color1 = vec3(0.675, 0.157, 0.004);
const vec3 color2 = vec3(0.816, 0.357, 0.016);
const vec3 color3 = vec3(0.969, 0.843, 0.749);

void main() {
  vec2 seed = v_uv * 0.4 * (u_mouse + 0.5 * (length(u_mouse) + 0.5));
    seed.y += u_time * 0.3;
  float n = cnoise21(seed) + length(u_mouse) * 0.4;

  float ml = pow(length(u_mouse), 2.5) * 0.15;
  
  float n1 = smoothstep(0.1, 0.1 + 0.3, n);
  vec3 color = mix(black, color1, n1);

  
  float n2 = smoothstep(0.1 + ml, 0.1 + ml + 0.2, n);
  color = mix(color, color2, n2);

  float n3 = smoothstep(0.2 + ml, 0.2 + ml + 0.2, n);
  color = mix(color, color3, n3);

  float n4 = smoothstep(0.3 + ml, 0.3 + ml + 0.2, n);
  color = mix(color, black, n4);

  vec2 uvrandom = v_uv;
  uvrandom.y *= random(vec2(uvrandom.y, 0.2));
  color.rgb += random(uvrandom) * 0.05;
  vec2 st = gl_FragCoord.xy / u_resolution;

  gl_FragColor = vec4(color, 1.0);
}
`

