'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useMenuStore } from '../../app/lib/menuStore'
import { usePageTransition } from './PageTransition'
import { usePathname } from 'next/navigation'
import { useEffect, useCallback } from 'react'

const menuLinks = [
  { label: 'Accueil', scrollTo: null },
  { label: 'À propos', scrollTo: 'about' },
  { label: 'Projets', scrollTo: 'projects' },
  { label: 'Contact', href: 'mailto:lejour.agathe@outlook.fr' },
]

interface MobileMenuOverlayProps {
  isDarkBackground?: boolean
  scrolled?: boolean
}

export default function MobileMenuOverlay({ 
}: MobileMenuOverlayProps = {}) {
  const { isOpen, closeMenu } = useMenuStore()
  const { startTransition } = usePageTransition()
  const pathname = usePathname()
  const isHome = pathname === '/'

  const handleClick = useCallback((scrollTo?: string | null, href?: string) => {
    if (href) {
      window.location.href = href
      closeMenu()
      return
    }

    closeMenu()

    if (scrollTo) {
      if (isHome) {
        const el = document.getElementById(scrollTo)
        if (el) {
          // Délai légèrement plus long pour permettre l'animation de fermeture
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 700)
        }
      } else {
        sessionStorage.setItem('scrollTo', scrollTo)
        startTransition('/', scrollTo.toUpperCase())
      }
    } else {
      // Navigation vers accueil
      if (!isHome) {
        startTransition('/', 'ACCUEIL')
      }
    }
  }, [isHome, closeMenu, startTransition])

  // Gestion du scroll et du body overflow
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) closeMenu()
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu()
      }
    }

    if (isOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      document.addEventListener('keydown', handleEscape)
      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden'
      // Ajouter une classe pour les styles additionnels si nécessaire
      document.body.classList.add('menu-open')
    } else {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('menu-open')
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
      document.body.classList.remove('menu-open')
    }
  }, [isOpen, closeMenu])

  // Animations variants pour une meilleure performance
  const overlayVariants = {
    hidden: { 
      y: '-100%',
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    },
    visible: { 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    }
  }

  const menuItemVariants = {
    hidden: { 
      y: '100%', 
      opacity: 0 
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      }
    })
  }

  const indicatorVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.8, duration: 0.3 }
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black text-beige flex flex-col items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          // Empêcher la propagation des clics sur l'overlay
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bouton de fermeture */}
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-lg sm:text-xl md:text-2xl font-title uppercase text-beige hover:opacity-70 transition-opacity duration-300 z-10"
            aria-label="Fermer le menu"
          >
            Fermer
          </button>

          {/* Menu principal */}
          <nav role="navigation" aria-label="Menu principal">
            <ul className="space-y-4 sm:space-y-6 md:space-y-8 text-2xl sm:text-3xl md:text-4xl font-title uppercase text-center px-4">
              {menuLinks.map(({ label, scrollTo, href }, i) => (
                <motion.li
                  key={label}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  <button 
                    onClick={() => handleClick(scrollTo, href)}
                    className="hover:opacity-70 transition-opacity duration-300 py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-beige focus:ring-opacity-50 rounded"
                    aria-label={`Aller à ${label}`}
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Indicateur de page actuelle */}
          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-title uppercase text-beige/60"
            variants={indicatorVariants}
            initial="hidden"
            animate="visible"
            aria-live="polite"
          >
            {isHome ? 'Accueil' : 'Page actuelle'}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}