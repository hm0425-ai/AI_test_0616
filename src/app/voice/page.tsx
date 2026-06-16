import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mic } from "lucide-react";

export default function VoicePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Card>
          <CardHeader>
            <CardTitle>음성 상담</CardTitle>
            <CardDescription>
              ElevenLabs API Key 등록 후 음성 질문/답변 기능이 활성화됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-leaf-400 text-white shadow-lg">
              <Mic className="h-8 w-8" />
            </button>
            <p className="mt-4 text-sm text-muted-foreground">탭하여 말하기 (준비 중)</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
