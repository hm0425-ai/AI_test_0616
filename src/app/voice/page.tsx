"use client";

import { useState, useRef } from "react";
import { SiteHeader } from "@/components/site-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mic, MicOff, Loader2 } from "lucide-react";

type Status = "idle" | "listening" | "processing" | "speaking" | "error";

const STATUS_LABEL: Record<Status, string> = {
  idle: "탭하여 말하기",
  listening: "듣고 있습니다... (다시 누르면 중지)",
  processing: "답변 생성 중...",
  speaking: "답변을 읽고 있습니다...",
  error: "다시 시도해주세요",
};

export default function VoicePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function handleMicClick() {
    if (status === "listening") {
      recognitionRef.current?.stop();
      return;
    }
    if (status === "processing" || status === "speaking") return;

    setErrorMsg("");
    setTranscript("");
    setAnswer("");

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg(
        "이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요."
      );
      setStatus("error");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => setStatus("listening");

    recognition.onresult = async (event: any) => {
      const text: string = event.results[0][0].transcript;
      setTranscript(text);
      setStatus("processing");

      try {
        const chatRes = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: text }),
        });
        const data = await chatRes.json();
        const answerText: string =
          data.answer || data.error || "답변을 생성하지 못했습니다.";
        setAnswer(answerText);

        const ttsRes = await fetch("/api/voice/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: answerText }),
        });

        if (!ttsRes.ok) {
          const errData = await ttsRes.json().catch(() => ({}));
          throw new Error(errData.error || "음성 변환에 실패했습니다.");
        }

        const blob = await ttsRes.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        setStatus("speaking");
        audio.play();
        audio.onended = () => {
          setStatus("idle");
          URL.revokeObjectURL(url);
        };
      } catch (err: any) {
        setErrorMsg(err.message ?? "오류가 발생했습니다.");
        setStatus("error");
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === "no-speech") {
        setErrorMsg("음성이 감지되지 않았습니다. 다시 시도해주세요.");
      } else {
        setErrorMsg(`음성 인식 오류: ${event.error}`);
      }
      setStatus("error");
    };

    recognition.start();
  }

  const isDisabled = status === "processing" || status === "speaking";

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Card>
          <CardHeader>
            <CardTitle>음성 상담</CardTitle>
            <CardDescription>
              마이크 버튼을 눌러 강아지 관련 질문을 말씀해 주세요.
              <br />
              보듬TV 영상 내용을 바탕으로 음성으로 답변해드립니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            <button
              onClick={handleMicClick}
              disabled={isDisabled}
              className={[
                "mx-auto flex h-24 w-24 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200",
                status === "listening"
                  ? "bg-red-500 animate-pulse scale-110"
                  : status === "speaking"
                  ? "bg-green-500"
                  : "bg-gradient-to-br from-sky-400 to-emerald-400 hover:scale-105",
                isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
              ].join(" ")}
            >
              {status === "processing" ? (
                <Loader2 className="h-10 w-10 animate-spin" />
              ) : status === "listening" ? (
                <MicOff className="h-10 w-10" />
              ) : (
                <Mic className="h-10 w-10" />
              )}
            </button>

            <p className="text-sm text-muted-foreground">
              {STATUS_LABEL[status]}
            </p>

            {transcript && (
              <div className="rounded-xl bg-muted px-5 py-4 text-left">
                <p className="mb-1 text-xs font-semibold text-muted-foreground">
                  내 질문
                </p>
                <p className="text-sm">{transcript}</p>
              </div>
            )}

            {answer && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-left dark:border-emerald-800 dark:bg-emerald-950/30">
                <p className="mb-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  보듬TV AI 답변
                </p>
                <p className="text-sm leading-relaxed">{answer}</p>
              </div>
            )}

            {errorMsg && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-left dark:border-red-800 dark:bg-red-950/30">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errorMsg}
                </p>
                {errorMsg.includes("ElevenLabs") && (
                  <a
                    href="/admin/settings"
                    className="mt-1 block text-xs underline text-red-500"
                  >
                    → 관리자 설정에서 ElevenLabs API Key를 등록하세요
                  </a>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}