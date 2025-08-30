'use client';
import { Pomodoro } from "@/lib/schemas/pomodoro/schema";
import PomodoroTableDataRow from "./PomodoroTableDataRow";


export default function PomodoroTable({ pomodoros }: { pomodoros: ReadonlyArray<Pomodoro> }) {
  return (
    <table>
      <thead>
        <tr>
          <td align="center">ID</td>
          <td align="center">日付</td>
          <td align="center">やったこと</td>
          <td align="center">ひとことメモ</td>
          <td align="center">操作</td>
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
