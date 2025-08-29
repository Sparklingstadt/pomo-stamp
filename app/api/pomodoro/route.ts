import { pomodoroPostSchema } from '@/lib/schemas/pomodoro/schema';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const prisma = new PrismaClient()
  const pomodoros = await prisma.pomodoro.findMany()

  return NextResponse.json(pomodoros);
}

export async function POST(req: Request) {
  const payload = await req.json();

  if(pomodoroPostSchema.safeParse(payload).success === false) {
    return NextResponse.json(
      {
        message: 'Bad Request',
        status: 400,
      },
      { status: 400 }
    );
  }

  const prisma = new PrismaClient();
  const pomodoro = await prisma.pomodoro.create({
    data: {
      uuid: crypto.randomUUID(),
      task: payload.task,
      memo: payload.memo,
      month: parseInt(payload.date.month),
      day: parseInt(payload.date.day),
    }
  });

  return NextResponse.json(
    {
      "message": "Pomodoro created successfully",
    },
    { status: 200 }
  );
}
