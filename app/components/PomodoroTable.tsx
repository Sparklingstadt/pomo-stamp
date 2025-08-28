'use client'

import { Pomodoro } from "@/lib/schemas/pomodoro/schema"

export default function PomodoroTable({ pomodoros }: { pomodoros: ReadonlyArray<Pomodoro> }) {
  const handleDeletePomodoro = async (id: number) => {
    await fetch(`/api/pomodoro/${id}`, {
      method: 'DELETE',
    });
  }

  return (
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>日付</td>
          <td>やったこと</td>
          <td>ひとことメモ</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        { pomodoros.map((pomo) => (
          <tr key={pomo.id}>
            <td>{pomo.id}</td>
            <td>{pomo.date.month}/{pomo.date.day}</td>
            <td>{pomo.task}</td>
            <td>なし(デフォルト)</td>
            <td>
              <button className="bg-gray-300 hover:bg-gray-600 mx-2 p-2">編集</button>
              <button className="bg-gray-300 hover:bg-gray-600 mx-2 p-2" onClick={() => handleDeletePomodoro(pomo.id)}>削除</button>
            </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}