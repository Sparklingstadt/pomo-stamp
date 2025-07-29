'use client';
import { useState } from 'react';

type Props = {
  onAddPomodoro: (pomodoro: { task: string; month: number; day: number }) => void;
};

export default function AddPomodoroForm({ onAddPomodoro }: Props) {
  // useStateは引数を与えないと<T | undefined>
  // useState<string>("")にするとstring型
  const [task, setTask] = useState<string>('');
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);

  const handleSetTask = (task: string) => {
    setTask(task);
  };

  const handleSetMonth = (month: string) => {
    const parsedMonth = parseInt(month);
    if (!isNaN(parsedMonth)) {
      setMonth(parsedMonth);
    }
  };

  const handleSetDay = (day: string) => {
    const parsedDay = parseInt(day);
    if (!isNaN(parsedDay)) {
      setDay(parsedDay);
    }
  };

  return (
    <div>
      <section>
        <label>頑張ったこと</label>
        <input type="text" value={task} onChange={(e) => handleSetTask(e.target.value)} />
      </section>
      <section>
        <label htmlFor="">月</label>
        <input type="text" value={month} onChange={(e) => handleSetMonth(e.target.value)} />
      </section>
      <section>
        <label htmlFor="">
          日
          <input type="text" value={day} onChange={(e) => handleSetDay(e.target.value)} />
        </label>
      </section>
      <section>
        <button onClick={() => onAddPomodoro({ task, month, day })}>登録</button>
      </section>
    </div>
  );
}
