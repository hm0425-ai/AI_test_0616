import { NextRequest, NextResponse } from "next/server";
import { getSetting } from "@/lib/settings";

export async function POST(req: NextRequest) {
  const apiKey = await getSetting("OPENAI_API_KEY");
  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenAI API Key가 설정되지 않았습니다." },
      { status: 503 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const whisperForm = new FormData();
  whisperForm.append("file", file);
  whisperForm.append("model", "whisper-1");
  whisperForm.append("language", "ko");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: whisperForm,
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({ transcript: data.text });
}