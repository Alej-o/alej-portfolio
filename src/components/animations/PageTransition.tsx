"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Slide In */}
      <motion.div
  className="absolute top-0 left-0 w-full h-screen bg-[#0f0f0f] origin-bottom z-50"
  initial={{ scaleY: 0 }}
  animate={{ scaleY: 0 }}
  exit={{ scaleY: 1 }}
  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
/>
        {/* Slide Out */}
        <motion.div
  className="absolute top-0 left-0 w-full h-screen bg-[#0f0f0f] origin-top z-50"
  initial={{ scaleY: 1 }}
  animate={{ scaleY: 0 }}
  exit={{ scaleY: 0 }}
  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
/>
        {/* Contenu réel de la page */}
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
 