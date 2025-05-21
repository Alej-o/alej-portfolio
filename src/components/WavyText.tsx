// src/components/WavyText.tsx
"use client";

import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef } from "react";

export default function WavyText() {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      const { chars } = splitText(containerRef.current);
      containerRef.current.style.visibility = "visible";

      const staggerDelay = 0.1;

      animate(
        chars,
        { y: [-20, 20] },
        {
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          duration: 1.5,
          delay: stagger(staggerDelay, {
            startDelay: -staggerDelay * chars.length,
          }),
        }
      );
    });
  }, []);

  return (
    <>
      <span
        ref={containerRef}
        className="wavy font-milk-honey text-7xl sm:text-8xl text-sunset-bright"
        style={{ display: "inline-block", visibility: "hidden" }}
      >
        Agathe
      </span>

      <style>{`
        .split-char {
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
}
