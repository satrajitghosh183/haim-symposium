import React from 'react'

interface FrameProps {
  id?: string
  children: React.ReactNode
  variant?: 'default' | 'tall' | 'split' | 'left'
  caption?: React.ReactNode
  screenLabel?: string
}

export default function Frame({
  id,
  children,
  variant = 'default',
  caption,
  screenLabel,
}: FrameProps) {
  const classes = [
    'frame',
    variant === 'tall' ? 'frame--tall' : '',
    variant === 'split' ? 'frame--split' : '',
    variant === 'left' ? 'frame--left' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={classes}>
      {children}
      {(caption || screenLabel) && (
        <div className="frame__caption">
          <span>{caption}</span>
          {screenLabel && (
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '10px' }}>
              {screenLabel}
            </span>
          )}
        </div>
      )}
    </section>
  )
}
