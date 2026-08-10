import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { PencilLine } from 'lucide-react';
import { notFound } from 'next/navigation';
import PomodoroEditForm from './components/PomodoroEditForm';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const pomodoroId = Number((await params).id);
  if (!Number.isSafeInteger(pomodoroId) || pomodoroId <= 0) notFound();

  const pomodoro = await prisma.pomodoro.findUnique({ where: { id: pomodoroId } });
  if (!pomodoro) notFound();

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-2xl space-y-8">
        <header className="space-y-3">
          <Badge variant="secondary" className="gap-1.5 rounded-full">
            <PencilLine className="size-3.5" />
            Edit stamp
          </Badge>
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">記録を編集する</h1>
            <p className="mt-2 text-muted-foreground">
              できたことやメモを、今の言葉に整えましょう。
            </p>
          </div>
        </header>
        <PomodoroEditForm pomodoro={pomodoro} />
      </div>
    </main>
  );
}
