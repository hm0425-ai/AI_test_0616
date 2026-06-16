import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VideoPreview } from "@/components/landing/video-preview";

export default function VideosPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh]">
        <VideoPreview />
      </main>
      <SiteFooter />
    </>
  );
}
