"use client";

import { useState, useMemo, useCallback } from "react";
import { Card } from "./Card";
import { slides, type Slide } from "../data/slides";

export default function Projects() {
  const REPEAT = 7;
  // → Mémoïsé pour eslint-plugin-react-hooks
  const loop: Slide[] = useMemo(
    () => Array(REPEAT).fill(slides).flat(),
    [REPEAT]
  );

  const startIndex = slides.length * Math.floor(REPEAT / 2);
  const [idx, setIdx] = useState(startIndex);

  // → useCallback pour éviter les warnings de dépendances
  const next = useCallback(() => {
    setIdx(i => i + 1);
  }, []);

  const prev = useCallback(() => {
    setIdx(i => i - 1);
  }, []);

  const CARD_W  = 500;
  const GAP     = 16;
  const VISIBLE = 3;
  const WRAP_W  = VISIBLE * CARD_W + (VISIBLE - 1) * GAP;
  const centerOffset = WRAP_W / 2 - (CARD_W + GAP) / 2;
  const translateX   = -idx * (CARD_W + GAP) + centerOffset;

  // Style du conteneur « piste » typé pour ESLint
  const trackStyle: React.CSSProperties = {
    transform:  `translateX(${translateX}px)`,
    transition: "transform 0.5s ease-in-out",
    overflow:   "visible",
    display:    "flex",
  };

  return (
    <section
      className="relative h-screen flex flex-col items-center justify-top overflow-hidden "
    >
      <h2 className="text-4xl text-white font-serif mb-8">
      Projects
      </h2>

      <div
        className="overflow-hidden"
        style={{
          width:      `${WRAP_W}px`,
          margin:     "0 auto",
          perspective: 1000,
        }}
      >
        <div style={trackStyle}>
          {loop.map((slide, i) => {
            const offset = i - idx;
            return (
              <Card
                key={`${slide.id}-${i}`}
                img={slide.image}
                title={slide.title}
                description={slide.description}
                href={slide.href}
                offset={offset}
                onPrev={prev}
                onNext={next}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
