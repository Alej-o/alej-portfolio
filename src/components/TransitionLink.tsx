"use client"

import { usePageTransition } from "@/components/animations/PageTransition"
import { saveLabelForUrl } from "@/app/lib/transitionLabelStore"
import { useRouter } from "next/navigation"
import {
  forwardRef,
  type MouseEvent,
  type AnchorHTMLAttributes,
  useRef,
} from "react"

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  label?: string
  href: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
  skipTransition?: boolean
  debounceMs?: number
}

const TransitionLink = forwardRef<HTMLAnchorElement, Props>(
  ({
    href,
    children,
    className,
    label,
    disabled = false,
    skipTransition = false,
    debounceMs = 100,
    onClick,
    ...props
  }, ref) => {
    const { startTransition, isTransitioning } = usePageTransition()
    const router = useRouter()
    const lastClickRef = useRef<number>(0)

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      const now = Date.now()

      onClick?.(e)
      if (e.defaultPrevented) return
      e.preventDefault()

      if (disabled) return
      if (now - lastClickRef.current < debounceMs) return
      lastClickRef.current = now

     if (href.startsWith('#')) {
  if (skipTransition) {
    const element = document.getElementById(href.slice(1))
    element?.scrollIntoView({ behavior: 'smooth' })
  }
  return
}

      if (
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        window.open(href, '_blank', 'noopener,noreferrer')
        return
      }

   
      if (skipTransition) {
        router.push(href)
        return
      }

      if (label) saveLabelForUrl(href, label)
      startTransition(href, label)
    }

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={`${className} ${disabled ? 'pointer-events-none' : ''}`}
        aria-disabled={disabled}
        data-transitioning={isTransitioning}
        {...props}
      >
        {children}
      </a>
    )
  }
)

TransitionLink.displayName = 'TransitionLink'

export default TransitionLink
