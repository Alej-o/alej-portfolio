"use client";
import { motion } from "framer-motion";

export default function FlipLink({
  children,
  href,
}: {
  children: string;
  href: string;
}) {
  return (
    <motion.a
  initial="initial"
  whileHover="hovered"
  href={href}
  className="relative block overflow-hidden whitespace-nowrap text-white font-milk-honey text-4xl sm:text-5xl md:text-6xl py-4"
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
    className="absolute inset-0 py-4"
    variants={{
      initial: { y: "100%" },
      hovered: { y: 0 },
    }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
</motion.a>

  );
}
