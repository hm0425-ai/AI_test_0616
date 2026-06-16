"use client";

import { motion } from "framer-motion";
import { PawPrint, User2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChatMessageData = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; url: string; timestampLabel: string }[];
};

export function ChatMessageBubble({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-3", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white",
          isUser ? "bg-sky-400" : "bg-gradient-to-br from-leaf-400 to-sky-400"
        )}
      >
        {isUser ? <User2 className="h-4.5 w-4.5" /> : <PawPrint className="h-4.5 w-4.5" />}
      </div>

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-sky-500 text-white"
            : "bg-white/90 text-foreground shadow-sm dark:bg-white/10"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>

        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 space-y-1.5 border-t border-border pt-2.5">
            <p className="text-xs font-semibold text-muted-foreground">출처 영상</p>
            {message.sources.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="block truncate text-xs text-sky-600 hover:underline"
              >
                🎬 {s.title} ({s.timestampLabel})
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
