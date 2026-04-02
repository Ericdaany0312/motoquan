import Link from "next/link";
import { categoryMeta } from "@/lib/articles";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E4E6EF] bg-white mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/motoquan-logo.png" alt="摩托圈" className="h-[120px] w-auto" />
            </div>
            <p className="text-sm leading-6 text-[#6B7280] max-w-xs">
              面向摩托产业从业者与高频骑士的内容平台。聚焦新车发布、行业快讯、技术工程、装备指南与改装工场。
            </p>
          </div>

          {/* Categories */}
          <div>
            <p className="text-sm font-semibold text-[#1A1A2E] mb-4">栏目</p>
            <div className="flex flex-wrap gap-2">
              {categoryMeta.map((item) => (
                <Link
                  key={item.label}
                  href={`/articles?category=${encodeURIComponent(item.label)}`}
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ backgroundColor: item.softColor, color: item.color }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-[#1A1A2E] mb-4">导航</p>
            <div className="space-y-3 text-sm text-[#6B7280]">
              <Link href="/" className="block transition-colors hover:text-[#FF6B35]">
                首页精选
              </Link>
              <Link href="/articles" className="block transition-colors hover:text-[#FF6B35]">
                全部文章
              </Link>
              <Link href="/admin" className="block transition-colors hover:text-[#FF6B35]">
                管理后台
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E4E6EF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9CA3AF]">
            © 2026 摩托圈 Motorcycle Circle. 保留所有权利。
          </p>
          <p className="text-xs text-[#9CA3AF]">
            用内容连接产业与骑行文化
          </p>
        </div>
      </div>
    </footer>
  );
}
