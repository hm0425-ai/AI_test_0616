import { ApiKeyForm } from "@/components/admin/api-key-form";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">API Key 설정</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          아래에 키를 등록하면 .env 값보다 우선하여 즉시 적용됩니다. 키는 DB에 저장됩니다.
        </p>
      </div>
      <ApiKeyForm />
    </div>
  );
}
