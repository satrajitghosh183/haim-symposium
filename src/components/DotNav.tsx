'use client'

import { useEffect, useState } from 'react'

interface DotNavProps {
  links: { href: string; label: string }[]
}

export default function DotNav({ links }: DotNavProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ids = links.map((l) => l.href.replace('#', ''))
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
      { threshold: 0.4 }
    )

    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [links])

  const handleClick = (href: string, idx: number) => {
    setActive(idx)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="dotnav" aria-label="Section navigation">
      {links.map((link, idx) => (
        <button
          key={link.href}
          className={`dotnav__item${active === idx ? ' is-active' : ''}`}
          onClick={() => handleClick(link.href, idx)}
          aria-label={`Jump to ${link.label}`}
        >
          <span className="dotnav__label">{link.label}</span>
          <span className="dotnav__pip" />
        </button>
      ))}
    </nav>
  )
}
