// 실제 YouTube Data API 연동 전 사용하는 mock 데이터
export type MockVideo = {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration: number;
};

export const mockVideos: MockVideo[] = [
  {
    id: "v1",
    youtubeId: "dQw4w9WgXcQ",
    title: "강아지 분리불안, 이렇게 해결하세요 | 보듬TV",
    description: "분리불안 강아지를 위한 단계별 훈련법을 알려드립니다.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    publishedAt: "2025-05-12",
    duration: 612,
  },
  {
    id: "v2",
    youtubeId: "9bZkp7q19f0",
    title: "강아지 짖음 교정, 초보 보호자도 가능합니다",
    description: "초인종 소리에 짖는 강아지를 위한 행동 교정 가이드.",
    url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    thumbnailUrl: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
    publishedAt: "2025-04-28",
    duration: 540,
  },
  {
    id: "v3",
    youtubeId: "3JZ_D3ELwOQ",
    title: "강아지 배변훈련 완벽 가이드 (실패 없는 방법)",
    description: "패드 훈련부터 실외 배변까지, 연령별 배변훈련 팁.",
    url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
    thumbnailUrl: "https://i.ytimg.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    publishedAt: "2025-04-10",
    duration: 480,
  },
  {
    id: "v4",
    youtubeId: "L_jWHffIx5E",
    title: "산책 중 강아지가 줄을 당겨요 | 리드줄 훈련법",
    description: "당김 없이 편안하게 산책하는 리드줄 훈련 루틴.",
    url: "https://www.youtube.com/watch?v=L_jWHffIx5E",
    thumbnailUrl: "https://i.ytimg.com/vi/L_jWHffIx5E/hqdefault.jpg",
    publishedAt: "2025-03-22",
    duration: 700,
  },
];

export const mockSources = [
  {
    videoTitle: mockVideos[0].title,
    url: mockVideos[0].url,
    timestampSec: 95,
  },
  {
    videoTitle: mockVideos[2].title,
    url: mockVideos[2].url,
    timestampSec: 210,
  },
];
