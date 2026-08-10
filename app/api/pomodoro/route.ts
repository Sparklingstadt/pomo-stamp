import { pomodoroPostSchema } from '@/lib/schemas/pomodoro/schema';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const pomodoros = await prisma.pomodoro.findMany();
    return NextResponse.json(pomodoros);
  } catch (error) {
    console.error('Failed to list pomodoros', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const result = pomodoroPostSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid request body', issues: result.error.issues },
      { status: 400 },
    );
  }

  const prisma = new PrismaClient();

  try {
    const pomodoro = await prisma.pomodoro.create({
      data: {
        uuid: crypto.randomUUID(),
        task: result.data.task,
        memo: result.data.memo,
        month: result.data.date.month,
        day: result.data.date.day,
      },
    });

    return NextResponse.json(pomodoro, { status: 201 });
  } catch (error) {
    console.error('Failed to create pomodoro', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
