'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import FlipLink from '../animations/FlipLink'
import { usePageTransition } from '../animations/PageTransition'
import MobileMenuOverlay from '../animations/MobileMenuOverlay'
import { useMenuStore } from '../../app/lib/menuStore'

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
    window.addEventListener('scroll', onScroll)
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

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 w-full min-h-[64px] xl:px-4 ${transitionClass} z-[10000] ${
        scrolled ? 'bg-black/10 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      
      <div className="relative flex items-center w-full min-w-0 px-4 py-2 xl:hidden overflow-hidden">
        <button
          onClick={handleHeroClick}
          disabled={heroDisabled}
          aria-label="Retour à l'accueil"
          className={`
            w-10 h-10 flex items-center justify-center flex-shrink-0
            ${transitionClass}
            ${heroDisabled ? 'pointer-events-none cursor-default' : 'cursor-pointer'}
            group
          `}
          tabIndex={heroDisabled ? -1 : 0}
        >
          <span
            className={`font-title text-2xl md:text-4xl uppercase tracking-tight select-none ${textColorClass} ${transitionClass}`}
            style={{ letterSpacing: '0.08em' }}
          >
            AL
          </span>
        </button>
        <div
          className={`
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            font-title text-xl md:text-2xl lg:text-3xl uppercase
            ${textColorClass} ${transitionClass}
            max-w-[60vw] truncate text-center pointer-events-none
          `}
          style={{ lineHeight: 1.1 }}
        >
          Portfolio 2025
        </div>
        <button
          onClick={toggleMenu}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
          className={`
            ml-auto uppercase font-title text-xl md:text-2xl lg:text-3xl 
            ${textColorClass} ${transitionClass}
            hover:opacity-70 flex-shrink-0
          `}
        >
          {isOpen ? 'Fermer' : 'Menu'}
        </button>
      </div>

      
      <nav className="hidden xl:grid grid-cols-3 items-center px-6  py-4">
        <div className="flex justify-start">
          <button
            onClick={handleHeroClick}
            disabled={heroDisabled}
            className={`
              font-title xl:text-2xl 2xl:text-4xl uppercase 
              ${textColorClass} ${transitionClass}
              ${heroDisabled ? 'pointer-events-none cursor-default ' : 'cursor-pointer'}
            `}
            tabIndex={heroDisabled ? -1 : 0}
            aria-label="Retour à l'accueil"
          >
            Agathe Lejour
          </button>
        </div>

        <div
          className={`
            text-center font-title lg:text-2xl xl:text-2xl 2xl:text-4xl uppercase
            ${textColorClass} ${transitionClass}
          `}
        >
          Portfolio 2025
        </div>

        <ul className="flex justify-end items-center gap-4 xl:gap-6 2xl:gap-8 font-title uppercase">
          {links.map(({ scrollTo, href, label }) => {
            const isExternal = href?.startsWith('mailto:')
            const isAnchor = isHome && scrollTo
            const fullHref = scrollTo ? `/#${scrollTo}` : href!
            const handleClick = (e: React.MouseEvent) => {
              if (scrollTo) {
                e.preventDefault()
                if (isHome) {
                  const el = document.getElementById(scrollTo)
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                } else {
                  sessionStorage.setItem('scrollTo', scrollTo)
                  startTransition('/', label.toUpperCase())
                }
              }
            }

            return (
              <li key={label}>
                <FlipLink
                  href={fullHref}
                  label={label.toUpperCase()}
                  skipTransition={Boolean(isAnchor || isExternal)}
                  onClick={scrollTo ? handleClick : undefined}
                  hoverChildren={
                    <span className={`lg:text-2xl xl:text-2xl 2xl:text-4xl ${textColorClass} ${transitionClass}`}>
                      {label}
                    </span>
                  }
                >
                  <span className={`lg:text-2xl xl:text-2xl 2xl:text-4xl ${textColorClass} ${transitionClass}`}>
                    {label}
                  </span>
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
