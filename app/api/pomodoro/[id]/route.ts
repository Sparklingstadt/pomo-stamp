import { pomodoroPutSchema } from '@/lib/schemas/pomodoro/schema';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

async function getId(params: RouteContext['params']) {
  const id = Number((await params).id);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const id = await getId(params);
  if (id === null) {
    return NextResponse.json({ error: 'Invalid pomodoro ID' }, { status: 400 });
  }

  const prisma = new PrismaClient();
  try {
    const pomodoro = await prisma.pomodoro.findUnique({ where: { id } });
    return pomodoro
      ? NextResponse.json(pomodoro)
      : NextResponse.json({ error: `Pomodoro ${id} not found` }, { status: 404 });
  } catch (error) {
    console.error(`Failed to get pomodoro ${id}`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: Request, { params }: RouteContext) {
  const id = await getId(params);
  if (id === null) {
    return NextResponse.json({ error: 'Invalid pomodoro ID' }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const result = pomodoroPutSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid request body', issues: result.error.issues },
      { status: 400 },
    );
  }

  const prisma = new PrismaClient();
  try {
    const existing = await prisma.pomodoro.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: `Pomodoro ${id} not found` }, { status: 404 });
    }

    const pomodoro = await prisma.pomodoro.update({
      where: { id },
      data: {
        task: result.data.task,
        memo: result.data.memo,
        month: result.data.date.month,
        day: result.data.date.day,
      },
    });
    return NextResponse.json(pomodoro);
  } catch (error) {
    console.error(`Failed to update pomodoro ${id}`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const id = await getId(params);
  if (id === null) {
    return NextResponse.json({ error: 'Invalid pomodoro ID' }, { status: 400 });
  }

  const prisma = new PrismaClient();
  try {
    const existing = await prisma.pomodoro.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: `Pomodoro ${id} not found` }, { status: 404 });
    }

    await prisma.pomodoro.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(`Failed to delete pomodoro ${id}`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
