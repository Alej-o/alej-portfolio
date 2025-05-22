// src/components/Hero.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { HeroBackground } from "./HeroBackground";
import WavyText from "./WavyText";
import SlideButton from "./SlideButton";


export default function Hero() {
  return (
    <section className="relative  w-full h-screen overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          orthographic
          camera={{ position: [0, 0, 1], zoom: 1 }}
          className="w-full h-full"
        >
          <HeroBackground />
        </Canvas>
      </div>

      
      <div className="relative z-10 pointer-events-none flex flex-col items-start justify-center h-full text-left ml-52 -translate-y-10">
        <p className="flex items-center text-4xl font-milk-honey text-white mt-6">
           Bienvenue sur mon portfolio 
          
        </p>

       <h1 className="text-white font-milk-honey mt-8">
  <span className="text-5xl sm:text-5xl">Moi, c’est </span>
  <WavyText />
</h1>

        <p className="text-4xl font-milk-honey text-white mt-6">
          Développeuse fullstack web et mobile
        </p>

        <div className="flex space-x-6 items-left mt-10 pointer-events-auto">
  
  <SlideButton
    href="https://github.com/TonCompteGithub"
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 text-white text-xl font-milk-honey  border border-red-500 rounded-md  transition duration-300 flex items-center gap-2"
  >
    
    Github
  </SlideButton>

  
  <SlideButton
    href="https://linkedin.com/in/TonCompteLinkedin"
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 text-white text-xl font-milk-honey rounded-md transition duration-300 flex items-center gap-2"
  >
    
    LinkedIn
  </SlideButton>
</div>
      </div>
    </section>
  );
}

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


