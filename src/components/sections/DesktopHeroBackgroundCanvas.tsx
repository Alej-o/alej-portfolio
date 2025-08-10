"use client";

import { Canvas } from "@react-three/fiber";
import HeroBackgroundFluid from "./HeroBackgroundFluid";

export default function DesktopHeroBackgroundCanvas() {
  return (
    <Canvas
      orthographic
      frameloop="always"
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: false }}
      camera={{ position: [0, 0, 1], near: 0.1, far: 10, left: -1, right: 1, top: 1, bottom: -1 }}
      className="absolute inset-0"
      aria-hidden
      role="presentation"
    >
      <HeroBackgroundFluid />
    </Canvas>
  );
}
