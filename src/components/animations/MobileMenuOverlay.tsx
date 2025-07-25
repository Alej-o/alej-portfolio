'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useMenuStore } from '../../app/lib/menuStore'
import { usePageTransition } from './PageTransition'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useCallback } from 'react'
import RevealText from './RevealText'

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
      if (e.key === 'Escape' && isOpen) closeMenu()
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
    hidden: { y: '-100%', transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }},
    visible: { y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
  }

  const reveal = isOpen

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
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-xl md:text-2xl font-title uppercase text-black z-10 border border-black px-3 py-1"
            aria-label="Fermer le menu"
          >
            Fermer
          </button>
          <div className="grow w-full pt-44 px-4">
            <RevealText reveal={reveal} delay={0.08} className="font-eb-garamond pb-4 text-base md:text-lg">
              (Menu)
            </RevealText>
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
                  <li key={label} className="w-full">
                    <button
                      onClick={() => handleClick(scrollTo, href)}
                      className={`w-full py-4 text-5xl md:text-7xl text-left uppercase font-title transition ${borderClasses}`}
                      aria-label={`Aller à ${label}`}
                    >
                      <RevealText reveal={reveal} delay={0.17 + i * 0.09}>
                        {label}
                      </RevealText>
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="flex flex-col gap-2 mt-10 font-eb-garamond">
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com/in/tonprofil' },
                { label: 'GitHub', href: 'https://github.com/tonprofil' },
                { label: 'Email', href: 'mailto:lejour.agathe@outlook.fr', extraProps: { 'aria-label': 'Envoyer un email' } },
              ].map((link, i) => (
                <RevealText
                  reveal={reveal}
                  delay={0.38 + i * 0.09}
                  key={link.label}
                >
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="hover:underline text-2xl md:text-3xl flex items-start gap-1"
                    {...(link.extraProps || {})}
                  >
                    {link.label}
                  </a>
                </RevealText>
              ))}
            </div>
          </div>
          <div className="flex justify-center mb-4 md:mb-10 ">
            <RevealText
              reveal={reveal}
              delay={0.62}
              className="text-xl md:text-4xl text-center font-title uppercase"
            >
              Agathe Lejour – Portfolio 2025
            </RevealText>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
