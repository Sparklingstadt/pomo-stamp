'use client';
import { Pomodoro } from "@/lib/schemas/pomodoro/schema";
import PomodoroTableDataRow from "./PomodoroTableDataRow";


export default function PomodoroTable({ pomodoros }: { pomodoros: ReadonlyArray<Pomodoro> }) {
  return (
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>日付</td>
          <td>やったこと</td>
          <td>ひとことメモ</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        {pomodoros.map(pomodoro => (
          <PomodoroTableDataRow key={pomodoro.id} pomodoro={pomodoro} />
        ))}
      </tbody>
    </table>
  );
}
