  import z from "zod/v4"
  
  export const pomodoroSchema = z.object({
    id: z.number(),
    task: z.string(),
    date: z.object({
      month: z.number().min(1).max(12),
      day: z.number().min(1).max(31)
    })
  })

  export type Pomodoro = z.infer<typeof pomodoroSchema>