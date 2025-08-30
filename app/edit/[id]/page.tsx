import { PrismaClient } from "@prisma/client"
import PomodoroEditForm from "@/app/edit/[id]/components/PomodoroEditForm"

export default async function Page({ params }: { params: { id: string}}){
  const id = (await params).id
  const pomodoroId = parseInt(id)

  if(typeof pomodoroId !== "number") {
    return <div>Invalid Pomodoro ID</div>
  }

  const prisma = new PrismaClient()
  const pomodoro = await prisma.pomodoro.findUnique({
    where: { id: pomodoroId}
  })

  if(pomodoro === null) {
    return <div>Pomodoro not found</div>
  }


  return (
    <>
      <PomodoroEditForm pomodoro={pomodoro} />
    </>
  )
}