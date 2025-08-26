import { mockPomodoros } from '@/lib/schemas/pomodoro/mock';
import { pomodoroPostSchema } from '@/lib/schemas/pomodoro/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(mockPomodoros);
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
