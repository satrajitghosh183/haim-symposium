import React from 'react'

interface FrameProps {
  id?: string
  children: React.ReactNode
  variant?: 'default' | 'tall' | 'split' | 'left'
}

export default function Frame({ id, children, variant = 'default' }: FrameProps) {
  const classes = [
    'frame',
    variant === 'tall'  ? 'frame--tall'  : '',
    variant === 'split' ? 'frame--split' : '',
    variant === 'left'  ? 'frame--left'  : '',
  ].filter(Boolean).join(' ')

  return (
    <section id={id} className={classes}>
      {children}
    </section>
  )
}
