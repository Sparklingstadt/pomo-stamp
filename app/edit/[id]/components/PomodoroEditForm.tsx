'use client'
import Button from "@/app/components/Button"
import InputTextField from "@/app/components/InputTextField"
import { PomodoroResponse } from "@/lib/schemas/pomodoro/schema"
import Link from "next/link"
import { useState } from "react"

export default function PomodoroEditForm({ pomodoro } : { pomodoro: PomodoroResponse }) {
  const [task, setTask] = useState(pomodoro.task)
  const [memo, setMemo] = useState(pomodoro.memo)
  const [month, setMonth] = useState(pomodoro.month.toString())
  const [day, setDay] = useState(pomodoro.day.toString())

  const handleUpdatePomodoro = async () => {
    await fetch(`/api/pomodoro/${pomodoro.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: pomodoro.id.toString(),
        uuid: pomodoro.uuid,
        task,
        memo,
        date: {
          month,
          day
        }
      })
    })
  }

  return (
    <div>
      <h1 className="text-4xl my-4">Edit pomodoro</h1>
      <section className="flex mb-2 justify-between">
        <span>やったこと</span>
        <InputTextField value={task} onChange={(e) => setTask(e.target.value)} placeholder="Task" />
      </section>
      <section className="flex mb-2 justify-between">
        <span>メモ</span>
        <InputTextField value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="Memo" />
      </section>
      <section className="flex mb-2 justify-between">
        <span>月</span>
        <InputTextField value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" />
      </section>
      <section className="flex mb-2 justify-between">
        <span>日</span>
        <InputTextField value={day} onChange={(e) => setDay(e.target.value)} placeholder="Day" />
      </section>
      <section className="flex justify-between mt-12">
        <Link href="/" className="text-blue-500 hover:underline">
          キャンセル
        </Link>
        <Button onClick={() => handleUpdatePomodoro()}>更新</Button>
      </section>
    </div>
  )
}