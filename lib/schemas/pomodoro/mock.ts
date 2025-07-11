import type { Pomodoro } from "./schema"

export const mockPomodoro: Pomodoro = {
    id: crypto.randomUUID(),
    task: "Pomoぽも",
    date: {
        month: 7,
        day: 7
    }
}