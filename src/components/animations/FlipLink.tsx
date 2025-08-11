"use client";

import { motion } from "framer-motion";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import TransitionLink from "@/components/animations/TransitionLink";

export interface FlipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  hoverChildren: ReactNode;
  label?: string;              // <- le texte à afficher dans l'overlay
  hovered?: boolean;
  hoverBackground?: boolean;
  skipTransition?: boolean;
}

export default function FlipLink({
  children,
  hoverChildren,
  label,
  skipTransition = false,
  className = "",
  hovered = false,
  hoverBackground = false,
  ...props
}: FlipLinkProps) {
  const { href = "", ...restProps } = props;

  return (
    <TransitionLink
      href={href}
      label={label}                            // <- important !
      aria-label={restProps["aria-label"] ?? label}
      skipTransition={skipTransition}
      className="block w-full h-full"
      {...restProps}
    >
      <motion.div
        initial="initial"
        whileHover="hovered"
        whileFocus="hovered"
        animate={hovered ? "hovered" : "initial"}
        className={`relative block overflow-hidden font-title text-3xl sm:text-2xl md:text-4xl ${
          hoverBackground ? "py-8" : "py-1"
        } ${className}`}
      >
        {hoverBackground && (
          <>
            <motion.div
              className="absolute inset-0 w-full z-[-1]"
              variants={{ initial: { y: 0 }, hovered: { y: "-150%" } }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <div className="w-full h-full bg-transparent" />
            </motion.div>
            <motion.div
              className="absolute inset-0 h-full"
              variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <div className="w-full h-full bg-black" />
            </motion.div>
          </>
        )}

        <motion.div
          className="h-full flex flex-col justify-center relative z-10"
          variants={{ initial: { y: 0 }, hovered: { y: "-200%" } }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {children}
        </motion.div>

        <motion.div
          className="absolute inset-0 h-full flex flex-col justify-center z-10"
          variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          aria-hidden="true"
        >
          {hoverChildren}
        </motion.div>
      </motion.div>
    </TransitionLink>
  );
}
