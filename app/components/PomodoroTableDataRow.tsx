'use client';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Pomodoro } from '@/lib/schemas/pomodoro/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CalendarDays, LoaderCircle, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function PomodoroTableDataRow({ pomodoro }: { pomodoro: Pomodoro }) {
  const queryClient = useQueryClient();
  const deletePomodoro = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/pomodoro/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('削除に失敗しました');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pomodoros'] }),
  });

  return (
    <TableRow>
      <TableCell className="pl-6 font-medium">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          {pomodoro.date.month}/{pomodoro.date.day}
        </span>
      </TableCell>
      <TableCell className="max-w-48 whitespace-normal font-medium">{pomodoro.task}</TableCell>
      <TableCell className="hidden max-w-56 whitespace-normal text-muted-foreground md:table-cell">
        {pomodoro.memo || '—'}
      </TableCell>
      <TableCell className="pr-6">
        <div className="flex justify-end gap-1">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/edit/${pomodoro.id}`}>
              <Pencil className="size-4" />
              編集
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            disabled={deletePomodoro.isPending}
            onClick={() => deletePomodoro.mutate(pomodoro.id)}
          >
            {deletePomodoro.isPending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
            <span className="sr-only sm:not-sr-only">削除</span>
          </Button>
        </div>
        {deletePomodoro.isError && (
          <p role="alert" className="mt-1 text-right text-xs text-destructive">
            {deletePomodoro.error.message}
          </p>
        )}
      </TableCell>
    </TableRow>
  );
}
