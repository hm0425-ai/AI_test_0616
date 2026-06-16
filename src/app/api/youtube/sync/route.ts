import { NextResponse } from "next/server";

/**
 * Information Collection Agent 트리거 엔드포인트.
 * 2단계에서 YouTube Data API + yt-dlp 기반 수집 로직으로 구현 예정.
 */
export async function POST() {
  return NextResponse.json(
    { message: "영상 수집 기능은 2단계에서 구현됩니다.", newVideos: 0 },
    { status: 200 }
  );
}
