"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FlipLinkProps {
  children: ReactNode;
  hoverChildren: ReactNode;
  href: string;
  className?: string;
  hovered?: boolean;
}

export default function FlipLink({
  children,
  hoverChildren,
  href,
  className = "",
  hovered = false,
}: FlipLinkProps) {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      animate={hovered ? "hovered" : "initial"}
      href={href}
      className={`relative block w-full overflow-hidden whitespace-nowrap font-title text-3xl sm:text-2xl md:text-4xl py-4 ${className}`}
    >
      <motion.div
        variants={{
          initial: { y: 0 },
          hovered: { y: "-150%" },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute inset-0 py-4"
        variants={{
          initial: { y: "100%" },
          hovered: { y: 0 },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {hoverChildren}
      </motion.div>
    </motion.a>
  );
}
