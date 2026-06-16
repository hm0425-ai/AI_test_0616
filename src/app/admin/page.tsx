import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockVideos } from "@/lib/mock-data";

export default function AdminDashboardPage() {
  const stats = [
    { label: "수집된 영상", value: mockVideos.length },
    { label: "RAG Chunk 수", value: 128 },
    { label: "오늘 채팅 수", value: 0 },
    { label: "마지막 수집 작업", value: "미실행" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">관리자 대시보드</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{s.value}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
