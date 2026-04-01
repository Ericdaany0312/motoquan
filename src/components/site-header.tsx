import Link from "next/link";
import { categoryMeta } from "@/lib/articles";
import { CategoryIcon } from "./category-icon";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-[#f5f6fa]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-primary to-[#65b7ff] text-white shadow-float">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                <circle cx="12" cy="12" r="6.5" />
                <path d="M12 5.5v3M5.5 12h3M12 15.5v3M15.5 12h3M7.5 7.5l2.1 2.1M16.5 7.5l-2.1 2.1" />
              </svg>
            </span>
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.36em] text-primary">
                Motoquan Media
              </span>
              <span className="mt-1 block text-xl font-semibold text-heading">摩圈产业新闻台</span>
            </span>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/"
              className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-heading transition hover:border-primary hover:text-primary"
            >
              首页
            </Link>
            <Link
              href="/articles"
              className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-white transition hover:bg-[#ff7b4d]"
            >
              进入文章流
            </Link>
          </div>
        </div>

        <nav className="hide-scrollbar flex items-center gap-3 overflow-x-auto pb-1">
          {categoryMeta.map((item) => (
            <Link
              key={item.label}
              href={`/articles?category=${encodeURIComponent(item.label)}`}
              className="flex min-w-fit items-center gap-2 rounded-full border border-transparent bg-surface px-4 py-2 text-sm font-medium text-heading shadow-card transition hover:-translate-y-0.5 hover:border-line"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: item.softColor, color: item.color }}
              >
                <CategoryIcon icon={item.icon} />
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
