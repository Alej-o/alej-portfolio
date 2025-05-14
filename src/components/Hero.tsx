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
      </div>
    </section>
  );
}
