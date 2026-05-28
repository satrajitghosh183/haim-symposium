'use client'

import { useEffect, useRef, useState, ElementType } from 'react'

const CHARS = '01HALCINTNRGM◆✦›—ƎᗡW✕•·∴ᗤ'

interface FlickerProps {
  words: string[]
  interval?: number
  className?: string
  as?: ElementType
}

export default function Flicker({
  words,
  interval = 3200,
  className = '',
  as: Tag = 'span',
}: FlickerProps) {
  const [display, setDisplay] = useState(words[0] ?? '')
  const [scrambling, setScrambling] = useState(false)
  const indexRef = useRef(0)
  const rafRef = useRef<number>(0)
  const scramblingRef = useRef(false)

  // Stable scramble — no closure over `display`, so deps never change
  const scrambleTo = useRef((target: string) => {
    if (scramblingRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    scramblingRef.current = true
    setScrambling(true)

    const totalFrames = 18
    let frame = 0

    const tick = () => {
      frame++
      const progress = frame / totalFrames
      let result = ''
      for (let i = 0; i < target.length; i++) {
        if (Math.random() < progress * 1.3 || progress > 0.85) {
          result += target[i]
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplay(result)

      if (frame < totalFrames) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(target)
        setScrambling(false)
        scramblingRef.current = false
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }).current

  useEffect(() => {
    if (words.length <= 1) return
    const id = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % words.length
      scrambleTo(words[indexRef.current])
    }, interval + Math.random() * 1200)
    return () => {
      clearInterval(id)
      cancelAnimationFrame(rafRef.current)
    }
  }, [words, interval, scrambleTo])

  const handleMouseEnter = () => {
    const next = (indexRef.current + 1) % words.length
    indexRef.current = next
    scrambleTo(words[next])
  }

  return (
    <Tag
      className={`flicker${scrambling ? ' is-scrambling' : ''}${className ? ' ' + className : ''}`}
      onMouseEnter={handleMouseEnter}
    >
      {display}
    </Tag>
  )
}
