export const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

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
  return sqrt(max(0.0, s * (s - A) * (s - B) * (s - C)));
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
 
  for (int i = 0; i < 6; i++) {
    float damping = 0.85; 
    v -= read(v).xy * damping;
    A -= read(A).xy * damping;
    B -= read(B).xy * damping;
    C -= read(C).xy * damping;
    D -= read(D).xy * damping;
  }

  vec4 me = read(v);
  vec4 n = read(v, 0, 1), e = read(v, 1, 0), s = read(v, 0, -1), w = read(v, -1, 0);
  vec4 avg = 0.25 * (n + e + s + w);

 
  me.xy = mix(me.xy, avg.xy, 0.12);
  me.z  = mix(me.z,  avg.z,  0.92);

  
  float deformation = triangleArea(A, B, C) + triangleArea(B, C, D) - 4.0;
  me.z -= 0.008 * deformation;

 
  vec4 pressure = vec4(e.z, w.z, n.z, s.z);
  me.xy += 80.0 * vec2(pressure.x - pressure.y, pressure.z - pressure.w) / res;

  
  me.xy = clamp(me.xy, -3.0, 3.0);


  me.xy *= uFluidDecay;
  me.z  *= uTrailLength;

  vec2 mouse = iMouse.xy;
  vec2 prev = iMouse.zw;
  vec2 delta = mouse - prev;
  float deltaLength = length(delta);

  if (deltaLength > 0.1) {
    float dist = lineDistance(fragCoord, mouse, prev);
    
    
    float invBrushSize = 1.0 / max(uBrushSize, 0.1);
    float falloff = exp(-dist * dist * invBrushSize * 2e-4);
    falloff = pow(falloff, 0.5);
    
   
    vec2 dir = delta / max(deltaLength, 0.001);
    vec2 m = max(vec2(1.0), abs(delta));
    
    float strength = 0.025 * uBrushStrength;
    me.xyw += strength * falloff * vec3(m, 8.0);

    if (falloff > 0.01) {
      me.w = iTime;
    }
  }

  
  if (deltaLength < 0.1) {
    float dMouse = length(fragCoord - mouse);
    if (dMouse < uBrushSize * 0.8) {
      me = vec4(0.0);
    }
  }

  
  if (length(me.xy) < 0.001 && me.z < 0.001) {
    me = vec4(0.0);
  }

 
  gl_FragColor = clamp(me, -1.0, 1.0);
}
`;

export const gradientShader = `
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

// Fonction de bruit optimisée
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
  float frequency = 1.0;
  
  // Réduit à 4 octaves pour optimiser
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 st = vUv * 2.8;

  vec4 fluid = texture2D(iFluid, vUv);
  st += fluid.xy * uDistortionAmount;

  float t = iTime * 0.08;
  vec2 q = vec2(
    fbm(st + vec2(10.7, 9.2) + t),
    fbm(st + vec2(8.3, 2.8) - t * 0.7)
  );
  
  vec2 r = vec2(
    fbm(st + 1.4 * q + vec2(80.5, 4.5)),
    fbm(st + 1.4 * q + vec2(5.5, 6.5))
  );
  
  float n = fbm(st + r * 1.3);

  float n1 = smoothstep(0.0, 0.6, n);
  float n2 = smoothstep(0.4, 0.75, n);
  float n3 = smoothstep(0.65, 0.9, n);
  float n4 = smoothstep(0.8, 1.0, n);

  vec3 color = mix(uColor4, uColor1, n1);
  color = mix(color, uColor2, n2);
  color = mix(color, uColor3, n3);
  color = mix(color, uColor4, n4);

  
  color = pow(color * uColorIntensity, vec3(0.8));

  gl_FragColor = vec4(color, 1.0);
}
`;