'use client';

import { useEffect, useState } from 'react';
import { type Pomodoro } from '@/lib/schemas/pomodoro/schema';
import useSWR from 'swr';
import PomodoroTable from './components/PomodoroTable';

export default function Pomodoro() {
  const [pomodoros, setPomodoros] = useState<Pomodoro[]>([]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error } = useSWR('/api/pomodoro', fetcher);

  useEffect(() => {
    if (!data) return;

    setPomodoros(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <PomodoroTable pomodoros={pomodoros} />
    </div>
  );
}
