import { NextRequest, NextResponse } from "next/server";
import { getAllSettingStatus, setSetting, type SettingKey } from "@/lib/settings";

export async function GET() {
  try {
    const status = await getAllSettingStatus();
    return NextResponse.json(status);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "설정을 불러오지 못했습니다." }, { status: 500 });
  }
}

const ALLOWED_KEYS: SettingKey[] = ["OPENAI_API_KEY", "ELEVENLABS_API_KEY", "YOUTUBE_API_KEY"];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const key = body?.key as SettingKey;
  const value = body?.value as string;

  if (!ALLOWED_KEYS.includes(key) || typeof value !== "string") {
    return NextResponse.json({ error: "invalid key/value" }, { status: 400 });
  }

  try {
    await setSetting(key, value);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "설정을 저장하지 못했습니다." }, { status: 500 });
  }
}
