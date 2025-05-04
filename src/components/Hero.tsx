"use client";

import { Canvas } from "@react-three/fiber";
import { HeroBackground } from "../components/HeroBackground";

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* ✅ Canvas en fond, avec capture des events souris */}
      <div className="absolute inset-0 -z-10 pointer-events-auto">
        <Canvas className="w-full h-full">
          <HeroBackground />
        </Canvas>
      </div>

      {/* Texte par-dessus */}
      <div className="relative flex flex-col items-center justify-center h-full text-center z-10">
        <h1 className="text-5xl font-bold text-white">Bienvenue sur mon portfolio</h1>
        <p className="mt-4 text-xl text-white">Je suis développeuse web et mobile</p>
      </div>
    </section>
  );
}
