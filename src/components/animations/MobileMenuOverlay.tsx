'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useMenuStore } from '../../app/lib/menuStore'
import { usePageTransition } from './PageTransition'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useCallback, useRef } from 'react'
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

  const overlayRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const prevFocusedRef = useRef<HTMLElement | null>(null)

  const isTouch =
    typeof window !== 'undefined' && window.matchMedia('(pointer:coarse)').matches

  const handleClick = useCallback(
    (scrollTo?: string | null, href?: string) => {
      if (href) {
        window.location.href = href
        closeMenu()
        return
      }
      closeMenu()
      if (scrollTo) {
        if (isHome) {
          const el = document.getElementById(scrollTo)
          if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 700)
        } else {
          sessionStorage.setItem('scrollTo', scrollTo)
          if (isTouch) {
            router.push('/')
          } else {
            startTransition('/', scrollTo.toUpperCase())
          }
        }
      }
    },
    [isHome, closeMenu, startTransition, router, isTouch]
  )

  useEffect(() => {
    if (!isOpen) return
    prevFocusedRef.current = document.activeElement as HTMLElement

    const t = setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 0)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const root = overlayRef.current
      if (!root) return

      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables.length) {
        e.preventDefault()
        return
      }
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement

      if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKeyDown)
      prevFocusedRef.current?.focus?.()
    }
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => { if (isOpen) closeMenu() }
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
    hidden: { y: '-100%', transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
    visible: { y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
  }

  const reveal = isOpen

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[10000] bg-beige text-black flex flex-col min-h-screen"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            ref={closeBtnRef}
            onClick={closeMenu}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-xl md:text-2xl font-title uppercase text-black z-10 border border-black px-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
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
                      className={`w-full py-4 text-5xl md:text-7xl text-left uppercase font-title transition ${borderClasses} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black`}
                      aria-label={href ? `Ouvrir ${label}` : `Aller à la section ${label}`}
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
                {
                  label: 'LinkedIn',
                  href: 'https://linkedin.com/in/agathe-lejour',
                  extraProps: { 'aria-label': 'Ouvrir LinkedIn dans un nouvel onglet' },
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/Alej-o',
                  extraProps: { 'aria-label': 'Voir le GitHub dans un nouvel onglet' },
                },
                {
                  label: 'Email',
                  href: 'mailto:lejour.agathe@outlook.fr',
                  extraProps: { 'aria-label': 'Envoyer un email à Agathe' },
                },
              ].map((link, i) => (
                <RevealText reveal={reveal} delay={0.38 + i * 0.09} key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="text-2xl md:text-3xl flex items-start gap-1 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                    {...(link.extraProps || {})}
                  >
                    {link.label}
                  </a>
                </RevealText>
              ))}
            </div>
          </div>

          <div className="flex justify-center mb-8 md:mb-10">
            <RevealText reveal={reveal} delay={0.62} className="text-xl md:text-4xl text-center font-title uppercase">
              Agathe Lejour – Portfolio 2025
            </RevealText>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
