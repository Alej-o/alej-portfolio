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
uniform float uLastInteractionTime;

varying vec2 vUv;

vec2 res, fragCoord;

vec4 read(vec2 coord) {
  return texture2D(iPreviousFrame, fract(coord / res));
}
vec4 read(vec2 coord, int dx, int dy) {
  return texture2D(iPreviousFrame, fract((coord + vec2(float(dx), float(dy))) / res));
}

float triangleArea(vec2 a, vec2 b, vec2 c) {
  float A = length(b - c), B = length(c - a), C = length(a - b);
  float s = 0.5 * (A + B + C);
  return sqrt(s * (s - A) * (s - B) * (s - C));
}


float lineDistance(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  res = iResolution;
  fragCoord = vUv * res;

  if (iFrame < 1) {
    float d = length(fragCoord - 0.5 * res);
    gl_FragColor = vec4(0.1 * exp(-0.001 * d * d), 0.0, 0.0, iTime);
    return;
  }

 
  vec2 v = fragCoord;
  vec2 A = v + vec2(1, 1), B = v + vec2(1, -1), C = v + vec2(-1, 1), D = v + vec2(-1, -1);
  for (int i = 0; i < 8; i++) {
    v -= read(v).xy;
    A -= read(A).xy;
    B -= read(B).xy;
    C -= read(C).xy;
    D -= read(D).xy;
  }

  vec4 me = read(v);
  vec4 n = read(v, 0, 1), e = read(v, 1, 0), s = read(v, 0, -1), w = read(v, -1, 0);
  vec4 avg = 0.25 * (n + e + s + w);

  me.xy = mix(me.xy, avg.xy, 0.15);
  me.z  = mix(me.z,  avg.z,  0.95);

  me.z -= 0.01 * (triangleArea(A, B, C) + triangleArea(B, C, D) - 4.0);

  vec4 pressure = vec4(e.z, w.z, n.z, s.z);
  me.xy += 100.0 * vec2(pressure.x - pressure.y, pressure.z - pressure.w) / res;


  me.xy *= uFluidDecay;
  me.z  *= uTrailLength;

  vec2 mouse = iMouse.xy;
  vec2 prev = iMouse.zw;
  vec2 delta = mouse - prev;

  if (length(delta) > 0.0) {
    float dist = lineDistance(fragCoord, mouse, prev);
    vec2 dir = normalize(delta);
    vec2 m = min(1.0, 10.0) * dir;
    float falloff = pow(exp(-1e-4 / uBrushSize * pow(dist, 3.0)), 0.5);
    float strength = 0.03 * uBrushStrength;

    me.xyw += strength * falloff * vec3(m, 10.0);

    if (falloff > 0.01) {
      me.w = iTime; // ⏱ Marque le temps de création
    }
  }


  float age = iTime - me.w;
  float idle = iTime - uLastInteractionTime;

  if (idle > 0.1 && age < 3.0) {
    float dMouse = length(fragCoord - mouse);
    float maxDist = length(res) * 0.25;
    float normDist = min(dMouse / maxDist, 1.0);
    float fade = normDist * age * 0.5;
    float decay = mix(1.0, uStopDecay, fade);

    me.xy *= decay;
    me.z  *= decay;
  }

  gl_FragColor = clamp(me, -0.4, 0.4);
}

`;

// Shader d'affichage final avec couleurs et distortion
export const displayShader = `
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
  vec2 st = vUv * 3.0;

  vec4 fluid = texture2D(iFluid, vUv);
  st += fluid.xy * uDistortionAmount;

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

  float n1 = smoothstep(0.0, 0.5, n);
  float n2 = smoothstep(0.5, 0.7, n);
  float n3 = smoothstep(0.7, 0.85, n);
  float n4 = smoothstep(0.85, 1.0, n);

  vec3 color = mix(uColor4, uColor1, n1);
  color = mix(color, uColor2, n2);
  color = mix(color, uColor3, n3);
  color = mix(color, uColor4, n4);

  gl_FragColor = vec4(color * uColorIntensity, 1.0);
}
`;