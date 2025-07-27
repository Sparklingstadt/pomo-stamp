'use client'

import { useEffect, useState } from "react"
import { pomodoroSchema, type Pomodoro } from "@/lib/schemas/pomodoro/schema"
import AddPomodoroForm  from "./components/AddPomodoroForm"
import PomodoroList from "./components/PomodoroList"
import useSWR from "swr"

export default function Pomodoro(){
  const [pomodoros, setPomodoros] = useState<Pomodoro[]>([])
  
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, isLoading, error } = useSWR('/api/pomodoro', fetcher)

  useEffect(() => {
    if(!data) return
    
    setPomodoros(data)
  }, [data])

  const handleAddPomodoro = ({task, month, day }: {
    task: string,
    month: number,
    day: number
  }) => {
    const pomodoro = { id: 7, uuid: crypto.randomUUID(), task, date: { month, day }}

    const result = pomodoroSchema.safeParse(pomodoro)
    if(result.error) {
      throw new Error('zod error')
    } else {
      setPomodoros([...pomodoros, pomodoro])
    }
  }

  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error</div>

  return (
    <div>
      <AddPomodoroForm onAddPomodoro={handleAddPomodoro} />
      <PomodoroList pomodoros={pomodoros} />
    </div>
  )
  
}