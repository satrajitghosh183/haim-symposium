'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

const FlickerContext = createContext<{
  paused: boolean
  toggle: () => void
}>({ paused: false, toggle: () => {} })

export function FlickerProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false)
  return (
    <FlickerContext.Provider value={{ paused, toggle: () => setPaused(p => !p) }}>
      {children}
    </FlickerContext.Provider>
  )
}

export const useFlicker = () => useContext(FlickerContext)
