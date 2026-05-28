'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/symposium', label: 'Symposium' },
  { href: '/program', label: 'Program' },
  { href: '/people', label: 'People' },
  { href: '/apply', label: 'Apply' },
]

export default function Chrome() {
  const pathname = usePathname()
  const [time, setTime] = useState('')
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const hh = now.getUTCHours().toString().padStart(2, '0')
      const mm = now.getUTCMinutes().toString().padStart(2, '0')
      const ss = now.getUTCSeconds().toString().padStart(2, '0')
      setTime(`${hh}:${mm}:${ss} UTC`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const frames = document.querySelectorAll<HTMLElement>('.frame[id]')
    if (!frames.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Array.from(frames).indexOf(e.target as HTMLElement)
            if (idx !== -1) setFrame(idx + 1)
          }
        })
      },
      { threshold: 0.5 }
    )

    frames.forEach((f) => obs.observe(f))
    return () => obs.disconnect()
  }, [pathname])

  return (
    <div className="chrome" aria-hidden="true">
      {/* Top-left: brand */}
      <div className="chrome__tl">
        <span className="dot" />
        <Link href="/" className="brand">
          <em>HAIM</em> — Hallucinations of AI Models
        </Link>
      </div>

      {/* Top-right: nav */}
      <div className="chrome__tr">
        <nav style={{ display: 'flex', gap: '4px' }}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link${pathname === l.href ? ' is-active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom-left: sponsors */}
      <div className="chrome__bl">
        <span>NSF · supported</span>
        <span style={{ color: 'var(--line)' }}>·</span>
        <span>Nov 06 — 07 · 2026</span>
      </div>

      {/* Bottom-right: clock + frame counter */}
      <div className="chrome__br">
        <span>{time}</span>
        {frame > 0 && (
          <>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span style={{ color: 'var(--accent)' }}>{String(frame).padStart(2, '0')}</span>
          </>
        )}
      </div>
    </div>
  )
}
