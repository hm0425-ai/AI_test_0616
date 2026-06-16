import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockVideos } from "@/lib/mock-data";

export default function AdminVideosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">영상 수집 관리</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            보듬TV 채널(@Bodeumofficial)을 하루 1회 자동으로 확인합니다. (현재는 mock 데이터)
          </p>
        </div>
        <Button>지금 수집 실행</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">수집된 영상 목록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockVideos.map((v) => (
            <div key={v.id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="font-medium">{v.title}</p>
                <p className="text-xs text-muted-foreground">{v.publishedAt}</p>
              </div>
              <Badge variant="success">전사 완료</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
