// Vertex Shader commun (plein écran)
export const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Shader de simulation fluide (feedback loop)
export const fluidShader = `


uniform float iTime;
uniform vec2 iResolution;
uniform vec4 iMouse;        
uniform int iFrame;
uniform sampler2D iPreviousFrame;

uniform float uBrushSize;
uniform float uBrushStrength;
uniform float uFluidDecay;
uniform float uTrailLength;
uniform float uStopDecay;

varying vec2 vUv;

vec2 ur, U;

float ln(vec2 p, vec2 a, vec2 b) {
  return length(p - a - (b - a) * clamp(dot(p - a, b - a) / dot(b - a, b - a), 0.0, 1.0));
}

vec4 t(vec2 v, int a, int b) {
  return texture2D(iPreviousFrame, fract((v + vec2(float(a), float(b))) / ur));
}

vec4 t(vec2 v) {
  return texture2D(iPreviousFrame, fract(v / ur));
}

float area(vec2 a, vec2 b, vec2 c) {
  float A = length(b - c), B = length(c - a), C = length(a - b);
  float s = 0.5 * (A + B + C);
  return sqrt(s * (s - A) * (s - B) * (s - C));
}

void main() {
  U = vUv * iResolution;
  ur = iResolution.xy;

  if (iFrame < 1) {
    float w = 0.5 + sin(0.2 * U.x) * 0.5;
    float q = length(U - 0.5 * ur);
    gl_FragColor = vec4(0.1 * exp(-0.001 * q * q), 0.0, 0.0, w);
    return;
  }

  vec2 v = U, A = v + vec2(1, 1), B = v + vec2(1, -1), C = v + vec2(-1, 1), D = v + vec2(-1, -1);
  for (int i = 0; i < 8; i++) {
    v -= t(v).xy;
    A -= t(A).xy;
    B -= t(B).xy;
    C -= t(C).xy;
    D -= t(D).xy;
  }

  vec4 me = t(v);
  vec4 n = t(v, 0, 1), e = t(v, 1, 0), s = t(v, 0, -1), w = t(v, -1, 0);
  vec4 ne = 0.25 * (n + e + s + w);
me.xy = mix(t(v).xy, ne.xy, 0.15);
me.z = mix(t(v).z, ne.z, 0.95);
  me.z -= 0.01 * ((area(A, B, C) + area(B, C, D)) - 4.0);

  vec4 pr = vec4(e.z, w.z, n.z, s.z);
  me.xy += 100.0 * vec2(pr.x - pr.y, pr.z - pr.w) / ur;

  // Décroissance naturelle
  me.xy *= uFluidDecay;
  me.z *= uTrailLength;

  // Ajout uniquement si la souris bouge
  if (length(iMouse.xy - iMouse.zw) > 0.0) {
    vec2 mousePos = iMouse.xy;
    vec2 mousePrev = iMouse.zw;
    vec2 mouseVel = mousePos - mousePrev;
    float velMagnitude = length(mouseVel);
    float q = ln(U, mousePos, mousePrev);

    vec2 m = mouseVel;
    float l = length(m);
    if (l > 0.0) m = min(1.0, 10.0) * m / l;

    float brushSizeFactor = 1e-4 / uBrushSize;
    float strengthFactor = 0.03 * uBrushStrength;
    float falloff = exp(-brushSizeFactor * q * q * q);
    falloff = pow(falloff, 0.5);

    me.xyw += strengthFactor * falloff * vec3(m, 10.0);

    // Optionnel : adoucissement si mouvement lent
    if (velMagnitude < 2.0) {
      float distToCursor = length(U - mousePos);
      float influence = exp(-distToCursor * 0.01);
      float cursorDecay = mix(1.0, uStopDecay, influence);
      me.xy *= cursorDecay;
      me.z *= cursorDecay;
    }
  }

  gl_FragColor = clamp(me, -0.4, 0.4);
}

`;

// Shader d’affichage final avec couleurs et distortion
export const displayShader =  `
precision mediump float;

uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D iFluid;
uniform float uDistortionAmount;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

uniform float uColorIntensity;
uniform float uSoftness;

varying vec2 vUv;

// --- bruit de base
float random(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
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

void main() {
  // base coordinates
  vec2 st = vUv * 3.0;

  // --- distortion depuis le fluid shader
  vec4 fluid = texture2D(iFluid, vUv);
  vec2 fluidVel = fluid.xy;
  st += fluidVel * uDistortionAmount;

  // --- bruit fluide
  float t = iTime * 0.09;
  vec2 q = vec2(
    fbm(st + vec2(10.7, 9.2) + t),
    fbm(st + vec2(8.3, 2.8) - t)
  );
  vec2 r = vec2(
    fbm(st + 1.5 * q + vec2(80.5, 4.5)),
    fbm(st + 1.5 * q + vec2(5.5, 6.5))
  );
  float n = fbm(st + r * 1.5);

  // --- dégradé
  float n1 = smoothstep(0.0, 0.5, n);
  float n2 = smoothstep(0.5, 0.7, n);
  float n3 = smoothstep(0.7, 0.85, n);
  float n4 = smoothstep(0.85, 1.0, n);

  vec3 color = mix(uColor4, uColor1, n1);
  color = mix(color, uColor2, n2);
  color = mix(color, uColor3, n3);
  color = mix(color, uColor4, n4);

  // --- vignette
  float vignette = 0.5 + 0.5 * sqrt(16.0 * vUv.x * vUv.y * (1.0 - vUv.x) * (1.0 - vUv.y));
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);

}`;