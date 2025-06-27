// components/PageTransition.tsx
"use client"

import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

type Phase = "idle" | "covering" | "revealing"

const PageTransitionContext = createContext<{ startTransition: (url: string) => void }>({
  startTransition: () => {},
})

export const usePageTransition = () => useContext(PageTransitionContext)

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>("idle")

  const startTransition = (url: string) => {
    setPhase("covering")

    setTimeout(() => {
      router.push(url)
      setPhase("revealing")
    }, 800)

    setTimeout(() => {
      setPhase("idle")
    }, 1600)
  }

  return (
    <PageTransitionContext.Provider value={{ startTransition }}>
      {children}

      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key={phase}
            className="fixed top-0 left-0 w-full h-full bg-black z-[9999]"
            initial={{ y: "100%" }}
            animate={{ y: phase === "covering" ? "0%" : "-100%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  )
}
