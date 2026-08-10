'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pomodoro } from '@/lib/schemas/pomodoro/schema';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import PomodoroTableDataRow from './PomodoroTableDataRow';

export default function PomodoroTable({
  pomodoros,
  isRefreshing,
}: {
  pomodoros: ReadonlyArray<Pomodoro>;
  isRefreshing: boolean;
}) {
  return (
    <Card className="overflow-hidden shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
        <div className="space-y-1.5">
          <CardTitle className="text-xl">これまでのスタンプ</CardTitle>
          <CardDescription>積み重ねた集中の記録です。</CardDescription>
        </div>
        <Badge variant="secondary" className="shrink-0 gap-1.5 rounded-full px-3 py-1">
          {isRefreshing ? (
            <LoaderCircle className="size-3.5 animate-spin" />
          ) : (
            <CheckCircle2 className="size-3.5 text-primary" />
          )}
          {pomodoros.length} stamps
        </Badge>
      </CardHeader>
      <CardContent className="px-0">
        {pomodoros.length === 0 ? (
          <div className="mx-6 mb-2 grid min-h-64 place-items-center rounded-xl border border-dashed bg-muted/30 px-6 text-center">
            <div className="space-y-2">
              <div className="mx-auto grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
                <CheckCircle2 className="size-6" />
              </div>
              <p className="font-medium">最初の集中を記録しましょう</p>
              <p className="text-sm text-muted-foreground">
                右のフォームから、今日できたことを追加できます。
              </p>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="pl-6">日付</TableHead>
                <TableHead>やったこと</TableHead>
                <TableHead className="hidden md:table-cell">ひとことメモ</TableHead>
                <TableHead className="pr-6 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pomodoros.map((pomodoro) => (
                <PomodoroTableDataRow key={pomodoro.id} pomodoro={pomodoro} />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
