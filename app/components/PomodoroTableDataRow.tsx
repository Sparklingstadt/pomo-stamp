'use client'
import { Button } from "@/components/ui/button";
import { Pomodoro } from "@/lib/schemas/pomodoro/schema";
import Link from "next/link";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function PomodoroTableDataRow({
  pomodoro,
}: {
  pomodoro: Pomodoro;
}){
  const queryClient = useQueryClient();
  const deletePomodoro = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/pomodoro/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('削除に失敗しました');
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pomodoros'] }),
  });

  const handleDeletePomodoro = async (id: number) => {
    deletePomodoro.mutate(id);
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
        <Button className="bg-red-500 text-white" disabled={deletePomodoro.isPending} onClick={() => handleDeletePomodoro(pomodoro.id)}>
          {deletePomodoro.isPending ? '削除中…' : '削除'}
        </Button>
        {deletePomodoro.isError && <p role="alert" className="text-red-600">{deletePomodoro.error.message}</p>}
      </td>
    </tr>
  )
}
