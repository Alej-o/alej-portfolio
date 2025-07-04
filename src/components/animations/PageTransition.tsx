"use client"

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
  useRef,
} from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

type Phase = "idle" | "covering" | "revealing"

type PendingTransition = {
  url: string
  label?: string
  id: number
}

type PageTransitionContextType = {
  startTransition: (url: string, label?: string) => void
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
  const [currentTransition, setCurrentTransition] = useState<PendingTransition | null>(null)
  const [nextTransition, setNextTransition] = useState<PendingTransition | null>(null)
  const transitionIdRef = useRef<number | null>(null)
  const timersRef = useRef<NodeJS.Timeout[]>([])

  const clearAllTimers = () => {
    timersRef.current.forEach(timer => clearTimeout(timer))
    timersRef.current = []
  }

  const startTransition = (url: string, labelText?: string) => {
    const isExternal = url.startsWith("#") || url.startsWith("mailto:")
    if (isExternal) {
      router.push(url)
      return
    }

    const newTransition: PendingTransition = {
      url,
      label: labelText,
      id: Date.now(),
    }

    transitionIdRef.current = newTransition.id

    if (phase === "idle") {
      setCurrentTransition(newTransition)
      setLabel(labelText || null)
      setPhase("covering")
    } else if (phase === "covering") {
     
      clearAllTimers()
      setCurrentTransition(newTransition)
      setLabel(labelText || null)
     
    } else if (phase === "revealing") {
     
      setNextTransition(newTransition)
    }
  }

  const handleAnimationComplete = () => {
    if (phase === "covering" && currentTransition) {
      router.push(currentTransition.url)
      setPhase("revealing")
    } else if (phase === "revealing") {
      if (nextTransition) {
        transitionIdRef.current = nextTransition.id
        setCurrentTransition(nextTransition)
        setLabel(nextTransition.label || null)
        setNextTransition(null)
        setPhase("covering")
      } else {
        transitionIdRef.current = null
        setPhase("idle")
        setLabel(null)
        setCurrentTransition(null)
      }
    }
  }

  useEffect(() => {
    return () => {
      clearAllTimers()
    }
  }, [])

  return (
    <PageTransitionContext.Provider value={{ startTransition, setLabel }}>
      {children}

      <AnimatePresence mode="wait">
        {phase !== "idle" && (
          <motion.div
            key={`transition-${currentTransition?.id || 'default'}`}
            className="fixed top-0 left-0 w-full h-full bg-black z-[9999] flex items-center justify-center"
            initial={{ y: "100%" }}
            animate={{ y: phase === "covering" ? "0%" : "-100%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={handleAnimationComplete}
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