'use client'
import { useEffect } from 'react'

export default function ScrollToAnchor() {
  useEffect(() => {
    const scrollTo = sessionStorage.getItem('scrollTo')
    if (scrollTo) {
      const el = document.getElementById(scrollTo)
      if (el) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        setTimeout(() => {
          el.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          })
        }, 300)
      }
      sessionStorage.removeItem('scrollTo')
    }
  }, [])

  return null
}
