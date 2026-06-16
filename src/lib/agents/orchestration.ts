import { getOpenAIClient } from "@/lib/openai/client";
import { searchRelevantChunks, type RagChunk } from "@/lib/rag/search";
import { youtubeTimestampUrl } from "@/lib/utils";

export type AgentAnswer = {
  answer: string;
  sources: { title: string; url: string; timestampLabel: string }[];
};

const SYSTEM_PROMPT = `당신은 "보듬TV 펫AI"의 반려견 훈련 상담 에이전트입니다.
보듬TV 유튜브 채널 영상에서 검색된 내용(context)에만 근거하여 따뜻하고 신뢰감 있는 어투로 답변하세요.
context에 없는 내용은 추측하지 말고, 모른다고 솔직히 답하세요.`;

/**
 * Orchestration Agent
 * 1) 질문 분석 2) RAG 검색 3) 답변 생성 4) 출처 정리
 */
export async function runOrchestrationAgent(question: string): Promise<AgentAnswer> {
  const chunks = await searchRelevantChunks(question);
  const context = chunks.map((c, i) => `[${i + 1}] ${c.content}`).join("\n");

  const answer = await generateAnswer(question, context, chunks);
  const sources = chunks.map((c) => ({
    title: c.source.videoTitle,
    url: youtubeTimestampUrl(c.source.url, c.source.timestampSec),
    timestampLabel: formatLabel(c.source.timestampSec),
  }));

  return { answer, sources };
}

function formatLabel(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

async function generateAnswer(question: string, context: string, chunks: RagChunk[]) {
  const client = await getOpenAIClient();

  if (!client) {
    // OpenAI 키가 아직 설정되지 않은 경우의 mock 답변
    return `[Mock 응답 - OpenAI API Key를 설정 화면에서 등록하면 실제 답변으로 전환됩니다]\n\n${chunks
      .map((c) => c.content)
      .join(" ")}`;
  }

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `질문: ${question}\n\n참고 context:\n${context}\n\n위 context를 근거로 답변해주세요.`,
      },
    ],
    temperature: 0.4,
  });

  return completion.choices[0]?.message?.content ?? "답변을 생성하지 못했습니다.";
}
