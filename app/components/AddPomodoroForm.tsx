'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, LoaderCircle, Plus, Sparkles } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function AddPomodoroForm() {
  const queryClient = useQueryClient();
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [task, setTask] = useState('');
  const [memo, setMemo] = useState('');

  const createPomodoro = useMutation({
    mutationFn: async (pomodoro: {
      task: string;
      memo: string;
      date: { month: string; day: string };
    }) => {
      const response = await fetch('/api/pomodoro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pomodoro),
      });
      if (!response.ok) throw new Error('登録に失敗しました。入力内容を確認してください。');
    },
    onSuccess: async () => {
      setTask('');
      setMemo('');
      await queryClient.invalidateQueries({ queryKey: ['pomodoros'] });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createPomodoro.mutate({ task, memo, date: { month, day } });
  };

  return (
    <Card className="overflow-hidden border-primary/15 shadow-soft lg:sticky lg:top-8">
      <CardHeader className="bg-gradient-to-br from-primary/[0.08] via-transparent to-amber-400/[0.08]">
        <div className="mb-1 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Plus className="size-5" aria-hidden="true" />
        </div>
        <CardTitle className="text-xl">集中を記録する</CardTitle>
        <CardDescription>終えたタスクと、未来の自分への一言を残しましょう。</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="new-month">月</Label>
              <Input
                id="new-month"
                type="number"
                inputMode="numeric"
                min="1"
                max="12"
                placeholder="8"
                required
                value={month}
                onChange={(event) => setMonth(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-day">日</Label>
              <Input
                id="new-day"
                type="number"
                inputMode="numeric"
                min="1"
                max="31"
                placeholder="25"
                required
                value={day}
                onChange={(event) => setDay(event.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-task">やったこと</Label>
            <Input
              id="new-task"
              maxLength={200}
              placeholder="例：企画書を仕上げた"
              required
              value={task}
              onChange={(event) => setTask(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-memo">ひとことメモ</Label>
            <Textarea
              id="new-memo"
              maxLength={1000}
              rows={4}
              placeholder="集中できた理由や、次にやること…"
              value={memo}
              onChange={(event) => setMemo(event.target.value)}
            />
          </div>
          {createPomodoro.isError && (
            <Alert variant="destructive">
              <AlertCircle aria-hidden="true" />
              <AlertDescription>{createPomodoro.error.message}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            size="lg"
            className="w-full shadow-sm"
            disabled={createPomodoro.isPending}
          >
            {createPomodoro.isPending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {createPomodoro.isPending ? '記録しています…' : '今日の集中をスタンプ'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
