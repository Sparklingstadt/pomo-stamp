'use client';

import { useEffect, useState } from 'react';
import { type Pomodoro, type PomodoroResponse } from '@/lib/schemas/pomodoro/schema';
import useSWR from 'swr';
import PomodoroTable from './components/PomodoroTable';
import AddPomodoroForm from './components/AddPomodoroForm';

export default function Pomodoro() {
  const [pomodoros, setPomodoros] = useState<Pomodoro[]>([]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error } = useSWR<PomodoroResponse[]>('/api/pomodoro', fetcher);

  useEffect(() => {
    if (!data) return;

    const pomodoros = data.map(pomodoro => ({
      id: pomodoro.id,
      task: pomodoro.task,
      uuid: pomodoro.uuid,
      memo: pomodoro.memo,
      date: {
        month: pomodoro.month,
        day: pomodoro.day
      }
    }))
    setPomodoros(pomodoros);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <PomodoroTable pomodoros={pomodoros} />
      <AddPomodoroForm />
    </div>
  );
}
