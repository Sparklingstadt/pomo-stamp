import { PomodoroMode } from "./types";

export const POMODORO_CONFIG: Record<PomodoroMode, number> = {
    focus: 25 * 60,
    break: 5 * 60
  }
