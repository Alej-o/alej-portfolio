"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import city1 from "../../public/image/image1.jpg";
import city2 from "../../public/image/image2.jpg";
import city3 from "../../public/image/image3.jpg";

export default function ProjectSlider() {
  const images = [city1, city2, city3];
  // const total = 5; // nombre de positions fixes
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 0, 1]);

  const handleNext = () => {
    setPositionIndexes((prev) =>
      prev.map((i) => (i + 1) % images.length)
    );
  };

  const handleBack = () => {
    setPositionIndexes((prev) =>
      prev.map((i) => (i - 1 + images.length) % images.length)
    );
  };

  const positions = ["center", "left1", "left", "right", "right1"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 3 },
    left: { x: "-90%", scale: 0.5, zIndex: 2 },
    right: { x: "90%", scale: 0.5, zIndex: 2 },
    right1: { x: "50%", scale: 0.7, zIndex: 3 },
  };

  return (
    <section className=" flex flex-col items-center justify-center h-screen relative overflow-hidden" id="projects">
    

      <div className="relative w-full h-[400px] flex items-center justify-center">
        {positionIndexes.map((imgIndex, posIndex) => (
          <motion.div
            key={`${imgIndex}-${posIndex}`}
            className="absolute"
            initial="center"
            animate={positions[posIndex]}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={images[imgIndex]}
              alt={`image-${imgIndex}`}
              width={400}
              height={300}
              className="rounded-xl object-cover"
            />
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4 mt-10 z-10">
        <button onClick={handleBack} className="bg-white text-black py-2 px-4 rounded-md">← Back</button>
        <button onClick={handleNext} className="bg-white text-black py-2 px-4 rounded-md">Next →</button>
      </div>
    </section>
  );
}
