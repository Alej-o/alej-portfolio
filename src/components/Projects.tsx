"use client";

import { useState } from "react";
import Image from "next/image";

import city1 from "../../public/image/image1.jpg";
import city2 from "../../public/image/image2.jpg";
import city3 from "../../public/image/image3.jpg";

export default function ProjectSlider() {
  // 1) Ton jeu de base
  const images = [city1, city2, city3];

  // 2) On duplique 7x pour une longue rangée
  const REPEAT = 7;
  const slides = Array(REPEAT).fill(images).flat();

  // 3) Démarrage au milieu
  const startIndex = images.length * Math.floor(REPEAT / 2);
  const [idx, setIdx] = useState(startIndex);

  // 4) Dimensions
  const CARD_W = 500;
  const CARD_H = 400;
  const GAP    = 16;

  // 5) Next / Prev
  const next = () => setIdx((i) => i + 1);
  const prev = () => setIdx((i) => i - 1);

  // 6) Calcul du translateX pour centrer
  const VISIBLE   = 3;
  const WRAP_W    = VISIBLE * CARD_W + (VISIBLE - 1) * GAP;
  const centerOff = WRAP_W / 2 - (CARD_W + GAP) / 2;
  const translateX = -idx * (CARD_W + GAP) + centerOff;

  return (
    <section className="h-screen flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-4xl text-white font-serif mb-8">
        Latest Projects
      </h2>

      {/* wrapper centré + perspective */}
      <div
        className="overflow-hidden"
        style={{
          width: `${WRAP_W}px`,
          margin: "0 auto",
          perspective: 1000,
        }}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {slides.map((img, i) => {
            const offset = i - idx;

            // 3D transforms
            const angleY = offset === -1 ? 45 : offset === 1 ? -45 : 0;
            const angleX = offset === 0 ? 0 : 1;
            const scale  = offset === 0 ? 1 : 0.8;

            const zIndex  = offset === 0 ? 2 : 1;
            const opacity = offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.5 : 0;

            return (
              <div
                key={i}
                className="flex-shrink-0 relative rounded-xl overflow-hidden"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  marginRight: GAP,
                  transform: `
                    rotateY(${angleY}deg)
                    rotateX(${angleX}deg)
                    scale(${scale})
                  `,
                  transformStyle:    "preserve-3d",
                  backfaceVisibility:"hidden",
                  zIndex,
                  opacity,
                  transition: "transform 0.5s, opacity 0.5s",
                }}
              >
                {/* Ton image */}
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                />

                {/* ←→ flèches **seulement** sur la carte centrale */}
                {offset === 0 && (
                  <>
                    <button
                      onClick={prev}
                      className="
                        absolute left-4 top-1/2 transform -translate-y-1/2
                        bg-white bg-opacity-70 hover:bg-opacity-100
                        text-black p-2 rounded-full z-20
                      "
                    >
                      ←
                    </button>
                    <button
                      onClick={next}
                      className="
                        absolute right-4 top-1/2 transform -translate-y-1/2
                        bg-white bg-opacity-70 hover:bg-opacity-100
                        text-black p-2 rounded-full z-20
                      "
                    >
                      →
                    </button>
                    <div>
                      
                    </div>
                  </>
                  
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
