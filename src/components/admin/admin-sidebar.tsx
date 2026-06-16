import Link from "next/link";
import { Database, KeyRound, LayoutDashboard, Mic2, Video } from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "대시보드", icon: LayoutDashboard },
  { href: "/admin/videos", label: "영상 수집 관리", icon: Video },
  { href: "/admin/rag", label: "RAG 데이터 관리", icon: Database },
  { href: "/admin/settings", label: "API Key 설정", icon: KeyRound },
  { href: "/admin/voice-cloning", label: "Voice Cloning", icon: Mic2 },
];

export function AdminSidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-border p-4">
      <p className="mb-4 px-2 text-xs font-semibold uppercase text-muted-foreground">
        관리자
      </p>
      <nav className="space-y-1">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
