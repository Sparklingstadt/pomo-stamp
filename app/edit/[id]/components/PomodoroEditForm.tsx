'use client'
import InputTextField from "@/app/components/InputTextField"
import { Button } from "@/components/ui/button"
import { PomodoroResponse } from "@/lib/schemas/pomodoro/schema"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from "react"

export default function PomodoroEditForm({ pomodoro } : { pomodoro: PomodoroResponse }) {
  const router = useRouter()
  const [task, setTask] = useState(pomodoro.task)
  const [memo, setMemo] = useState(pomodoro.memo)
  const [month, setMonth] = useState(pomodoro.month.toString())
  const [day, setDay] = useState(pomodoro.day.toString())
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdatePomodoro = async () => {
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/pomodoro/${pomodoro.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, memo, date: { month, day } })
      })

      if (!response.ok) {
        throw new Error('更新に失敗しました')
      }

      router.push('/')
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : '更新に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-4xl my-4">Edit pomodoro</h1>
      <section className="flex mb-2 justify-between">
        <label htmlFor="edit-task">やったこと</label>
        <InputTextField id="edit-task" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Task" />
      </section>
      <section className="flex mb-2 justify-between">
        <label htmlFor="edit-memo">メモ</label>
        <InputTextField id="edit-memo" value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="Memo" />
      </section>
      <section className="flex mb-2 justify-between">
        <label htmlFor="edit-month">月</label>
        <InputTextField id="edit-month" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" />
      </section>
      <section className="flex mb-2 justify-between">
        <label htmlFor="edit-day">日</label>
        <InputTextField id="edit-day" value={day} onChange={(e) => setDay(e.target.value)} placeholder="Day" />
      </section>
      <section className="flex justify-between mt-12">
        <Button asChild>
          <Link href="/" className="text-blue-500 hover:underline">
            キャンセル
          </Link>
        </Button>
        <Button className="bg-blue-500 text-white" disabled={isSubmitting} onClick={handleUpdatePomodoro}>
          {isSubmitting ? '更新中…' : '更新'}
        </Button>
      </section>
      {error && <p role="alert" className="text-red-600">{error}</p>}
    </div>
  )
}
