"use client";

import { useState } from "react";
import Image from "next/image";

import city1 from "../../public/image/image1.jpg";
import city2 from "../../public/image/image2.jpg";
import city3 from "../../public/image/image3.jpg";

export default function ProjectSlider() {
  // 1) Ton jeu de base
  const images = [city1, city2, city3];

  // 2) On duplique 7 fois (par exemple) pour créer une très longue rangée
  const REPEAT = 7;
  const slides = Array(REPEAT)
    .fill(images)
    .flat(); // length = images.length * REPEAT

  // 3) On démarre au « centre » de cette longue rangée
  const startIndex = images.length * Math.floor(REPEAT / 2);
  const [idx, setIdx] = useState(startIndex);

  // 4) Dimensions en px
  const CARD_W = 500;
  const CARD_H = 400;
  const GAP = 16;

  // 5) Next/Prev (pas de blocage, on ne reset jamais)
  const next = () => setIdx((i) => i + 1);
  const prev = () => setIdx((i) => i - 1);

  // 6) Wrapper centré + perspective
  const VISIBLE = 3;
  const WRAP_W = VISIBLE * CARD_W + (VISIBLE - 1) * GAP;
  // 7) Calcul translateX
  const centerOffset = WRAP_W / 2 - (CARD_W + GAP) / 2;
  const translateX = -idx * (CARD_W + GAP) + centerOffset;

  return (
    <section className="h-screen flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-4xl text-white font-serif mb-8">Latest Projects</h2>

      <div
        className="overflow-hidden"
        style={{ width: `${WRAP_W}px`, margin: "0 auto", perspective: 1000 }}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {slides.map((img, i) => {
            // position relative au centre visible
            const offset = i - idx;
            // const visible = Math.abs(offset) <= 1;
            const angle = offset === -1 ? 30 : offset === 1 ? -30 : 0;
            const scale = offset === 0 ? 1 : 0.8;
            const z = offset === 0 ? 2 : 1;
            const op = offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.5 : 0;

            return (
              <div
  key={i}
  className="flex-shrink-0 relative overflow-hidden rounded-xl"
  style={{
    width: CARD_W,
    height: CARD_H,
    marginRight: GAP,
    transform: `rotateY(${angle}deg) scale(${scale})`,
    transformStyle: "preserve-3d",
    backfaceVisibility: "hidden",
    zIndex: z,
    opacity: op,                         
    transition: "transform 0.5s, opacity 0.5s",
  }}
>
  <Image
    src={img}
    alt=""
    fill
    className="object-cover"
  />
</div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={prev} className="bg-white text-black px-6 py-2 rounded-md">
          ← Prev
        </button>
        <button onClick={next} className="bg-white text-black px-6 py-2 rounded-md">
          Next →
        </button>
      </div>
    </section>
  );
}
