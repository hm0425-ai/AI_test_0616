import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const VOICES = [
  { id: "male-1", name: "남성 보이스 1 (기본)", gender: "MALE" },
  { id: "female-1", name: "여성 보이스 1 (기본)", gender: "FEMALE" },
];

export default function VoiceCloningPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Voice Cloning 설정</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">기본 보이스</CardTitle>
          <CardDescription>ElevenLabs API Key 등록 후 사용 가능합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {VOICES.map((v) => (
            <div key={v.id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <p className="text-sm font-medium">{v.name}</p>
              <Badge variant="outline">{v.gender}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">새 보이스 클로닝</CardTitle>
          <CardDescription>음성 샘플을 업로드해 나만의 보이스를 등록하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">샘플 음성 업로드 (준비 중)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
