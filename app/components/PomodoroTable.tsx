'use client';
import { Pomodoro } from "@/lib/schemas/pomodoro/schema";
import PomodoroTableDataRow from "./PomodoroTableDataRow";


export default function PomodoroTable({
  pomodoros,
  onChanged,
}: {
  pomodoros: ReadonlyArray<Pomodoro>;
  onChanged: () => Promise<unknown>;
}) {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col" className="text-center">ID</th>
          <th scope="col" className="text-center">日付</th>
          <th scope="col" className="text-center">やったこと</th>
          <th scope="col" className="text-center">ひとことメモ</th>
          <th scope="col" className="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        {pomodoros.map(pomodoro => (
          <PomodoroTableDataRow key={pomodoro.id} pomodoro={pomodoro} onChanged={onChanged} />
        ))}
      </tbody>
    </table>
  );
}
