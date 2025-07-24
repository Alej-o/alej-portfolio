"use client"; 

import {
  useMotionValue,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import FlipLink from "./FlipLink"

interface ProjectProps {
  slug: string;
  title: string;
  heading: string;
  subheading: string[];
  hoverHeading: string;
  hoverSubheading: string;
  imgSrc: string;
  isFirst?: boolean;
  transitionLabel?: string;
  variant?: "default" | "compact";
}

const useIsMobile = (breakpoint = 1280) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
};

export const HoverLink = ({
  heading,
  title,
  imgSrc,
  subheading,
  slug,
  hoverHeading,
  hoverSubheading,
  transitionLabel,
  variant = "default",
}: ProjectProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const [inViewRef, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const isMobile = useIsMobile();

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

  const headingSize = variant === "compact" ? "text-3xl xl:text-4xl" : "text-3xl md:text-4xl xl:text-6xl";
  const subheadingSize = variant === "compact" ? "text-lg" : "text-4xl";
  const tagSize = variant === "compact" ? "text-xs md:text-sm" : "text-sm xl:text-lg md:text-lg";
  const spacing = variant === "compact" ? "gap-2 " : "gap-2 md:gap-4 xl:gap-4";
  const px = variant === "compact" ? "px-2" : "px-6 xl:px-8";

  return (
    <motion.div
      ref={(node) => {
        ref.current = node;
        inViewRef(node);
      }}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsHovered(false) : undefined}
      className={`relative group flex w-full h-full items-center justify-between border-b transition-colors duration-500 border-black`}
    >
      <FlipLink
        label={transitionLabel}
        hovered={isHovered}
        href={`/projects/${slug}`}
        className="pointer-events-none w-full h-full"
        hoverBackground={!isMobile}
        hoverChildren={
          !isMobile && (
            <div className={`h-full flex items-center justify-between ${px}`}>
              <div className={`text-left flex flex-col justify-center ${spacing}`}>
                <div className={`font-title uppercase text-beige ${headingSize}`}>
                  {hoverHeading}
                </div>
                <div className={`font-title text-beige ${subheadingSize}`}>
                  {hoverSubheading}
                </div>
              </div>
              <motion.div
                animate={isHovered ? { x: "0%", opacity: 1 } : { x: "25%", opacity: 0 }}
                transition={{ type: "spring" }}
                className="relative z-10 p-2"
              >
                <ArrowRight
                  className={
                    variant === "compact"
                      ? "w-5 h-5 sm:w-6 sm:h-6  text-beige"
                      : "w-7 h-7 xl:w-10 xl:h-10  text-beige"
                  }
                />
              </motion.div>
            </div>
          )
        }
      >
        <div className={`h-full flex items-center justify-between ${px}`}>
          <div className={`text-left flex flex-col justify-center py-4 md:py-4 xl:py-0 ${spacing}`}>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className={`font-title uppercase text-black ${headingSize}`}
              >
                {isMobile ? title : heading}
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-wrap gap-2"
              >
                {subheading.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-md font-eb-garamond border border-black text-black ${tagSize}`}
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
          {isMobile && (
            <ArrowRight
              className={"w-6 h-6 flex-shrink-0 lg:w-8 lg:h-8 text-black"}
            />
          )}
        </div>
      </FlipLink>
      {!isMobile && isHovered && variant !== "compact" && (
        <motion.img
          style={{
            top,
            left,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0, rotate: "-12.5deg", opacity: 0 }}
          animate={{ scale: 1, rotate: "12.5deg", opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          src={imgSrc}
          className="absolute z-0 h-24 w-32 rounded-lg object-cover "
          alt={`Image representing a link for ${heading}`}
        />
      )}
    </motion.div>
  );
};
