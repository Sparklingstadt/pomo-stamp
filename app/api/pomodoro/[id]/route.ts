import { mockPomodoros } from '@/lib/schemas/pomodoro/mock';
import { pomodoroSchema } from '@/lib/schemas/pomodoro/schema';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const pomodoro = mockPomodoros.find((item) => item.id === id);

  return pomodoro
    ? NextResponse.json(pomodoro)
    : NextResponse.json({ error: `id ${params.id} not found` }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const result = pomodoroSchema.safeParse(body);

  if (!result.success)
    return NextResponse.json({ error: `400 Bad request`, body }, { status: 400 });

  const id = parseInt(params.id);
  const pomodoro = mockPomodoros.find((item) => item.id === id);
  if (!pomodoro) return NextResponse.json({ error: `id ${params.id} not found` }, { status: 404 });

  return NextResponse.json({ message: '200 Successfully updated!', body }, { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const prisma = new PrismaClient()
  const id = parseInt((await params).id);
  const pomodoro = await prisma.pomodoro.findUnique({ where: { id } });
  if (!pomodoro) return NextResponse.json({ error: `id ${params.id} not found` }, { status: 404 });

  await prisma.pomodoro.delete({ where: { id } });
  return NextResponse.json({ message: '204 Successfully deleted' });
}
