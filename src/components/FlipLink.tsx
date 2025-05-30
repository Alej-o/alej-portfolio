"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function FlipLink({
  hoverChildren,
  children,
  href,
}: {
  children: ReactNode;
  hoverChildren: ReactNode;
  href: string;
  className?: string;
   hovered?: boolean;
}) {
  return (
    <motion.a
  initial="initial"
  whileHover="hovered"
  href={href}
  className="relative block w-full overflow-hidden whitespace-nowrap text-beige font-milk-honey text-2xl sm:text-2xl md:text-4xl py-4"
>
  <motion.div
    variants={{
      initial: { y: 0 },
      hovered: { y: "-150%" },
    }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {children}
  </motion.div>

  <motion.div
    className="absolute inset-0 py-4  text-yellow"
    variants={{
      initial: { y: "100%" },
      hovered: { y: 0 },
    }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {hoverChildren}
  </motion.div>
</motion.a>

  );
}
