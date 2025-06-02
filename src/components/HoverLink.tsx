"use client";

import {
  useMotionValue,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import FlipLink from "./FlipLink";

interface ProjectProps {
  heading: string;
  subheading: string[];
  hoverHeading: string;
  hoverSubheading: string;
  imgSrc: string;
  href: string;
}

export const HoverLink = ({
  heading,
  imgSrc,
  subheading,
  href,
  hoverHeading,
  hoverSubheading,
}: ProjectProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative group flex w-full items-center justify-between border-b-2 py-4 transition-colors duration-500 ${
        isHovered ? "border-yellow" : "border-beige"
      }`}
    >
     
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full"
      >
        <FlipLink
          hovered={isHovered}
          href={href}
          className="text-left space-y-2 pointer-events-none w-full"
          hoverChildren={
            <>
              <div className="text-4xl font-milk-honey text-yellow">
                {hoverHeading}
              </div>
              <div className="text-4xl font-milk-honey text-yellow mt-4">
                {hoverSubheading}
              </div>
            </>
          }
        >
          <div className="text-4xl  font-milk-honey text-beige">
            {heading}
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
  {subheading.map((tech, i) => (
    <span
      key={i}
      className="px-4 py-1 rounded-full border border-beige text-beige text-sm md:text-lg"
    >
      {tech}
    </span>
  ))}
</div>
        </FlipLink>
      </div>

    
      {isHovered && (
        <motion.img
          style={{ top, left, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0, rotate: "-12.5deg", opacity: 0 }}
          animate={{ scale: 1, rotate: "12.5deg", opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          src={imgSrc}
          className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
          alt={`Image representing a link for ${heading}`}
        />
      )}

      <motion.div
        animate={
          isHovered
            ? { x: "0%", opacity: 1 }
            : { x: "25%", opacity: 0 }
        }
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <ArrowRight className="text-5xl text-yellow" size={40} />
      </motion.div>
    </motion.div>
  );
};
