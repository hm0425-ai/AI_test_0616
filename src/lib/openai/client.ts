import OpenAI from "openai";
import { getSetting } from "@/lib/settings";

/**
 * 설정 화면 또는 .env에 등록된 키로 OpenAI 클라이언트를 생성한다.
 * 키가 없으면 null을 반환하므로 호출부에서 mock 응답으로 fallback 한다.
 */
export async function getOpenAIClient(): Promise<OpenAI | null> {
  const apiKey = await getSetting("OPENAI_API_KEY");
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}
