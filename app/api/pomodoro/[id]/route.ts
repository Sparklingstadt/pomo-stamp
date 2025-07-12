import { mockPomodoros } from "@/lib/schemas/pomodoro/mock";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params } : { params: { id: string }}){
    const id = parseInt(params.id)
    const pomodoro = mockPomodoros.find(item => item.id === id)

    return pomodoro
        ? NextResponse.json(pomodoro)
        : NextResponse.json({ error: `id ${params.id} not found` }, { status: 404 })
}