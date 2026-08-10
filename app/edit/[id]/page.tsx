import { prisma } from '@/lib/prisma';
import PomodoroEditForm from "@/app/edit/[id]/components/PomodoroEditForm"

export default async function Page({ params }: { params: Promise<{ id: string }> }){
  const id = (await params).id
  const pomodoroId = Number(id)

  if(!Number.isSafeInteger(pomodoroId) || pomodoroId <= 0) {
    return <div>Invalid Pomodoro ID</div>
  }

  const pomodoro = await prisma.pomodoro.findUnique({
    where: { id: pomodoroId}
  })

  if(pomodoro === null) {
    return <div>Pomodoro not found</div>
  }


  return (
    <div className="w-8/12 mx-auto">
      <PomodoroEditForm pomodoro={pomodoro} />
    </div>
  )
}
