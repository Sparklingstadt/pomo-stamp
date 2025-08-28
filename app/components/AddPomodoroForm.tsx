'use client'
import { useState } from "react"

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

    console.log(JSON.stringify(pomodoro))

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
      <section className="my-4">
        <label htmlFor="month" className="mr-2">月</label>
        <input className="border" type="text" id="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      </section>
      <section className="my-4">
        <label htmlFor="day" className="mr-2">日</label>
        <input className="border" type="text" id="day" value={day} onChange={(e) => setDay(e.target.value)} />
      </section>
      <section className="my-4">
        <label htmlFor="task" className="mr-2">やったこと</label>
        <input className="border" type="text" id="task" value={task} onChange={(e) => setTask(e.target.value)} />
      </section>
      <section className="my-4">
        <label htmlFor="memo" className="mr-2">ひとことメモ</label>
        <input className="border" type="text" id="memo" value={memo} onChange={(e) => setMemo(e.target.value)} />
      </section>
      <section className="my-4">
        <button className="bg-blue-200 p-4 px-8 hover:bg-blue-300" onClick={() => handleAddPomodoro()}>登録</button>
      </section>
    </div>
  )
}