// src/components/Hero.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { HeroBackground } from "./HeroBackground";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
     <div className=" absolute inset-0 z-0 pointer-events-auto">
      <Canvas
       gl={{ preserveDrawingBuffer: true }} 
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        className=" w-full h-full"
      >
        <HeroBackground />
      </Canvas>
      </div>
     
      <div className="relative z-10 pointer-events-none flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-7xl font-milk-honey text-white">
          Agathe Lejour
        </h1>
        <p className="mt-4 text-xl font-milk-honey text-white">
          Développeuse web et mobile
        </p>
        <div>
        <button className="mt-8 px-6 py-3 text-lg font-milk-honey text-dark bg-white rounded hover:bg-blue-600">
          Github
        </button>
        <button className="mt-8 px-6 py-3 text-lg font-milk-honey text-dark bg-white rounded hover:bg-blue-600">
          Github
        </button>
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


