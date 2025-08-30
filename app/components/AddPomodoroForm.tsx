'use client'
import { useState } from "react"
import InputTextField from "./InputTextField"
import Button from "./Button"

export default function AddPomodoroForm() {
  const [month, setMonth] = useState('8')
  const [day, setDay] = useState('25')
  const [task, setTask] = useState('Kotlin')
  const [memo, setMemo] = useState('with Jetpack Compose')

  const handleAddPomodoro = async () => {
    const pomodoro = {
      task,
      memo,
      date: {
        month,
        day,
      }
    }

    await fetch('/api/pomodoro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pomodoro)
    }).then(res => res.json()).then(data => {
      console.log(data);
    })
  }

  return (
    <div>
      <section className="flex justify-between mb-2">
        <span className="mr-2">月</span>
        <InputTextField value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" />
      </section>
      <section className="flex justify-between mb-2">
        <span className="mr-2">日</span>
        <InputTextField value={day} onChange={(e) => setDay(e.target.value)} placeholder="Day" />
      </section>
      <section className="flex justify-between mb-2">
        <span className="mr-2">やったこと</span>
        <InputTextField value={task} onChange={(e) => setTask(e.target.value)} placeholder="Task" />
      </section>
      <section className="flex justify-between mb-2">
        <span className="mr-2">ひとことメモ</span>
        <InputTextField value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="Memo" />
      </section>
      <section className="my-4">
        <Button onClick={() => handleAddPomodoro()}>登録</Button>
      </section>
    </div>
  )
}