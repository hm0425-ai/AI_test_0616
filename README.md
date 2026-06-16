# 보듬TV 펫AI — 반려견 훈련 AI 에이전트

보듬TV(@Bodeumofficial) 유튜브 영상을 RAG 지식베이스로 구축하여, 채팅/음성으로 반려견 양육·훈련·문제행동 질문에 출처 기반 답변을 제공하는 서비스.

## 폴더 구조

```
src/
  app/
    page.tsx                 # 랜딩 페이지
    chat/page.tsx             # AI 채팅 상담
    voice/page.tsx            # 음성 상담
    videos/page.tsx           # 영상 검색
    videos/[id]/page.tsx      # 출처 영상 상세
    admin/                    # 관리자 영역 (대시보드/영상수집/RAG/설정/보이스클로닝)
    api/
      chat/route.ts           # Orchestration Agent 호출
      admin/settings/route.ts # API Key 등록/조회
      youtube/sync/route.ts   # (2단계) 신규 영상 수집 트리거
  components/
    ui/                       # 디자인 시스템 (Button, Card, Input, Badge)
    landing/                  # 랜딩 섹션
    chat/                     # 채팅 UI
    admin/                    # 관리자 UI
  lib/
    agents/orchestration.ts   # Orchestration Agent
    rag/search.ts             # RAG 검색 (현재 mock, 추후 pgvector)
    openai/client.ts          # OpenAI 클라이언트 (설정값 기반)
    youtube/                  # (2단계) 수집 로직
    settings.ts               # DB+env 기반 설정 관리
    db.ts                     # Prisma client
prisma/schema.prisma          # DB 스키마 (pgvector 포함)
scripts/collect-youtube.ts    # (2단계) cron 수집 스크립트
```

## 개발 단계 (Claude Code 작업 순서)

- **1단계 (완료)**: 프로젝트 구조, DB 스키마, 디자인 시스템, 랜딩/채팅/관리자 설정 페이지
- **2단계**: YouTube Data API 연동 (Information Collection Agent) — 채널 영상 목록 수집, 자막 추출(yt-dlp), `Video` 테이블 적재
- **3단계**: chunking + OpenAI embedding 생성 → pgvector 저장, `lib/rag/search.ts`를 실제 cosine similarity 검색으로 교체
- **4단계**: ElevenLabs STT/TTS 연동 (`/voice` 페이지 실제 동작), Voice Cloning API 연동
- **5단계**: 영상 수집 관리/RAG 데이터 관리 페이지를 실제 DB와 연동, cron job(Vercel Cron 또는 Railway) 등록
- **6단계**: 관리자 인증, 배포 최적화, 에러 핸들링/모니터링

## 로컬 실행

```bash
npm install
cp .env.example .env   # 값 채우기 (없어도 mock으로 동작)
npx prisma generate
npm run dev
```

DB가 없어도 채팅 페이지는 mock 응답으로 동작합니다. `/admin/settings`에서 OpenAI API Key를 등록하면 실제 답변 생성으로 전환됩니다.
