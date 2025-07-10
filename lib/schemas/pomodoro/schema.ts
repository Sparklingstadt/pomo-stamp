  import z from "zod"
  
  export const pomodoroSchema = z.object({
    task: z.string(),
    date: z.object({
      month: z.number().min(1).max(12),
      day: z.number().min(1).max(31)
    })
  })

  export type Pomodoro = z.infer<typeof pomodoroSchema>