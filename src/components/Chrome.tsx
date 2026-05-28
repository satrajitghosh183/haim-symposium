'use client'

import { useFlicker } from '@/lib/flicker-context'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '/',           label: '01 · Index'    },
  { href: '/symposium',  label: '02 · Symposium' },
  { href: '/program',    label: '03 · Program'  },
  { href: '/people',     label: '04 · People'   },
  { href: '/apply',      label: '05 · Apply'    },
]

export default function Chrome() {
  const pathname = usePathname()
  const { paused, toggle } = useFlicker()
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

      {/* Top-right: nav — numbered, spaced, bigger */}
      <nav className="chrome__tr">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname === l.href ? 'is-active' : ''}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Bottom-left: sponsors */}
      <div className="chrome__bl">
        <span>NSF · supported</span>
        <span style={{ color: 'var(--line)' }}>·</span>
        <span>Nov 06 — 07 · 2026</span>
      </div>

      {/* Bottom-right: clock + frame counter + pause toggle */}
      <div className="chrome__br">
        <span>{time}</span>
        {frame > 0 && (
          <>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span style={{ color: 'var(--accent)' }}>{String(frame).padStart(2, '0')}</span>
          </>
        )}
        <button
          onClick={toggle}
          title={paused ? 'Resume hallucinations' : 'Stop hallucinations'}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: paused ? 'var(--accent)' : 'var(--text-faint)',
            border: `1px solid ${paused ? 'var(--accent)' : 'var(--line-soft)'}`,
            padding: '3px 10px',
            background: paused ? 'color-mix(in oklab, var(--accent) 10%, transparent)' : 'transparent',
            transition: 'all .25s',
            cursor: 'none',
          }}
        >
          {paused ? '▶ resume' : '■ stop'}
        </button>
      </div>
    </div>
  )
}
