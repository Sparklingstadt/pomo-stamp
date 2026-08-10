'use client'
import { Button } from "@/components/ui/button";
import { Pomodoro } from "@/lib/schemas/pomodoro/schema";
import Link from "next/link";
import { useState } from 'react';

export default function PomodoroTableDataRow({
  pomodoro,
  onChanged,
}: {
  pomodoro: Pomodoro;
  onChanged: () => Promise<unknown>;
}){
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePomodoro = async (id: number) => {
    setError(null);
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/pomodoro/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('削除に失敗しました');
      }
      await onChanged();
    } catch (error) {
      setError(error instanceof Error ? error.message : '削除に失敗しました');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <tr>
      <td className="px-4 py-2">{ pomodoro.id }</td>
      <td className="px-4 py-2">{ pomodoro.date.month }/{ pomodoro.date.day }</td>
      <td className="px-4 py-2">{ pomodoro.task }</td>
      <td className="px-4 py-2">{ pomodoro.memo }</td>
      <td className="px-4 py-2">
        <Button asChild className="bg-blue-500 text-white">
          <Link href={`/edit/${pomodoro.id}`}>編集</Link>
        </Button>
        <Button className="bg-red-500 text-white" disabled={isDeleting} onClick={() => handleDeletePomodoro(pomodoro.id)}>
          {isDeleting ? '削除中…' : '削除'}
        </Button>
        {error && <p role="alert" className="text-red-600">{error}</p>}
      </td>
    </tr>
  )
}
