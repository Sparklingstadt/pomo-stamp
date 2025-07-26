'use client'
import { useEffect, useState } from "react";
import { pomodoroSchema, type Pomodoro } from "@/lib/schemas/pomodoro/schema"
import useSWR from "swr";

export default function Home() {

  // useStateは引数を与えないと<T | undefined> 
  // useState<string>("")にするとstring型
  const [pomodoros, setPomodoros] = useState<Pomodoro[]>([])
  const [task, setTask] = useState<string>("")
  const [month, setMonth] = useState<number>(0)
  const [day, setDay] = useState<number>(0)

  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR('/api/pomodoro', fetcher)

  const handleSetTask = (task: string) => {
    setTask(task)
  }

  const handleSetMonth = (month: string) => {
    const parsedMonth = parseInt(month)
    if(!isNaN(parsedMonth)){
      setMonth(parsedMonth)
    }
  }

  const handleSetDay = (day: string) => {
    const parsedDay = parseInt(day)
    if(!isNaN(parsedDay)){
      setDay(parsedDay)
    }
  }

  const addPomodoro = () => {
    const newPomodoro = {
      id: 7,
      uuid: crypto.randomUUID(),
      task,
      date: {
        month,
        day
      }
    }
    const result = pomodoroSchema.safeParse(newPomodoro)

    if(!result.success){
      console.log(result.error)
    } else {
      setPomodoros([...pomodoros, result.data])
    }
  }

  useEffect(() => {
    if(data) setPomodoros(data)
  }, [data])

  return (
    <div>
      <h1>Pomo stamp</h1>
      <div>
        <section>
          <label>頑張ったこと</label>
          <input type="text" value={task} onChange={(e => handleSetTask(e.target.value))} />
        </section>
        <section>
          <label htmlFor="">月</label>
          <input type="text" value={month} onChange={e => handleSetMonth(e.target.value)}/>
        </section>
        <section>
          <label htmlFor="">日
            <input type="text" value={day} onChange={e => handleSetDay(e.target.value)} />
          </label>
        </section>
        <section>
          <button onClick={() => addPomodoro()}>登録</button>
        </section>
        <section>
          <h2>Pomodoros</h2>
          <ul>
            { pomodoros.map(pomodoro => (
              <li key={pomodoro.id}>{ JSON.stringify(pomodoro)}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
