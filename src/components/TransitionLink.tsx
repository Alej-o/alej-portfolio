"use client"

import { usePageTransition } from "../components/animations/PageTransition"

interface Props {
  href: string
  children: React.ReactNode
  className?: string
}

export default function TransitionLink({ href, children, className }: Props) {
  const { startTransition } = usePageTransition()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    startTransition(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
