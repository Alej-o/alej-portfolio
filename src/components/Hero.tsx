"use client";

import { Canvas } from "@react-three/fiber";
import LavaBackground from "./LavaBackground";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Canvas>
        <LavaBackground />
      </Canvas>
      

      {/* Texte au-dessus */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-5xl font-bold text-vintageRed">Bienvenue sur mon portfolio</h1>
        <p className="mt-4 text-xl text-deepBrown">Je suis développeuse web et mobile</p>
      </div>
    </section>
  );
}
