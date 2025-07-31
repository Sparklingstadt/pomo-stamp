'use client'

import { useState } from "react"

export default function Pomodoro() {
  const [mode, setMode] = useState<'focus' | 'break'>('focus')

  return (
    <div>
      <h1>Pomodoro mode: {mode}</h1>
      <button onClick={() => setMode(mode === 'focus' ? 'break' : 'focus')}>Toggle Mode</button>
    </div>
  )
}