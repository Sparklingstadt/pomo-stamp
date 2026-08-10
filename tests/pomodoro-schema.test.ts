import { pomodoroPostSchema } from '@/lib/schemas/pomodoro/schema';

describe('pomodoroPostSchema', () => {
  it('normalizes valid form values', () => {
    expect(
      pomodoroPostSchema.parse({
        task: '  Review pull request  ',
        memo: '  Ship it  ',
        date: { month: '8', day: '11' },
      }),
    ).toEqual({
      task: 'Review pull request',
      memo: 'Ship it',
      date: { month: 8, day: 11 },
    });
  });

  it.each([
    { month: '0', day: '1' },
    { month: '13', day: '1' },
    { month: '2', day: '30' },
    { month: '4', day: '31' },
    { month: 'abc', day: '1' },
  ])('rejects invalid date $month/$day', (date) => {
    expect(
      pomodoroPostSchema.safeParse({ task: 'Task', memo: '', date }).success,
    ).toBe(false);
  });

  it('rejects a blank task', () => {
    expect(
      pomodoroPostSchema.safeParse({
        task: '   ',
        memo: '',
        date: { month: '8', day: '11' },
      }).success,
    ).toBe(false);
  });
});
