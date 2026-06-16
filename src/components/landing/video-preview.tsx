import Image from "next/image";
import Link from "next/link";
import { mockVideos } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";

export function VideoPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">학습된 보듬TV 영상</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            AI가 답변에 활용하는 실제 영상 콘텐츠입니다.
          </p>
        </div>
        <Link href="/videos" className="text-sm font-medium text-sky-600 hover:underline">
          전체 보기 →
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {mockVideos.map((video) => (
          <Link key={video.id} href={`/videos/${video.id}`}>
            <Card className="group overflow-hidden border-white/60 bg-white/70 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:bg-white/5">
              <div className="relative aspect-video bg-muted">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="line-clamp-2 text-sm font-medium">{video.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{video.publishedAt}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
