import Link from "next/link";
import { PawPrint } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/chat", label: "AI 상담" },
  { href: "/voice", label: "음성 상담" },
  { href: "/videos", label: "영상 검색" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-leaf-400 text-white">
            <PawPrint className="h-5 w-5" />
          </span>
          보듬TV 펫AI
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/chat"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            지금 상담하기
          </Link>
        </div>
      </div>
    </header>
  );
}
