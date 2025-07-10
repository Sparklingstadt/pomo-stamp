'use client'
import { useEffect, useState } from "react";
import { pomodoroSchema, type Pomodoro } from "@/lib/schemas/pomodoro/schema"

export default function Home() {

  // newPomodoroがPomodoro | undefinedになる
  // useStateは引数を与えないと<T | undefined> 
  // useState<string>("")にするとstring型
  const [pomodoro, setPomodoro] = useState<Pomodoro>()
  const [task, setTask] = useState<string>("")
  const [month, setMonth] = useState<number>(0)
  const [day, setDay] = useState<number>(0)

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
      task,
      date: {
        month,
        day
      }
    }
    const result = pomodoroSchema.safeParse(newPomodoro)

    if(!result.success){
      result.error
    } else {
      setPomodoro(result.data)
    }
  }

  useEffect(() => {
    console.log(pomodoro)
  }, [pomodoro])

  return (
    <div>
      <h1>Pomo stamp</h1>
      <div>
        <section>
          <label>頑張ったこと</label>
          <input type="text" value={task} onChange={(e => handleSetTask(e.target.value))} />
          <p>task: { task }</p>
        </section>
        <section>
          <label htmlFor="">月</label>
          <input type="text" value={month} onChange={e => handleSetMonth(e.target.value)}/>
          <p>month: { month }</p>
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
          <h2>Pomodoro</h2>
          <pre>{ JSON.stringify(pomodoro) }</pre>
        </section>
      </div>
    </div>
  );
}
