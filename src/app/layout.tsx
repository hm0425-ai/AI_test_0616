import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "보듬TV 펫AI | 반려견 훈련 AI 상담",
  description:
    "보듬TV 유튜브 채널의 모든 영상을 기반으로 강아지 양육, 훈련, 문제행동에 대해 답변하는 AI 에이전트 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-bodeum-gradient antialiased dark:bg-bodeum-gradient-dark">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
