import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminRagPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">RAG 데이터 관리</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vector DB 현황</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>저장된 Chunk: 128개 (mock)</p>
          <p>Embedding 모델: text-embedding-3-small</p>
          <p>Vector Store: pgvector (PostgreSQL)</p>
        </CardContent>
      </Card>
    </div>
  );
}
