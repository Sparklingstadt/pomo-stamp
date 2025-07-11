import type { Pomodoro } from "./schema"

export const mockPomodoro: Pomodoro = {
    id: crypto.randomUUID(),
    task: "見本ぽも",
    date: {
        month: 7,
        day: 7
    }
}