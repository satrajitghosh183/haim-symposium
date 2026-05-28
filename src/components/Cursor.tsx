'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function Cursor() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const ringRef    = useRef<HTMLDivElement>(null)
  const txtRef     = useRef<HTMLSpanElement>(null)
  const pos        = useRef({ x: -200, y: -200 })
  const target     = useRef({ x: -200, y: -200 })
  const raf        = useRef<number>(0)

  useIsomorphicLayoutEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const LERP = 0.18

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    // Hover detection — purely via DOM class, no React state
    const onOver = (e: MouseEvent) => {
      const el = e.target as Element
      if (el.closest('a, button, .lrow, .slot, .person, .flicker')) {
        cursorRef.current?.classList.add('is-link')
      } else {
        cursorRef.current?.classList.remove('is-link')
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * LERP
      pos.current.y += (target.current.y - pos.current.y) * LERP

      const x = pos.current.x.toFixed(1)
      const y = pos.current.y.toFixed(1)

      // All DOM writes — zero React re-renders
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`
      }
      if (txtRef.current) {
        txtRef.current.textContent =
          `${String(Math.round(pos.current.x)).padStart(4,'0')} · ${String(Math.round(pos.current.y)).padStart(4,'0')}`
      }

      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div ref={cursorRef} className="cursor" aria-hidden="true">
      <div ref={ringRef} className="cursor__ring" />
      <div className="cursor__dot" />
      <span ref={txtRef} className="cursor__txt" />
    </div>
  )
}
