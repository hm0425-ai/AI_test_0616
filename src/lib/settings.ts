import { prisma } from "@/lib/db";

export type SettingKey =
  | "OPENAI_API_KEY"
  | "ELEVENLABS_API_KEY"
  | "YOUTUBE_API_KEY";

/**
 * 관리자 설정 화면에서 입력한 키(DB)를 우선 사용하고,
 * 없으면 .env 값을 fallback으로 사용한다.
 */
export async function getSetting(key: SettingKey): Promise<string> {
  try {
    const row = await prisma.appSetting.findUnique({ where: { key } });
    if (row?.value) return row.value;
  } catch {
    // DB 연결 전(MVP 초기 단계)에는 env만 사용
  }
  return process.env[key] ?? "";
}

export async function setSetting(key: SettingKey, value: string) {
  return prisma.appSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function getAllSettingStatus(): Promise<
  Record<SettingKey, { configured: boolean; lastFour: string }>
> {
  const keys: SettingKey[] = ["OPENAI_API_KEY", "ELEVENLABS_API_KEY", "YOUTUBE_API_KEY"];
  const result = {} as Record<SettingKey, { configured: boolean; lastFour: string }>;
  for (const key of keys) {
    const value = await getSetting(key);
    result[key] = {
      configured: Boolean(value),
      lastFour: value ? value.slice(-4) : "",
    };
  }
  return result;
}
