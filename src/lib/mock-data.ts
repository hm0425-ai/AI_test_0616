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
    youtubeId: "Gg2WQKSb1QY",
    title: "폭신♥ 손이 털 속에 숨어버림 | 견종백과 꼬똥 드 툴레아편",
    description: "강형욱의 보듬TV - 꼬똥 드 툴레아 견종 소개",
    url: "https://www.youtube.com/watch?v=Gg2WQKSb1QY",
    thumbnailUrl: "https://i.ytimg.com/vi/Gg2WQKSb1QY/hqdefault.jpg",
    publishedAt: "2025-05-12",
    duration: 600,
  },
  {
    id: "v2",
    youtubeId: "VQa6yYqa2MU",
    title: "영상에서 꼬순내가 진동함 ㄷㄷ | 견종백과 말티푸편",
    description: "강형욱의 보듬TV - 말티푸 견종 소개",
    url: "https://www.youtube.com/watch?v=VQa6yYqa2MU",
    thumbnailUrl: "https://i.ytimg.com/vi/VQa6yYqa2MU/hqdefault.jpg",
    publishedAt: "2025-04-28",
    duration: 600,
  },
  {
    id: "v3",
    youtubeId: "E8FPnTQxFMo",
    title: "털 빠짐도 한도초과! 사모예드 우유가 왔어요 | 견종백과 사모예드편",
    description: "강형욱의 보듬TV - 사모예드 견종 소개",
    url: "https://www.youtube.com/watch?v=E8FPnTQxFMo",
    thumbnailUrl: "https://i.ytimg.com/vi/E8FPnTQxFMo/hqdefault.jpg",
    publishedAt: "2025-04-10",
    duration: 600,
  },
  {
    id: "v4",
    youtubeId: "9xFqDi0HOq8",
    title: "도 견디게 하는 극강의 사랑스러움 🤍 | 견종백과 말티즈편",
    description: "강형욱의 보듬TV - 말티즈 견종 소개",
    url: "https://www.youtube.com/watch?v=9xFqDi0HOq8",
    thumbnailUrl: "https://i.ytimg.com/vi/9xFqDi0HOq8/hqdefault.jpg",
    publishedAt: "2025-03-22",
    duration: 600,
  },
];

export const mockSources = [
  {
    videoId: "v1",
    timestamp: 95,
    url: "https://www.youtube.com/watch?v=Gg2WQKSb1QY&t=95s",
  },
  {
    videoId: "v2",
    timestamp: 210,
    url: "https://www.youtube.com/watch?v=VQa6yYqa2MU&t=210s",
  },
];