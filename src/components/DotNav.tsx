'use client'

import { useEffect, useState } from 'react'

interface DotNavProps {
  links: { href: string; label: string }[]
}

export default function DotNav({ links }: DotNavProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ids = links.map((l) => l.href.replace('#', ''))
    const deck = document.querySelector('.deck')
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!sections.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sections.indexOf(e.target as HTMLElement)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { root: deck, threshold: 0.55 }
    )

    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [links])

  const handleClick = (href: string, idx: number) => {
    setActive(idx)
    const id = href.replace('#', '')
    const deck = document.querySelector('.deck')
    const el = document.getElementById(id)
    if (el && deck) deck.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  }

  return (
    <nav className="dotnav" aria-label="frames">
      {links.map((link, idx) => (
        // Use <a> so the existing CSS selectors (.dotnav a, .dotnav a span) apply
        <a
          key={link.href}
          href={link.href}
          className={active === idx ? 'is-active' : ''}
          onClick={(e) => { e.preventDefault(); handleClick(link.href, idx) }}
          aria-label={link.label}
        />
      ))}
    </nav>
  )
}
