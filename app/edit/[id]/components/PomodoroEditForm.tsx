'use client'
import InputTextField from "@/app/components/InputTextField"
import { PomodoroResponse } from "@/lib/schemas/pomodoro/schema"
import Link from "next/link"
import { useState } from "react"

export default function PomodoroEditForm({ pomodoro } : { pomodoro: PomodoroResponse }) {
  const [task, setTask] = useState(pomodoro.task)
  const [memo, setMemo] = useState(pomodoro.memo)
  const [month, setMonth] = useState(pomodoro.month.toString())
  const [day, setDay] = useState(pomodoro.day.toString())

  return (
    <div className="w-8/12 mx-auto">
      <h1 className="text-4xl my-4">Edit pomodoro</h1>
      <section className="flex mb-2 justify-between">
        <label>やったこと</label>
        <InputTextField value={task} onChange={(e) => setTask(e.target.value)} placeholder="Task" />
      </section>
      <section className="flex mb-2 justify-between">
        <label>メモ</label>
        <InputTextField value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="Memo" />
      </section>
      <section className="flex mb-2 justify-between">
        <label>月</label>
        <InputTextField value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" />
      </section>
      <section className="flex mb-2 justify-between">
        <label>日</label>
        <InputTextField value={day} onChange={(e) => setDay(e.target.value)} placeholder="Day" />
      </section>
      <section>
        <Link href="/" className="text-blue-500 hover:underline">
          Cancel
        </Link>
      </section>
    </div>
  )
}