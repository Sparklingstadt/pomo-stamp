'use client';

import { type Pomodoro, type PomodoroResponse } from '@/lib/schemas/pomodoro/schema';
import { useQuery } from '@tanstack/react-query';
import PomodoroTable from './components/PomodoroTable';
import AddPomodoroForm from './components/AddPomodoroForm';

export default function Pomodoro() {
  const { data, isPending, isError, refetch } = useQuery<PomodoroResponse[]>({
    queryKey: ['pomodoros'],
    queryFn: async () => {
      const response = await fetch('/api/pomodoro');
      if (!response.ok) {
        throw new Error('ポモドーロ一覧の取得に失敗しました');
      }
      return response.json();
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) {
    return (
      <div role="alert">
        <p>ポモドーロ一覧の取得に失敗しました。</p>
        <button type="button" onClick={() => refetch()}>再試行</button>
      </div>
    );
  }

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
      <PomodoroTable pomodoros={pomodoros} />
      <AddPomodoroForm />
    </div>
  );
}
