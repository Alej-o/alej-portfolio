"use client"

import { usePageTransition } from "../components/animations/PageTransition"

interface Props {
  label?: string
  href: string
  children: React.ReactNode
  className?: string
}

export default function TransitionLink({ href, children, className, label }: Props) {
  const { startTransition, setLabel } = usePageTransition() 

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (label) setLabel(label)
    startTransition(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
