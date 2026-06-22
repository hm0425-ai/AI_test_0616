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
import { Mic, MicOff, Loader2, Upload } from "lucide-react";

type Status = "idle" | "listening" | "transcribing" | "processing" | "speaking" | "error";

const STATUS_LABEL: Record<Status, string> = {
  idle: "마이크 버튼을 누르거나 파일을 업로드하세요",
  listening: "듣고 있습니다... (다시 누르면 중지)",
  transcribing: "음성을 텍스트로 변환 중...",
  processing: "답변 생성 중...",
  speaking: "답변을 읽고 있습니다...",
  error: "다시 시도해주세요",
};

function speakWithBrowser(text: string, onEnd: () => void) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 1.0;
  utterance.onend = onEnd;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export default function VoicePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [ttsMode, setTtsMode] = useState<"elevenlabs" | "browser">("elevenlabs");
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const statusRef = useRef<Status>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateStatus(s: Status) {
    statusRef.current = s;
    setStatus(s);
  }

  async function speakAnswer(text: string) {
    // 1. ElevenLabs 시도
    try {
      const ttsRes = await fetch("/api/voice/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (ttsRes.ok) {
        const blob = await ttsRes.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        updateStatus("speaking");
        setTtsMode("elevenlabs");
        audio.play();
        audio.onended = () => {
          updateStatus("idle");
          URL.revokeObjectURL(url);
        };
        return;
      }
    } catch {
      // ElevenLabs 실패 시 브라우저 TTS로 폴백
    }

    // 2. 브라우저 기본 TTS 폴백
    setTtsMode("browser");
    updateStatus("speaking");
    speakWithBrowser(text, () => updateStatus("idle"));
  }

  async function processQuestion(text: string) {
    setTranscript(text);
    updateStatus("processing");

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

      await speakAnswer(answerText);
    } catch (err: any) {
      setErrorMsg(err.message ?? "오류가 발생했습니다.");
      updateStatus("error");
    }
  }

  async function handleMicClick() {
    if (statusRef.current === "listening") {
      recognitionRef.current?.stop();
      return;
    }
    if (statusRef.current !== "idle" && statusRef.current !== "error") return;

    setErrorMsg("");
    setTranscript("");
    setAnswer("");

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg("이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용하거나 파일 업로드를 이용해주세요.");
      updateStatus("error");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => updateStatus("listening");

    recognition.onresult = async (event: any) => {
      const text: string = event.results[0][0].transcript;
      await processQuestion(text);
    };

    recognition.onerror = (event: any) => {
      if (event.error === "no-speech") {
        setErrorMsg("음성이 감지되지 않았습니다. 다시 시도하거나 파일을 업로드해주세요.");
      } else {
        setErrorMsg(`음성 인식 오류: ${event.error}`);
      }
      updateStatus("error");
    };

    recognition.onend = () => {
      if (statusRef.current === "listening") {
        updateStatus("idle");
      }
    };

    recognition.start();
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg("");
    setTranscript("");
    setAnswer("");
    updateStatus("transcribing");

    try {
      const form = new FormData();
      form.append("file", file);

      const sttRes = await fetch("/api/voice/stt", {
        method: "POST",
        body: form,
      });

      if (!sttRes.ok) {
        const errData = await sttRes.json().catch(() => ({}));
        throw new Error(errData.error || "음성 파일 변환에 실패했습니다.");
      }

      const { transcript: text } = await sttRes.json();
      if (!text) throw new Error("음성에서 텍스트를 인식하지 못했습니다.");

      await processQuestion(text);
    } catch (err: any) {
      setErrorMsg(err.message ?? "오류가 발생했습니다.");
      updateStatus("error");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  const isBusy =
    status === "transcribing" ||
    status === "processing" ||
    status === "speaking";

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Card>
          <CardHeader>
            <CardTitle>음성 상담</CardTitle>
            <CardDescription>
              마이크로 직접 질문하거나, 음성 파일을 업로드해 상담하세요.
              <br />
              보듬TV 영상 내용을 바탕으로 음성으로 답변해드립니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            <div className="flex items-center justify-center gap-6">
              {/* 마이크 버튼 */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleMicClick}
                  disabled={isBusy}
                  className={[
                    "flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200",
                    status === "listening"
                      ? "bg-red-500 animate-pulse scale-110"
                      : status === "speaking"
                      ? "bg-green-500"
                      : "bg-gradient-to-br from-sky-400 to-emerald-400 hover:scale-105",
                    isBusy ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
                  ].join(" ")}
                >
                  {isBusy && status !== "speaking" ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : status === "listening" ? (
                    <MicOff className="h-8 w-8" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </button>
                <span className="text-xs text-muted-foreground">마이크</span>
              </div>

              <span className="text-muted-foreground text-sm">또는</span>

              {/* 파일 업로드 버튼 */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isBusy}
                  className={[
                    "flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200",
                    "bg-gradient-to-br from-violet-400 to-purple-500 hover:scale-105",
                    isBusy ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
                  ].join(" ")}
                >
                  <Upload className="h-8 w-8" />
                </button>
                <span className="text-xs text-muted-foreground">파일 업로드</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*,.mp3,.wav,.m4a,.ogg,.webm"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isBusy}
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">{STATUS_LABEL[status]}</p>
            <p className="text-xs text-muted-foreground">지원 파일: mp3, wav, m4a, ogg, webm</p>

            {status === "speaking" && (
              <p className="text-xs text-muted-foreground">
                {ttsMode === "browser" ? "🔊 브라우저 기본 음성으로 재생 중" : "🎙️ ElevenLabs 음성으로 재생 중"}
              </p>
            )}

            {transcript && (
              <div className="rounded-xl bg-muted px-5 py-4 text-left">
                <p className="mb-1 text-xs font-semibold text-muted-foreground">내 질문</p>
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
                <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}