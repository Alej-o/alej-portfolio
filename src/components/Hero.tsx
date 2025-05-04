"use client";

import { Canvas } from "@react-three/fiber";
import { HeroBackground } from "../components/HeroBackground";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
    {/* Canvas shader en fond */}
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        className="w-full h-full"
      >
        <HeroBackground />
      </Canvas>
    </div>
  
    {/* Texte devant, sans bloquer la souris */}
    <div className="relative z-10 pointer-events-none flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-5xl font-bold text-white">Bienvenue sur mon portfolio</h1>
      <p className="mt-4 text-xl text-white">Je suis développeuse web et mobile</p>
    </div>
  </section>
  
  );
}
