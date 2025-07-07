'use client'
import { useEffect, useState } from "react";

export default function Home() {
  type Pomodoro = {
    task: string,
    date: {
      month: number | undefined
      day: number | undefined
    }
  }

  // newPomodoroがPomodoro | undefinedになる
  // useStateは引数を与えないと<T | undefined> 
  // useState<string>("")にするとstring型
  const [newPomodoro, setNewPomodoro] = useState<Pomodoro>()
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
    if(task && month !== undefined){
      const pomodoro = {
        task,
        date: {
          month,
          day: undefined
        }
      }

      setNewPomodoro(pomodoro)
    }
  }

  useEffect(() => {
    console.log(newPomodoro)
  }, [newPomodoro])

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
