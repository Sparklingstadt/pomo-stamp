'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PomodoroResponse } from '@/lib/schemas/pomodoro/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, ArrowLeft, LoaderCircle, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function PomodoroEditForm({ pomodoro }: { pomodoro: PomodoroResponse }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [task, setTask] = useState(pomodoro.task);
  const [memo, setMemo] = useState(pomodoro.memo);
  const [month, setMonth] = useState(String(pomodoro.month));
  const [day, setDay] = useState(String(pomodoro.day));

  const updatePomodoro = useMutation({
    mutationFn: async (payload: {
      task: string;
      memo: string;
      date: { month: string; day: string };
    }) => {
      const response = await fetch(`/api/pomodoro/${pomodoro.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('更新に失敗しました。入力内容を確認してください。');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pomodoros'] });
      router.push('/');
      router.refresh();
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updatePomodoro.mutate({ task, memo, date: { month, day } });
  };

  return (
    <Card className="border-primary/15 shadow-soft">
      <CardHeader>
        <CardTitle>Stamp #{pomodoro.id}</CardTitle>
        <CardDescription>
          {pomodoro.month}/{pomodoro.day} の集中記録
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="edit-task">やったこと</Label>
            <Input
              id="edit-task"
              required
              maxLength={200}
              value={task}
              onChange={(event) => setTask(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-memo">ひとことメモ</Label>
            <Textarea
              id="edit-memo"
              rows={5}
              maxLength={1000}
              value={memo}
              onChange={(event) => setMemo(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-month">月</Label>
              <Input
                id="edit-month"
                type="number"
                min="1"
                max="12"
                required
                value={month}
                onChange={(event) => setMonth(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-day">日</Label>
              <Input
                id="edit-day"
                type="number"
                min="1"
                max="31"
                required
                value={day}
                onChange={(event) => setDay(event.target.value)}
              />
            </div>
          </div>
          {updatePomodoro.isError && (
            <Alert variant="destructive">
              <AlertCircle aria-hidden="true" />
              <AlertDescription>{updatePomodoro.error.message}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="size-4" />
                キャンセル
              </Link>
            </Button>
            <Button type="submit" disabled={updatePomodoro.isPending}>
              {updatePomodoro.isPending ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {updatePomodoro.isPending ? '保存しています…' : '変更を保存'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
