'use client'
import { Pomodoro } from "@/lib/schemas/pomodoro/schema";
import Link from "next/link";

export default function PomodoroTableDataRow({ pomodoro }: { pomodoro: Pomodoro}){
  const handleDeletePomodoro = async (id: number) => {
    await fetch(`/api/pomodoro/${id}`, {
      method: 'DELETE'
    })
  }

  return (
    <tr>
      <td className="px-4 py-2">{ pomodoro.id }</td>
      <td className="px-4 py-2">{ pomodoro.date.month }/{ pomodoro.date.day }</td>
      <td className="px-4 py-2">{ pomodoro.task }</td>
      <td className="px-4 py-2">{ pomodoro.memo }</td>
      <td className="px-4 py-2">
        <Link className="inline-block px-4 py-1 text-sm bg-blue-500 text-white" href={`/edit/${pomodoro.id}`}>編集</Link>
        <button className="px-4 py-1 text-sm bg-blue-500 text-white" onClick={() => handleDeletePomodoro(pomodoro.id)}>削除</button>
      </td>
    </tr>
  )
}