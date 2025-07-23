'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useMenuStore } from '../../app/lib/menuStore'
import { usePageTransition } from './PageTransition'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useCallback } from 'react'

const menuLinks = [
  { label: 'À propos', scrollTo: 'about' },
  { label: 'Projets', scrollTo: 'projects' },
  { label: 'Contact', href: 'mailto:lejour.agathe@outlook.fr' },
]

export default function MobileMenuOverlay() {
  const { isOpen, closeMenu } = useMenuStore()
  const { startTransition } = usePageTransition()
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'


  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer:coarse)").matches

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
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 700)
        }
      } else {
        sessionStorage.setItem('scrollTo', scrollTo)
       
        if (isTouch) {
          router.push("/")
        } else {
          startTransition('/', scrollTo.toUpperCase())
        }
      }
    }
  }, [isHome, closeMenu, startTransition, router, isTouch])

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
      document.body.style.overflow = 'hidden'
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
  
  const overlayVariants = {
    hidden: { 
      y: '-100%',
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    },
    visible: { 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
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

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-beige text-black flex flex-col min-h-screen"
          role="dialog"
          aria-modal="true"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-xl font-title uppercase text-black z-10"
            aria-label="Fermer le menu"
          >
            Fermer
          </button>

          <div className="grow w-full pt-44 px-4">
            <p className="font-eb-garamond pb-4 text-base">(Menu)</p>
            <ul className="flex flex-col w-full">
              {menuLinks.map(({ label, scrollTo, href }, i) => {
                const isFirst = i === 0
                const isLast = i === menuLinks.length - 1
                const isProjets = label === 'Projets'

                const borderClasses = [
                  isFirst ? 'border-t' : '',
                  isProjets ? 'border-t border-b' : '',
                  isLast ? 'border-b' : '',
                  'border-black',
                ].join(' ')

                return (
                  <motion.li
                    key={label}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    className="w-full"
                  >
                    <button
                      onClick={() => handleClick(scrollTo, href)}
                      className={`w-full py-4 text-5xl text-left uppercase font-title transition ${borderClasses}`}
                      aria-label={`Aller à ${label}`}
                    >
                      {label}
                    </button>
                  </motion.li>
                )
              })}
            </ul>
            <div className="flex flex-col gap-2 mt-10 font-eb-garamond">
              <a
                href="https://linkedin.com/in/tonprofil"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-2xl flex items-start gap-1"
              >
                LinkedIn 
              </a>
              <a
                href="https://github.com/tonprofil"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-2xl flex items-start gap-1"
              >
                GitHub
              </a>
              <a
                href="mailto:lejour.agathe@outlook.fr"
                className="hover:underline flex text-2xl items-start gap-1"
                aria-label="Envoyer un email">
                Email
              </a>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <span className="text-xl text-center font-title uppercase ">Agathe Lejour – Portfolio 2025</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
