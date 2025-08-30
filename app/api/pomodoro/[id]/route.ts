import { mockPomodoros } from '@/lib/schemas/pomodoro/mock';
import { pomodoroPutSchema } from '@/lib/schemas/pomodoro/schema';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const pomodoro = mockPomodoros.find((item) => item.id === id);

  return pomodoro
    ? NextResponse.json(pomodoro)
    : NextResponse.json({ error: `id ${params.id} not found` }, { status: 404 });
}

export async function PUT(req: Request) {
  const payload = await req.json();
  const result = pomodoroPutSchema.safeParse(payload);

  const prisma = new PrismaClient()

  if (!result.success) {
    console.log(result.error);
    return NextResponse.json({ error: `400 Bad request`, payload }, { status: 400 });
  }

  const id = parseInt(payload.id);
  const pomodoro = await prisma.pomodoro.findUnique({ where: { id } });
  if (!pomodoro) return NextResponse.json({ error: `id ${id} not found` }, { status: 404 });

  await prisma.pomodoro.update({
    where: { id },
    data: {
      task: payload.task,
      memo: payload.memo,
      month: parseInt(payload.date.month),
      day: parseInt(payload.date.day),
    },
  });

  return NextResponse.json({ message: '200 Successfully updated' });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const prisma = new PrismaClient()
  const id = parseInt((await params).id);
  const pomodoro = await prisma.pomodoro.findUnique({ where: { id } });
  if (!pomodoro) return NextResponse.json({ error: `id ${params.id} not found` }, { status: 404 });

  await prisma.pomodoro.delete({ where: { id } });
  return NextResponse.json({ message: '204 Successfully deleted' });
}
