import z from 'zod/v4';

export const pomodoroSchema = z.object({
  id: z.number(),
  uuid: z.uuid(),
  task: z.string(),
  memo: z.string(),
  date: z.object({
    month: z.number().min(1).max(12),
    day: z.number().min(1).max(31),
  }),
});

export const pomodoroPostSchema = z.object({
  task: z.string(),
  memo: z.string(),
  date: z.object({
    month: z.string(),
    day: z.string(),
  }),
})

export const pomodoroResponseSchema = z.object({
  id: z.number(),
  uuid: z.uuid(),
  task: z.string(),
  memo: z.string(),
  month: z.number().min(1).max(12),
  day: z.number().min(1).max(31),
});

export type Pomodoro = z.infer<typeof pomodoroSchema>;
export type PomodoroPost = z.infer<typeof pomodoroPostSchema>;
export type PomodoroResponse = z.infer<typeof pomodoroResponseSchema>;
