'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { type Pomodoro, type PomodoroResponse } from '@/lib/schemas/pomodoro/schema';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, RefreshCw } from 'lucide-react';
import AddPomodoroForm from './components/AddPomodoroForm';
import PomodoroTable from './components/PomodoroTable';

function DashboardSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-40" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function PomodoroDashboard() {
  const { data, isPending, isError, refetch, isFetching } = useQuery<PomodoroResponse[]>({
    queryKey: ['pomodoros'],
    queryFn: async () => {
      const response = await fetch('/api/pomodoro');
      if (!response.ok) throw new Error('ポモドーロ一覧の取得に失敗しました');
      return response.json();
    },
  });

  if (isPending) return <DashboardSkeleton />;

  if (isError) {
    return (
      <Alert variant="destructive" className="mx-auto max-w-2xl bg-card">
        <AlertCircle aria-hidden="true" />
        <AlertTitle>記録を読み込めませんでした</AlertTitle>
        <AlertDescription className="mt-2">
          <p>少し時間を置いて、もう一度お試しください。</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => refetch()}>
            <RefreshCw className="size-4" />
            再試行
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const pomodoros: Pomodoro[] = (data ?? []).map((pomodoro) => ({
    id: pomodoro.id,
    task: pomodoro.task,
    uuid: pomodoro.uuid,
    memo: pomodoro.memo,
    date: { month: pomodoro.month, day: pomodoro.day },
  }));

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
      <PomodoroTable pomodoros={pomodoros} isRefreshing={isFetching} />
      <AddPomodoroForm />
    </div>
  );
}
