"use client";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  text: string;
  className?: string;
};

export default function TextRevealOnHover({ text, className }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const letters = text.split("");

  const letterAnimation = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex overflow-hidden ${className}`}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={letterAnimation}
          initial="initial"
          animate={isHovered ? "animate" : "initial"}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}
