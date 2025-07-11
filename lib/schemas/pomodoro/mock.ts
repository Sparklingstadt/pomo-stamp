import type { Pomodoro } from "./schema"

export const mockPomodoros: Pomodoro[] = [
    {
        id: crypto.randomUUID(),
        task: "見本ぽも",
        date: {
            month: 7,
            day: 7
        }
    },
    {
        id: crypto.randomUUID(),
        task: "見本ぽも",
        date: {
            month: 7,
            day: 7
        }
    }
]
