'use client'
import { Pomodoro } from "@/lib/schemas/pomodoro/schema";
import { useState } from "react";

export default function PomodoroTableDataRow({ pomodoro }: { pomodoro: Pomodoro}){
  const [isEditMode, setIsEditMode] = useState(false)

  const handleToggleEditMode = () => setIsEditMode(!isEditMode)

  const handleDeletePomodoro = async (id: number) => {
    await fetch(`/api/pomodoro/${id}`, {
      method: 'DELETE'
    })
  }

  return (
    <tr>
      <td>{ pomodoro.id }</td>
      <td>{ pomodoro.task }</td>
      <td>{ pomodoro.memo }</td>
      <td>
        <button onClick={() => handleToggleEditMode()}>編集</button>
        <button onClick={() => handleDeletePomodoro(pomodoro.id)}>削除</button>
      </td>
    </tr>
  )
}