// stripeFragment.glsl.ts
"use client";
const stripeFragment = /* glsl */ `
precision mediump float;

uniform sampler2D tDiffuse;
uniform float     u_time;
uniform float     u_stripes;
uniform float     u_amplitude;
varying vec2      vUv;

// nombre d’échantillons de chaque côté
const int   K  = 1;
// écart vertical en UV pour chaque sample (à ajuster selon ta résolution)
const float dy = 1.0 / 500.0;

void main() {
  // 1) Calcul des stries “réfractées”
  float idx    = floor(vUv.x * u_stripes);
  float center = (idx + 0.5) / u_stripes;
  float phase  = (center + u_time * 0.1) * 6.283185; // 2π
  float offset = sin(phase) * u_amplitude;
  float sampleX = clamp(center + offset, 0.0, 1.0);

  // 2) Blur vertical : moyenne 2*K+1 échantillons
  vec4 sum = vec4(0.0);
  for (int i = -K; i <= K; i++) {
    sum += texture2D(tDiffuse, vec2(sampleX, vUv.y + float(i) * dy));
  }
  gl_FragColor = sum / float(2 * K + 1);
}
`;
export default stripeFragment;
