"use client";

import { motion } from "framer-motion";
import { BookOpenCheck, Mic2, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: BookOpenCheck,
    title: "영상 기반 정확한 답변",
    desc: "보듬TV의 모든 영상 자막을 학습해 추측이 아닌 실제 콘텐츠 기반으로 답합니다.",
  },
  {
    icon: ShieldCheck,
    title: "출처 100% 공개",
    desc: "답변마다 출처 영상 제목, 링크, 타임스탬프를 함께 제공해 신뢰할 수 있습니다.",
  },
  {
    icon: Mic2,
    title: "채팅 & 음성 상담",
    desc: "텍스트는 물론 음성으로 질문하고, 음성으로 답변을 들을 수 있습니다.",
  },
  {
    icon: Sparkles,
    title: "매일 업데이트되는 지식",
    desc: "하루 1회 새 영상을 자동으로 수집해 최신 훈련 정보를 반영합니다.",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full border-white/60 bg-white/70 backdrop-blur dark:bg-white/5">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-leaf-400 text-white">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
