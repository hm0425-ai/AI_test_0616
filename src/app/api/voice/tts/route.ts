import { NextRequest, NextResponse } from "next/server";
import { getSetting } from "@/lib/settings";

export async function POST(req: NextRequest) {
  const { text, voiceId = "21m00Tcm4TlvDq8ikWAM" } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  const apiKey = await getSetting("ELEVENLABS_API_KEY");
  if (!apiKey) {
    return NextResponse.json(
      { error: "ElevenLabs API Key가 설정되지 않았습니다. 관리자 설정에서 등록해주세요." },
      { status: 503 }
    );
  }

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const audio = await res.arrayBuffer();
  return new NextResponse(audio, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}