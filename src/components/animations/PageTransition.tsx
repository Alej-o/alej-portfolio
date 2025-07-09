"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  useCallback,
} from "react"
import { useRouter, usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

// Types

type Phase = "idle" | "covering" | "revealing"

type PendingTransition = {
  url: string
  label?: string
  id: number
  timestamp: number
}

interface PageTransitionContextType {
  startTransition: (url: string, label?: string) => void
  setLabel: (label: string | null) => void
  phase: Phase
  isTransitioning: boolean
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  startTransition: () => {},
  setLabel: () => {},
  phase: "idle",
  isTransitioning: false,
})

export const usePageTransition = () => useContext(PageTransitionContext)

interface PageTransitionProps {
  children: ReactNode
  overlayColor?: string
  duration?: number
  easingCurve?: number[]
  debounceMs?: number
}

export default function PageTransition({
  children,
  overlayColor = "bg-black",
  duration = 1.3,
  easingCurve = [0.22, 1, 0.36, 1],
  debounceMs = 100,
}: PageTransitionProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>("idle")
  const [label, setLabel] = useState<string | null>(null)
  const [showChildren, setShowChildren] = useState(true)
  const [currentTransition, setCurrentTransition] = useState<PendingTransition | null>(null)
  const [transitionQueue, setTransitionQueue] = useState<PendingTransition[]>([])
  const transitionIdRef = useRef<number | null>(null)
  const lastTransitionTimeRef = useRef<number>(0)
  const animationCompleteTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTransitioning = phase !== "idle"

  const processNextTransition = useCallback(() => {
    setTransitionQueue(queue => {
      if (queue.length === 0) return queue
      const nextTransition = queue[0]
      const remainingQueue = queue.slice(1)
      transitionIdRef.current = nextTransition.id
      setCurrentTransition(nextTransition)
      setLabel(nextTransition.label || null)
      setPhase("covering")
      return remainingQueue
    })
  }, [])

  const startTransition = useCallback((url: string, labelText?: string) => {
    const now = Date.now()
    if (url === pathname || now - lastTransitionTimeRef.current < debounceMs) return

    const isExternal = url.startsWith("http") || url.startsWith("#") || url.startsWith("mailto:") || url.startsWith("tel:")
    if (isExternal) {
      router.push(url)
      return
    }

    const newTransition: PendingTransition = {
      url,
      label: labelText,
      id: now,
      timestamp: now,
    }

    lastTransitionTimeRef.current = now

    if (phase === "idle") {
      transitionIdRef.current = newTransition.id
      setCurrentTransition(newTransition)
      setLabel(labelText || null)
      setPhase("covering")
    } else {
      setTransitionQueue(queue => {
        if (phase === "covering") {
          transitionIdRef.current = newTransition.id
          setCurrentTransition(newTransition)
          setLabel(labelText || null)
          return queue
        }
        const filteredQueue = queue.filter(t => t.url !== newTransition.url)
        return [...filteredQueue, newTransition]
      })
    }
  }, [phase, router, pathname, debounceMs])

  const handleAnimationComplete = useCallback(() => {
    if (animationCompleteTimeoutRef.current) clearTimeout(animationCompleteTimeoutRef.current)

    animationCompleteTimeoutRef.current = setTimeout(() => {
      if (phase === "covering" && currentTransition) {
        setShowChildren(false)
        router.push(currentTransition.url)
      } else if (phase === "revealing") {
        if (transitionQueue.length > 0) {
          processNextTransition()
        } else {
          transitionIdRef.current = null
          setPhase("idle")
          setLabel(null)
          setCurrentTransition(null)
        }
      }
    }, 50)
  }, [phase, currentTransition, transitionQueue, processNextTransition, router])

  // Détection du changement de page
  useEffect(() => {
    if (phase === "covering" && currentTransition?.url === pathname) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShowChildren(true)
          setPhase("revealing")
        })
      })
    }
  }, [pathname, phase, currentTransition])

  useEffect(() => {
    return () => {
      if (animationCompleteTimeoutRef.current) clearTimeout(animationCompleteTimeoutRef.current)
      if (transitionIdRef.current) {
        setPhase("idle")
        setLabel(null)
        setCurrentTransition(null)
        setTransitionQueue([])
      }
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isTransitioning ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isTransitioning])

  return (
    <PageTransitionContext.Provider value={{ startTransition, setLabel, phase, isTransitioning }}>
      {showChildren && children}

      <AnimatePresence mode="wait">
        {phase !== "idle" && currentTransition && (
          <motion.div
            key={`transition-${currentTransition.id}`}
            className={`fixed top-0 left-0 w-full h-full ${overlayColor} z-[9999] flex items-center justify-center`}
            initial={{ y: "100%" }}
            animate={{ y: phase === "covering" ? "0%" : "-100%" }}
            exit={{ y: "-100%" }}
            transition={{ duration, ease: easingCurve }}
            onAnimationComplete={handleAnimationComplete}
          >
            <AnimatePresence mode="wait">
              {label && (
                <motion.span
                  key={`label-${currentTransition.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: easingCurve }}
                  className="text-beige text-6xl font-title uppercase pointer-events-none"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  )
}
