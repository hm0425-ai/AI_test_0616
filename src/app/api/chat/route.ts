import { NextRequest, NextResponse } from "next/server";
import { runOrchestrationAgent } from "@/lib/agents/orchestration";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const question = body?.question?.trim();

  if (!question) {
    return NextResponse.json({ error: "question is required" }, { status: 400 });
  }

  try {
    const result = await runOrchestrationAgent(question);
    return NextResponse.json(result);
  } catch (err) {
    console.error("orchestration agent error", err);
    return NextResponse.json(
      { error: "답변 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
