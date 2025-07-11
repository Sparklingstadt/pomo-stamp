import { mockPomodoros } from "@/lib/schemas/pomodoro/mock";
import { pomodoroSchema } from "@/lib/schemas/pomodoro/schema";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json([
        mockPomodoros
    ])
}

export async function POST(req: Request) {
    const payload = await req.json()
    const result = pomodoroSchema.safeParse(payload)

    if(!result.success) {
        return NextResponse.json({
            message: "invalid data format",
            payload,
            status: 400
        }, { status: 400 })
    }

    return NextResponse.json({
        payload,
        status: 200
    }, { status: 200 })
}