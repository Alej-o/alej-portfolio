"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DesktopHeroBackgroundCanvas = dynamic(() => import("./DesktopHeroBackgroundCanvas"), { ssr: false });
const MobileBackgroundCanvas = dynamic(() => import("./MobileBackgroundCanvas"), { ssr: false });

export default function HeroBackgroundSwitch() {
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mqCoarse = window.matchMedia("(pointer:coarse)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const u = () => setIsMobile(mqCoarse.matches);
    const r = () => setReduced(mqReduce.matches);
    u(); r();
    mqCoarse.addEventListener("change", u);
    mqReduce.addEventListener("change", r);
    return () => {
      mqCoarse.removeEventListener("change", u);
      mqReduce.removeEventListener("change", r);
    };
  }, []);

  if (isMobile || reduced) return <MobileBackgroundCanvas />;
  return <DesktopHeroBackgroundCanvas />;
}
