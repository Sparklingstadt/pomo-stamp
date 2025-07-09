'use client'
import { useEffect, useState } from "react";
import z from "zod";

export default function Home() {
  const Pomodoro = z.object({
    task: z.string(),
    date: z.object({
      month: z.number().min(1).max(12),
      day: z.number().min(1).max(31)
    })
  })

  type Pomodoro = z.infer<typeof Pomodoro>

  // newPomodoroがPomodoro | undefinedになる
  // useStateは引数を与えないと<T | undefined> 
  // useState<string>("")にするとstring型
  const [pomodoro, setPomodoro] = useState<Pomodoro>()
  const [task, setTask] = useState<string>("")
  const [month, setMonth] = useState<number>(0)

  const handleSetTask = (task: string) => {
    setTask(task)
  }

  const handleSetMonth = (month: string) => {
    const parsedMonth = parseInt(month)
    if(!isNaN(parsedMonth)){
      setMonth(parsedMonth)
    }
  }

  const addPomodoro = () => {
    const newPomodoro = {
      task,
      date: {
        month,
        day: 1
      }
    }
    const result = Pomodoro.safeParse(newPomodoro)

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
          <button onClick={() => addPomodoro()}>登録</button>
        </section>
      </div>
    </div>
  );
}
