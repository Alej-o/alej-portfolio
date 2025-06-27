"use client"

import { usePageTransition } from "../components/animations/PageTransition"

interface Props {
  label?: string
  href: string
  children: React.ReactNode
  className?: string
}

export default function TransitionLink({ href, children, className, label }: Props) {
  const { startTransition, setLabel } = usePageTransition() // 👈 assure-toi que c’est bien exposé

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (label) setLabel(label) // 👈 définir le texte à afficher dans le rideau
    startTransition(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
