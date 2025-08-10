export const vertexShader = `
varying vec2 vUv;
void main(){
  vUv=uv;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
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
uniform int uIterations;
varying vec2 vUv;

vec2 res,fc;

vec4 read(vec2 c){return texture2D(iPreviousFrame,fract(c/res));}
vec4 read(vec2 c,int dx,int dy){return texture2D(iPreviousFrame,fract((c+vec2(float(dx),float(dy)))/res));}

float lineDistance(vec2 p,vec2 a,vec2 b){
  vec2 pa=p-a, ba=b-a;
  float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);
  return length(pa-ba*h);
}

void main(){
  res=iResolution;
  fc=vUv*res;

  if(iFrame<1){
    float d=length(fc-0.5*res);
    gl_FragColor=vec4(0.1*exp(-0.001*d*d),0.0,0.0,iTime);
    return;
  }

  vec2 v=fc;
  vec2 A=v+vec2(1.0,1.0), B=v+vec2(1.0,-1.0), C=v+vec2(-1.0,1.0), D=v+vec2(-1.0,-1.0);

  for(int i=0;i<6;i++){
    if(i>=uIterations)break;
    float damping=0.85;
    v-=read(v).xy*damping;
    A-=read(A).xy*damping;
    B-=read(B).xy*damping;
    C-=read(C).xy*damping;
    D-=read(D).xy*damping;
  }

  vec4 me=read(v);
  vec4 n=read(v,0,1), e=read(v,1,0), s=read(v,0,-1), w=read(v,-1,0);
  vec4 avg=0.25*(n+e+s+w);

  me.xy=mix(me.xy,avg.xy,0.12);
  me.z=mix(me.z,avg.z,0.92);

  float lapZ=(n.z+e.z+s.z+w.z-4.0*me.z);
  me.z-=0.006*lapZ;

  vec2 grad=vec2(e.z-w.z,n.z-s.z);
  me.xy+=60.0*grad/res;
  me.xy=clamp(me.xy,-3.0,3.0);

  me.xy*=uFluidDecay;
  me.z*=uTrailLength;

  vec2 mouse=iMouse.xy;
  vec2 prev=iMouse.zw;
  vec2 delta=mouse-prev;
  float dl=length(delta);

  if(dl>0.1){
    float dist=lineDistance(fc,mouse,prev);
    float inv=1.0/max(uBrushSize,0.1);
    float falloff=exp(-dist*dist*inv*2e-4);
    falloff=pow(falloff,0.5);
    vec2 m=max(vec2(1.0),abs(delta));
    float strength=0.025*uBrushStrength;
    me.xyw+=strength*falloff*vec3(m,8.0);
    if(falloff>0.01) me.w=iTime;
  }

  if(dl<0.1){
    float dMouse=length(fc-mouse);
    if(dMouse<uBrushSize*0.8) me=vec4(0.0);
  }

  if(length(me.xy)<0.001 && me.z<0.001) me=vec4(0.0);

  gl_FragColor=clamp(me,-1.0,1.0);
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

float rnd(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453123);}
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(rnd(i),rnd(i+vec2(1.0,0.0)),u.x),mix(rnd(i+vec2(0.0,1.0)),rnd(i+vec2(1.0,1.0)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0,a=0.5,f=1.0;
  for(int i=0;i<4;i++){v+=a*noise(p*f);f*=2.0;a*=0.5;}
  return v;
}

void main(){
  vec2 st=vUv*2.8;
  vec4 fluid=texture2D(iFluid,vUv);
  st+=fluid.xy*uDistortionAmount;

  float t=iTime*0.08;
  vec2 q=vec2(fbm(st+vec2(10.7,9.2)+t), fbm(st+vec2(8.3,2.8)-t*0.7));
  vec2 r=vec2(fbm(st+1.4*q+vec2(80.5,4.5)), fbm(st+1.4*q+vec2(5.5,6.5)));
  float n=fbm(st+r*1.3);

  float n1=smoothstep(0.0,0.6,n);
  float n2=smoothstep(0.4,0.75,n);
  float n3=smoothstep(0.65,0.9,n);
  float n4=smoothstep(0.8,1.0,n);

  vec3 col=mix(uColor4,uColor1,n1);
  col=mix(col,uColor2,n2);
  col=mix(col,uColor3,n3);
  col=mix(col,uColor4,n4);
  col=pow(col*uColorIntensity,vec3(0.8));

  gl_FragColor=vec4(col,1.0);
}
`;
