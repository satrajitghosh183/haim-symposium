'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// useLayoutEffect is safe in client components; falls back to useEffect during SSR
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

function useIsFinePointer() {
  const [fine, setFine] = useState(false)
  useIsomorphicLayoutEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches)
  }, [])
  return fine
}

export default function Cursor() {
  const isFine = useIsFinePointer()
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isFine) return

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      setCoords({ x: e.clientX, y: e.clientY })
    }

    const onEnter = (e: MouseEvent) => {
      const el = e.target as Element
      if (el.matches('a, button, .lrow, .slot, .person, .flicker, [data-hover]')) {
        setHover(true)
      }
    }

    const onLeave = (e: MouseEvent) => {
      const el = e.target as Element
      if (el.matches('a, button, .lrow, .slot, .person, .flicker, [data-hover]')) {
        setHover(false)
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    const animate = () => {
      const lerp = 0.22
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isFine])

  if (!isFine) return null

  return (
    <div
      ref={cursorRef}
      className={`cursor${hover ? ' is-hover' : ''}`}
      aria-hidden="true"
    >
      <div className="cursor__ring" />
      <div className="cursor__dot" />
      <span className="cursor__txt">
        {coords.x},{coords.y}
      </span>
    </div>
  )
}
