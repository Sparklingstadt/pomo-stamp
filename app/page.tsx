import { Badge } from '@/components/ui/badge';
import { TimerReset } from 'lucide-react';
import Pomodoro from './Pomodoro';

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            >
              <span className="size-1.5 rounded-full bg-primary" />
              Daily focus log
            </Badge>
            <div className="space-y-2">
              <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
                  <TimerReset className="size-6" aria-hidden="true" />
                </span>
                Pomo Stamp
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                今日の集中をひとつずつ記録して、小さな達成を積み重ねよう。
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Focus. Finish. Stamp.</p>
        </header>
        <Pomodoro />
      </div>
    </main>
  );
}
