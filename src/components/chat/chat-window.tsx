"use client";

import * as React from "react";
import { Send, Loader2 } from "lucide-react";
import { ChatMessageBubble, type ChatMessageData } from "@/components/chat/chat-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SUGGESTIONS = [
  "강아지가 자꾸 짖어요, 어떻게 해야 하나요?",
  "분리불안은 어떻게 훈련시키나요?",
  "배변훈련 언제부터 시작해야 하나요?",
];

export function ChatWindow() {
  const [messages, setMessages] = React.useState<ChatMessageData[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "안녕하세요! 보듬TV 펫AI예요 🐾 강아지 양육, 훈련, 문제행동에 대해 무엇이든 물어보세요. 보듬TV 영상을 근거로 답변해드릴게요.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(question: string) {
    if (!question.trim() || loading) return;

    const userMsg: ChatMessageData = { id: crypto.randomUUID(), role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.answer ?? data.error ?? "답변을 가져오지 못했습니다.",
          sources: data.sources,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "네트워크 오류가 발생했습니다. 다시 시도해주세요." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4">
      <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto py-6">
        {messages.map((m) => (
          <ChatMessageBubble key={m.id} message={m} />
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            보듬TV 영상을 검색하고 있어요...
          </div>
        )}

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs text-foreground hover:bg-white dark:bg-white/10"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-2 border-t border-border bg-background/80 py-4 backdrop-blur"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="강아지 행동에 대해 질문해보세요..."
          disabled={loading}
        />
        <Button type="submit" size="icon" disabled={loading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
