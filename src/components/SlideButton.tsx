"use client"

import { motion } from "framer-motion";
import type { ReactNode, ComponentPropsWithoutRef } from "react";

type SlideButtonProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<typeof motion.a>;

export default function SlideButton({ children, className = "", ...props }: SlideButtonProps) {
  return (
    <motion.a
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: 0.97 }}
      {...props}
      className={`relative inline-block px-6 py-3 border border-yellow text-yellow font-semibold rounded-full overflow-hidden group transition-colors duration-300 ${className}`}
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.05 },
      }}
      transition={{ duration: 0.5, ease: "easeInOut", type: "tween" }}

    >
      
      <motion.span
  variants={{
    rest: {
      clipPath: "ellipse(0% 0% at 150% 150%)", 
    },
    hover: {
      clipPath: "ellipse(150% 150% at 100% 100%)", 
    },
  }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
  className="absolute inset-0 bg-yellow z-0 rounded-md"
  aria-hidden="true"
/>


      <motion.span
        variants={{
          rest: { color: "#FB8C01", borderColor: "#FB8C01" }, // rouge
          hover: { color: "#FDE3CF", borderColor: "#FDE3CF" }, // blanc
        }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}