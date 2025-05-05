"use client";

import { Canvas } from "@react-three/fiber";
import { HeroBackground } from "./HeroBackground";

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-auto">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        className="w-full h-full"
      >
        <HeroBackground />
      </Canvas>
    </div>
  );
}
