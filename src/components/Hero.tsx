// src/components/Hero.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { HeroBackground } from "./HeroBackground";
// import SlideButton from "./SlideButton";


export default function Hero() {
  return (
    <section className="relative  w-full h-screen overflow-hidden ">
      
      <div className="absolute inset-0 -z-0 pointer-events-auto">
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          orthographic
          camera={{ position: [0, 0, 1], zoom: 1 }}
          className="w-full h-full"
        >
          <HeroBackground />
        </Canvas>
      </div>

      
      <div className="relative z-10 pointer-events-none flex flex-col items-start justify-end h-full text-left ml-12 -translate-y-10">
        <p className="text-[190px] font-title text-beige leading-[0.8]">
  DÉVELOPPEUSE<br />
  <span>FRONT-END</span>
</p>

 </div> 
    </section>
  );
}





















        {/* <p className="text-6xl font-milk-honey text-beige mt-4 ">
          WEB & MOBILE
        </p> */}
        {/* <p className="text-2xl font-milk-honey text-beige mt-4">
          Basée à Paris
        </p>
{/* 
        <div className="flex space-x-6 items-left mt-4 pointer-events-auto">
  
  <SlideButton
    href="https://github.com/TonCompteGithub"
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 text-beige text-xl font-milk-honey bg-white/10 backdrop-blur-sm rounded-md transition duration-300 flex items-center gap-2"

  >
    
    Github
  </SlideButton> */}

  
  {/* <SlideButton
    href="https://linkedin.com/in/TonCompteLinkedin"
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 text-beige text-xl font-milk-honey bg-white/10 backdrop-blur-sm rounded-md transition duration-300 flex items-center gap-2"

  >
    
    LinkedIn
  </SlideButton> */}
{/* </div> */}
     

// src/components/Hero.tsx
// import { Canvas } from "@react-three/fiber";
// import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
// import { HeroBackground } from "./HeroBackground";
// import StripePass from "./StripePass";

// export default function Hero() {
//   return (
//     <section className="relative w-full h-screen overflow-hidden">
//       <Canvas
//         orthographic
//         camera={{ position: [0, 0, 1], zoom: 1 }}
//         gl={{ preserveDrawingBuffer: true }}
//         className="absolute inset-0 -z-10"
//       >
//         <HeroBackground />

//         <EffectComposer multisampling={0}>
//           {/* floute tout le rendu pour simuler le verre dépoli */}
//           <DepthOfField
//             focusDistance={0}
//             focalLength={0.02}
//             bokehScale={4}
//             height={480}
//           />
//           <StripePass stripes={80} amplitude={0.04} speed={0.2} />
//         </EffectComposer>
//       </Canvas>

//       <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
//         <h1 className="text-7xl font-milk-honey text-white">
//           Agathe Lejour
//         </h1>
//       </div>
//     </section>
//   ); 
// }


