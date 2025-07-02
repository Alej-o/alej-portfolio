"use client"

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

type Phase = "idle" | "covering" | "revealing"

type PageTransitionContextType = {
  startTransition: (url: string) => void
  setLabel: (label: string | null) => void
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  startTransition: () => {},
  setLabel: () => {},
})

export const usePageTransition = () => useContext(PageTransitionContext)

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>("idle")
  const [label, setLabel] = useState<string | null>(null)

  const startTransition = (url: string) => {
    setPhase("covering")

    setTimeout(() => {
      router.push(url)
      setPhase("revealing")
    }, 800)

    setTimeout(() => {
      setPhase("idle")
      setLabel(null) 
    }, 1600)
  }

  return (
    <PageTransitionContext.Provider value={{ startTransition, setLabel }}>
      {children}

      <AnimatePresence>
        {phase !== "idle" && (
         <motion.div
  key={phase}
  className="fixed top-0 left-0 w-full h-full bg-black z-[9999] flex items-center justify-center"
  initial={{ y: "100%" }}
  animate={{
    y: phase === "covering" ? "0%" : "-100%",
  }}
  exit={{ y: "-100%" }}
  transition={{
    duration: phase === "covering" ? 1.5 : 1.5, 
    ease: [0.22, 1, 0.36, 1],
  }}
>
            {label && (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{
      duration: 0.7,
      delay: 0.6, 
      ease: [0.22, 1, 0.36, 1],
    }}
    className="text-beige text-6xl font-title uppercase"
  >
    {label}
  </motion.span>
)}
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  )
}
