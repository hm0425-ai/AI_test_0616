import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { mockVideos } from "@/lib/mock-data";

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  const video = mockVideos.find((v) => v.id === params.id);
  if (!video) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{video.publishedAt}</p>
        <a
          href={video.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sky-600 hover:underline"
        >
          유튜브에서 보기 →
        </a>
        <p className="mt-6 leading-relaxed">{video.description}</p>
      </main>
      <SiteFooter />
    </>
  );
}
