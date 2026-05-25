import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data?.name || !data?.email || !data?.message) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }
    console.log("[contact]", {
      name: String(data.name).slice(0, 120),
      email: String(data.email).slice(0, 120),
      message: String(data.message).slice(0, 2000),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
