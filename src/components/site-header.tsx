import Link from "next/link";
import { categoryMeta } from "@/lib/articles";
import { CategoryIcon } from "./category-icon";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E4E6EF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.svg"
              alt="摩托圈"
              className="h-9 w-auto"
            />
            <div className="hidden sm:block">
              <span className="text-sm font-semibold text-[#1A1A2E]">摩托圈</span>
              <span className="ml-2 text-xs text-[#9CA3AF] tracking-widest">MOTORCYCLE CIRCLE</span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-[#6B7280] rounded-full transition-colors hover:bg-[#F5F6FA] hover:text-[#1A1A2E]"
            >
              首页
            </Link>
            <Link
              href="/articles"
              className="px-4 py-2 text-sm font-semibold text-white bg-[#FF6B35] rounded-full transition-colors hover:bg-[#e8551a]"
            >
              文章流
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 text-sm font-medium text-[#9CA3AF] rounded-full transition-colors hover:bg-[#F5F6FA] hover:text-[#1A1A2E]"
            >
              后台
            </Link>
          </nav>
        </div>
      </div>

      {/* Category strip */}
      <div className="border-t border-[#F5F6FA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="hide-scrollbar flex items-center gap-1 overflow-x-auto py-2">
            <Link
              href="/articles"
              className="flex min-w-fit items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold bg-[#1A1A2E] text-white transition-colors hover:bg-[#2d2d4a]"
            >
              全部
            </Link>
            {categoryMeta.map((item) => (
              <Link
                key={item.label}
                href={`/articles?category=${encodeURIComponent(item.label)}`}
                className="flex min-w-fit items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors hover:opacity-80"
                style={{
                  backgroundColor: item.softColor,
                  color: item.color,
                }}
              >
                <CategoryIcon icon={item.icon} className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
