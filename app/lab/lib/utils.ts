import { POMODORO_CONFIG } from "./constants"
import { PomodoroMode } from "./types"

export function getNextMode(mode: PomodoroMode): PomodoroMode {
  return mode === 'focus' ? 'break' : 'focus'
}

export function getInitialSeconds(mode: PomodoroMode): number {
  return POMODORO_CONFIG[mode]
}
