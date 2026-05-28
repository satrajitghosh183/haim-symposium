'use client'

import { useFlicker } from '@/lib/flicker-context'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/',          label: '01 · Index'    },
  { href: '/symposium', label: '02 · Symposium' },
  { href: '/program',   label: '03 · Program'  },
  { href: '/people',    label: '04 · People'   },
  { href: '/apply',     label: '05 · Apply'    },
  { href: '/submit',    label: '06 · Submit'   },
]

export default function Chrome() {
  const pathname = usePathname()
  const { paused, toggle } = useFlicker()

  return (
    <div className="chrome" aria-hidden="true">

      {/* Top-left: brand + stop button inline */}
      <div className="chrome__tl">
        <span className="dot" />
        <Link href="/" className="brand">
          <em>HAIM</em> — Hallucinations of AI Models
        </Link>
        <span className="halt-wrap" style={{ marginLeft: '16px' }}>
          <button
            onClick={toggle}
            className={`halt-btn${paused ? ' halt-btn--paused' : ''}`}
            aria-label={paused ? 'Resume hallucinations' : 'Stop hallucinations'}
          >
            <span className="halt-btn__icon">{paused ? '▶' : '■'}</span>
            <span className="halt-btn__label">{paused ? 'resume' : 'stop'}</span>
          </button>
          <span className="halt-tooltip">
            {paused ? 'Resume hallucinations' : 'Stop hallucinations'}
          </span>
        </span>
      </div>

      {/* Top-right: nav */}
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

      {/* Bottom chrome removed — keeping it minimal */}

    </div>
  )
}
