import { NextResponse } from "next/server";

export async function GET(req: Request, { params } : { params: Promise<string>}){
    return NextResponse.json({
        status: 200,
        message: "200 OK",
        params
    })
}
