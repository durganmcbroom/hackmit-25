// app/api/login/route.ts
import { NextResponse } from "next/server";
import {login} from "@/app/api/auth";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const success = await login(username, password);
    if (!success) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }

    // Set cookies in the response
    const res = NextResponse.json({ ok: true });
    res.cookies.set("auth-token", success, { httpOnly: true, path: "/" });
    res.cookies.set("auth-user", username, { path: "/" });

    return res;
}