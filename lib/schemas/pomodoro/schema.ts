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

const calendarDateSchema = z
  .object({
    month: z.coerce.number().int().min(1).max(12),
    day: z.coerce.number().int().min(1).max(31),
  })
  .superRefine(({ month, day }, context) => {
    const maximumDay = month === 2 ? 29 : [4, 6, 9, 11].includes(month) ? 30 : 31;

    if (day > maximumDay) {
      context.addIssue({
        code: 'custom',
        path: ['day'],
        message: `Month ${month} has at most ${maximumDay} days`,
      });
    }
  });

export const pomodoroPostSchema = z.object({
  task: z.string().trim().min(1).max(200),
  memo: z.string().trim().max(1000),
  date: calendarDateSchema,
});

export const pomodoroPutSchema = pomodoroPostSchema;

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
