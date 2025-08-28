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
  
  return NextResponse.json(
    {
      payload,
    },
    { status: 200 }
  );
}
