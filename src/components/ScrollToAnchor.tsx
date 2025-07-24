'use client'
import { useEffect } from 'react'

export default function ScrollToAnchor() {
  useEffect(() => {
    const scrollTo = sessionStorage.getItem('scrollTo')
    
    if (!scrollTo) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

   
    if (scrollTo === 'top' || scrollTo === 'hero') {
      sessionStorage.removeItem('scrollTo')
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 300)
      return
    }

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
  }, [])

  return null
}