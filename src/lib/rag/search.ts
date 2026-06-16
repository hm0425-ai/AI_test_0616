import { mockVideos } from "@/lib/mock-data";

export type RagSource = {
  videoTitle: string;
  url: string;
  timestampSec: number;
};

export type RagChunk = {
  content: string;
  source: RagSource;
};

/**
 * MVP 단계의 RAG 검색.
 * - DB(pgvector)에 임베딩이 적재되기 전까지는 키워드 매칭 mock으로 동작한다.
 * - 추후 OPENAI embedding + pgvector cosine similarity 검색으로 교체.
 */
export async function searchRelevantChunks(query: string): Promise<RagChunk[]> {
  const lower = query.toLowerCase();

  const keywordMap: { keywords: string[]; videoIndex: number; snippet: string; sec: number }[] = [
    {
      keywords: ["분리불안", "혼자", "외출"],
      videoIndex: 0,
      snippet:
        "분리불안은 보호자가 나가는 상황 자체에 대한 강아지의 불안 반응입니다. 짧은 외출부터 점진적으로 늘려가며 둔감화 훈련을 진행하세요.",
      sec: 95,
    },
    {
      keywords: ["짖", "초인종", "소음"],
      videoIndex: 1,
      snippet:
        "초인종 소리에 짖는 행동은 영역 방어 본능에서 시작됩니다. 소리에 대한 긍정적 연관학습(소리 후 보상)을 반복해 반응을 줄여나갈 수 있습니다.",
      sec: 142,
    },
    {
      keywords: ["배변", "패드", "화장실"],
      videoIndex: 2,
      snippet:
        "배변훈련은 일정한 시간과 장소를 반복적으로 노출시키는 것이 핵심입니다. 성공 시 즉시 보상하고, 실패해도 혼내지 않아야 합니다.",
      sec: 210,
    },
    {
      keywords: ["산책", "리드줄", "당김"],
      videoIndex: 3,
      snippet:
        "리드줄을 당기는 행동은 보호자보다 앞서가려는 습관에서 비롯됩니다. 멈춰서기 - 보상 - 다시 걷기를 반복하는 루즈리드 훈련이 효과적입니다.",
      sec: 58,
    },
  ];

  const matched = keywordMap.filter((entry) =>
    entry.keywords.some((kw) => lower.includes(kw))
  );

  const list = matched.length > 0 ? matched : [keywordMap[0]];

  return list.map((entry) => {
    const video = mockVideos[entry.videoIndex];
    return {
      content: entry.snippet,
      source: {
        videoTitle: video.title,
        url: video.url,
        timestampSec: entry.sec,
      },
    };
  });
}
