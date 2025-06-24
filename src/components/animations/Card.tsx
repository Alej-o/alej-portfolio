"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface CardProps {
  img: StaticImageData;
  title: string;
  description: string;
  href: string;
  offset: number;         // –∞ … +∞ mais on ne stylise qu’entre –1 et +1
  onPrev: () => void;
  onNext: () => void;
}

export function Card({
  img,
  title,
  description,
  href,
  offset,
  onPrev,
  onNext,
}: CardProps) {
  const isVisible = Math.abs(offset) <= 1;

  // Typage explicite pour ESLint
  const cardStyle: React.CSSProperties = {
    width:              500,
    height:             400,
    marginRight:        16,
    transformStyle:     "preserve-3d",
    backfaceVisibility: "hidden",
    transition:         "transform 0.5s, opacity 0.5s",
    overflow:           "hidden",
    // Only apply transforms/opacity when in the visible window
    transform:          isVisible
      ? `rotateY(${offset === -1 ? 1 : offset === 1 ? -1 : 0}deg)
         rotateX(${offset === 0 ? 0 : 5}deg)
         scale(${offset === 0 ? 1 : 0.8})`
      : "none",
    opacity:            isVisible ? (offset === 0 ? 1 : 0.5) : 0,
    zIndex:             isVisible && offset === 0 ? 2 : 1,
    pointerEvents:      isVisible ? "auto" : "none",
  };

  return (
    <div className="flex-shrink-0 relative rounded-xl" style={cardStyle}>
      {/* Image de fond */}
      <Image
        src={img}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 500px"
        className="object-cover"
      />

     

      {/* Contenu */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
  {/* ← conteneur semi-transparent autour du texte */}
  <div className="bg-white bg-opacity-70 backdrop-blur-sm px-4 py-2 rounded-lg text-center">
    <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    <p className="mt-2 text-sm text-gray-700">{description}</p>
    <Link
      href={href}
      className="mt-4 inline-block text-blue-600 hover:underline"
    >
      En savoir plus →
    </Link>
  </div>
</div>

      {/* Flèches sur la carte centrale */}
      {offset === 0 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black p-2 rounded-full z-20"
          >
            ←
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black p-2 rounded-full z-20"
          >
            →
          </button>
        </>
      )}
    </div>
  );
}
