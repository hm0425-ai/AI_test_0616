"use client";

import * as React from "react";
import { CheckCircle2, Eye, EyeOff, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SettingKey = "OPENAI_API_KEY" | "ELEVENLABS_API_KEY" | "YOUTUBE_API_KEY";

const FIELDS: { key: SettingKey; label: string; desc: string; placeholder: string }[] = [
  {
    key: "OPENAI_API_KEY",
    label: "OpenAI API Key",
    desc: "RAG 답변 생성 및 embedding 생성에 사용됩니다.",
    placeholder: "sk-...",
  },
  {
    key: "ELEVENLABS_API_KEY",
    label: "ElevenLabs API Key",
    desc: "음성 상담(STT/TTS) 및 Voice Cloning에 사용됩니다.",
    placeholder: "el-...",
  },
  {
    key: "YOUTUBE_API_KEY",
    label: "YouTube Data API Key",
    desc: "보듬TV 채널의 신규 영상을 수집하는 데 사용됩니다.",
    placeholder: "AIza...",
  },
];

type Status = Record<SettingKey, { configured: boolean; lastFour: string }>;

export function ApiKeyForm() {
  const [status, setStatus] = React.useState<Status | null>(null);
  const [values, setValues] = React.useState<Record<SettingKey, string>>({
    OPENAI_API_KEY: "",
    ELEVENLABS_API_KEY: "",
    YOUTUBE_API_KEY: "",
  });
  const [visible, setVisible] = React.useState<Record<SettingKey, boolean>>({
    OPENAI_API_KEY: false,
    ELEVENLABS_API_KEY: false,
    YOUTUBE_API_KEY: false,
  });
  const [saving, setSaving] = React.useState<SettingKey | null>(null);

  React.useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus(null));
  }, []);

  async function save(key: SettingKey) {
    setSaving(key);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: values[key] }),
      });
      const res = await fetch("/api/admin/settings");
      setStatus(await res.json());
      setValues((prev) => ({ ...prev, [key]: "" }));
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="space-y-4">
      {FIELDS.map((field) => {
        const fieldStatus = status?.[field.key];
        return (
          <Card key={field.key}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">{field.label}</CardTitle>
                <CardDescription>{field.desc}</CardDescription>
              </div>
              {fieldStatus === undefined ? null : fieldStatus.configured ? (
                <Badge variant="success">
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> 등록됨 (****{fieldStatus.lastFour})
                </Badge>
              ) : (
                <Badge variant="outline">
                  <XCircle className="mr-1 h-3.5 w-3.5" /> 미등록
                </Badge>
              )}
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  type={visible[field.key] ? "text" : "password"}
                  placeholder={field.placeholder}
                  value={values[field.key]}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setVisible((prev) => ({ ...prev, [field.key]: !prev[field.key] }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {visible[field.key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button
                onClick={() => save(field.key)}
                disabled={!values[field.key] || saving === field.key}
              >
                {saving === field.key ? <Loader2 className="h-4 w-4 animate-spin" /> : "저장"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
