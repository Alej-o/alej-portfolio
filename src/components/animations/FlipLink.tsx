"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import TransitionLink from "@/components/TransitionLink";

interface FlipLinkProps {
  children: ReactNode;
  hoverChildren: ReactNode;
  href: string;
  className?: string;
  hovered?: boolean;
  hoverBackground?: boolean;
  label?: string;
  skipTransition?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function FlipLink({
  children,
  hoverChildren,
  href,
  label,
  skipTransition = false,
  className = "",
  hovered = false,
  hoverBackground = false,
  onClick,
}: FlipLinkProps) {
  return (
    <TransitionLink
      href={href}
      label={label}
      skipTransition={skipTransition}
      onClick={onClick}
      className="block w-full h-full"
    >
      <motion.div
        initial="initial"
        whileHover="hovered"
        animate={hovered ? "hovered" : "initial"}
        className={`relative block overflow-hidden font-title text-3xl sm:text-2xl md:text-4xl ${hoverBackground ? 'py-8' : 'py-1'} ${className}`}
      >
        {hoverBackground && (
          <>
            <motion.div
              className="absolute inset-0 w-full z-[-1]"
              variants={{
                initial: { y: 0 },
                hovered: { y: "-150%" },
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-transparent" />
            </motion.div>
            <motion.div
              className="absolute inset-0 h-full"
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-black" />
            </motion.div>
          </>
        )}

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
      </motion.div>
    </TransitionLink>
  );
}
