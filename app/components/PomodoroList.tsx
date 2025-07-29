'use client';
import { Pomodoro } from '@/lib/schemas/pomodoro/schema';

type Props = {
  pomodoros: Pomodoro[];
};

export default function PomodoroList({ pomodoros }: Props) {
  const items = pomodoros.map((pomodoro) => <li key={pomodoro.id}>{JSON.stringify(pomodoro)}</li>);

  return <ul>{items}</ul>;
}
