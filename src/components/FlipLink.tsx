"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FlipLinkProps {
  children: ReactNode;
  hoverChildren: ReactNode;
  href: string;
  className?: string;
  hovered?: boolean;
  hoverBackground?: boolean;
}

export default function FlipLink({
  children,
  hoverChildren,
  href,
  className = "",
  hovered = false,
  hoverBackground = false,
}: FlipLinkProps) {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      animate={hovered ? "hovered" : "initial"}
      href={href}
      className={`relative block  overflow-hidden font-title text-3xl sm:text-2xl md:text-4xl py-8 ${className}`}
    >
      {/* --- Fond animé si activé --- */}
      {hoverBackground && (
        <>
          <motion.div
            className="absolute inset-0 h-full w-full z-[-1]"
            variants={{
              initial: { y: 0 },
              hovered: { y: "-150%" },
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-transparent" />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-black" />
          </motion.div>
        </>
      )}

      {/* Texte normal */}
      <motion.div
        className="h-full flex flex-col justify-center relative z-10"
        variants={{
          initial: { y: 0 },
          hovered: { y: "-200%" },
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        {children}
      </motion.div>

      {/* Texte hover */}
      <motion.div
        className="absolute inset-0 h-full flex flex-col justify-center z-10"
        variants={{
          initial: { y: "100%" },
          hovered: { y: 0 },
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        {hoverChildren}
      </motion.div>
    </motion.a>
  );
}
