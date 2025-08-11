'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import FlipLink from '../animations/FlipLink'
import { usePageTransition } from '../animations/PageTransition'
import MobileMenuOverlay from '../animations/MobileMenuOverlay'
import { useMenuStore } from '../../app/lib/menuStore'
import Link from 'next/link'

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const pathname = usePathname()
  const { startTransition } = usePageTransition()
  const { isOpen, toggleMenu } = useMenuStore()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const hero = document.querySelector('#hero')
    if (!hero || !isHome) return setIsDarkBackground(false)
    const observer = new IntersectionObserver(
      ([entry]) => setIsDarkBackground(entry.isIntersecting),
      { threshold: 0.01, rootMargin: '-64px 0px 0px 0px' }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [isHome])

  const textColorClass = isDarkBackground ? 'text-beige' : 'text-black'
  const transitionClass = 'transition-colors duration-500'

  const links = [
    { scrollTo: 'about', label: 'À propos' },
    { scrollTo: 'projects', label: 'Projets' },
    { href: 'mailto:lejour.agathe@outlook.fr', label: 'Contact' },
  ]

  const heroDisabled = isHome && isDarkBackground && !scrolled

  const handleHeroClick = () => {
    if (!isHome) {
      sessionStorage.setItem('scrollTo', 'top')
      startTransition('/', 'ACCUEIL')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNavClick = (scrollTo: string, label: string) => {
    if (isHome) {
      const el = document.getElementById(scrollTo)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      sessionStorage.setItem('scrollTo', scrollTo)
      startTransition('/', label.toUpperCase())
    }
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 w-full min-h-[84px] xl:min-h-[96px] xl:px-6 ${transitionClass} z-[10000] ${
        scrolled ? 'bg-black/10 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[10001] bg-black text-white px-3 py-2 rounded"
      >
        Skip to main content
      </a>

      <div className="relative flex items-center w-full min-w-0 px-6 py-4 xl:hidden overflow-hidden">
        <Link
  href="/"
  aria-label="Retour à l'accueil"
  aria-disabled={heroDisabled}
  tabIndex={heroDisabled ? -1 : 0}
  onClick={(e) => {
    if (heroDisabled) {
      e.preventDefault()
      return
    }
    // Si tu veux rester en SPA avec ta transition custom :
    e.preventDefault()
    handleHeroClick()
  }}
  className={`w-14 h-14 flex items-center justify-center flex-shrink-0 group ${transitionClass} ${
    heroDisabled ? 'pointer-events-none cursor-default' : 'cursor-pointer'
  }`}
>
  <span
    className={`font-title uppercase tracking-tight select-none ${textColorClass} ${transitionClass} text-[clamp(26px,6vw,38px)]`}
    style={{ letterSpacing: '0.08em' }}
  >
    AL
  </span>
</Link>

        <div
          className={`
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            font-title uppercase ${textColorClass} ${transitionClass}
            max-w-[60vw] truncate text-center pointer-events-none
            text-[clamp(22px,5vw,34px)]
          `}
          aria-hidden="true"
        >
          Portfolio 2025
        </div>

        <button
          onClick={toggleMenu}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className={`ml-auto uppercase font-title ${textColorClass} ${transitionClass} hover:opacity-70 flex-shrink-0 text-[clamp(22px,5vw,34px)]`}
        >
          {isOpen ? 'Fermer' : 'Menu'}
        </button>
      </div>

      <nav
        aria-label="Navigation principale"
        className="hidden xl:grid grid-cols-3 items-center px-8 py-6"
      >
        <div className="flex justify-start">
        <Link
  href="/"
  aria-label="Retour à l'accueil"
  aria-disabled={heroDisabled}
  tabIndex={heroDisabled ? -1 : 0}
  onClick={(e) => {
    // bloque si heroDisabled
    if (heroDisabled) {
      e.preventDefault()
      return
    }
    // garde ta transition SPA custom
    e.preventDefault()
    handleHeroClick()
  }}
  className={`font-title uppercase ${textColorClass} ${transitionClass} ${
    heroDisabled ? 'pointer-events-none cursor-default' : 'cursor-pointer'
  } text-[clamp(28px,2vw,42px)]`}
>
  Agathe Lejour
</Link>
        </div>

        <div
          className={`text-center font-title uppercase ${textColorClass} ${transitionClass} text-[clamp(24px,1.8vw,36px)]`}
          aria-hidden="true"
        >
          Portfolio 2025
        </div>

        <ul className="flex justify-end items-center gap-6 2xl:gap-10 font-title uppercase">
          {links.map(({ scrollTo, href, label }) => {
            const isMail = href?.startsWith('mailto:')
            const linkHref = scrollTo ? `/#${scrollTo}` : href || '#'
            const commonTextClass = `${textColorClass} ${transitionClass} text-[clamp(24px,1.8vw,36px)]`
            return (
              <li key={label}>
                <FlipLink
                  href={linkHref}
                  label={label}
                  skipTransition={Boolean(isHome && scrollTo) || isMail}
                  onClick={
                    scrollTo
                      ? (e) => {
                          e.preventDefault()
                          handleNavClick(scrollTo, label)
                        }
                      : undefined
                  }
                  hoverChildren={<span className={commonTextClass}>{label}</span>}
                >
                  <span className={commonTextClass}>{label}</span>
                </FlipLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <MobileMenuOverlay />
    </header>
  )
}
