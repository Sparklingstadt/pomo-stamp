'use client';

import { type Pomodoro, type PomodoroResponse } from '@/lib/schemas/pomodoro/schema';
import useSWR from 'swr';
import PomodoroTable from './components/PomodoroTable';
import AddPomodoroForm from './components/AddPomodoroForm';

export default function Pomodoro() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error, mutate } = useSWR<PomodoroResponse[]>('/api/pomodoro', fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const pomodoros: Pomodoro[] = (data ?? []).map((pomodoro) => ({
    id: pomodoro.id,
    task: pomodoro.task,
    uuid: pomodoro.uuid,
    memo: pomodoro.memo,
    date: {
      month: pomodoro.month,
      day: pomodoro.day,
    },
  }));

  return (
    <div>
      <PomodoroTable pomodoros={pomodoros} onChanged={() => mutate()} />
      <AddPomodoroForm onCreated={() => mutate()} />
    </div>
  );
}
