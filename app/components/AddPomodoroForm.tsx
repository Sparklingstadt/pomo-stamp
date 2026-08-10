'use client'
import { useState } from "react"
import InputTextField from "./InputTextField"
import { Button } from "@/components/ui/button";
export default function AddPomodoroForm({ onCreated }: { onCreated: () => Promise<unknown> }) {
  const [month, setMonth] = useState('8')
  const [day, setDay] = useState('25')
  const [task, setTask] = useState('Kotlin')
  const [memo, setMemo] = useState('with Jetpack Compose')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddPomodoro = async () => {
    const pomodoro = {
      task,
      memo,
      date: {
        month,
        day,
      }
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/pomodoro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pomodoro)
      })

      if (!response.ok) {
        throw new Error('登録に失敗しました')
      }

      await onCreated()
    } catch (error) {
      setError(error instanceof Error ? error.message : '登録に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
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
        <Button className="bg-blue-500 text-white" variant="outline" disabled={isSubmitting} onClick={handleAddPomodoro}>
          {isSubmitting ? '登録中…' : '登録'}
        </Button>
      </section>
      {error && <p role="alert" className="text-red-600">{error}</p>}
    </div>
  )
}
