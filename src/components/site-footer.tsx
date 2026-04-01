import Link from "next/link";
import { categoryMeta } from "@/lib/articles";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-primary">Motoquan Bulletin</p>
          <h2 className="mt-3 text-2xl font-semibold text-heading">面向摩托产业从业者与高频骑士的清爽阅读平台</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-body">
            聚焦新车发布、行业交易、技术维护、装备筛选与改装方案，用更接近行业媒体的方式组织摩托内容。
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-heading">频道</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categoryMeta.map((item) => (
                <Link
                  key={item.label}
                  href={`/articles?category=${encodeURIComponent(item.label)}`}
                  className="rounded-full px-3 py-2 text-xs font-medium"
                  style={{ backgroundColor: item.softColor, color: item.color }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-heading">导航</p>
            <div className="mt-4 space-y-3 text-sm text-body">
              <Link href="/" className="block transition hover:text-primary">
                首页精选
              </Link>
              <Link href="/articles" className="block transition hover:text-primary">
                全部文章
              </Link>
              <p>样例内容用于展示视觉与信息架构方向。</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
