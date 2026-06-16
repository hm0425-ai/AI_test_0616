"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Mic, PawPrint } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-24 sm:pt-28">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-leaf-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />

      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-sky-700 shadow-sm backdrop-blur dark:bg-white/10 dark:text-sky-300"
        >
          <PawPrint className="h-4 w-4" />
          보듬TV 공식 영상 기반 AI 에이전트
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
        >
          우리 아이의 행동,
          <br />
          <span className="bg-gradient-to-r from-sky-500 to-leaf-500 bg-clip-text text-transparent">
            보듬TV가 알려주는 정확한 답
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          분리불안, 짖음, 배변훈련, 산책 예절까지 — 보듬TV의 모든 영상을 학습한 AI가
          채팅과 음성으로 따뜻하게 답해드립니다. 모든 답변에는 출처 영상과 타임스탬프가 함께 제공됩니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/chat" className={cn(buttonVariants({ size: "lg" }))}>
            <MessageCircle className="h-5 w-5" />
            채팅으로 상담하기
          </Link>
          <Link
            href="/voice"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            <Mic className="h-5 w-5" />
            음성으로 상담하기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
