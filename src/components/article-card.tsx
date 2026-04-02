import Link from "next/link";
import Image from "next/image";
import { PublicArticle, PublicCategory, formatArticleDate } from "@/lib/public-data";

type ArticleCardProps = {
  article: PublicArticle;
  category?: PublicCategory | null;
  variant?: "grid" | "list" | "compact";
};

function adjustBrightness(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function getGradient(category: PublicCategory | null | undefined): string {
  if (!category) return "linear-gradient(135deg, #0A84FF, #0A6FD4)";
  const from = category.color;
  const to = adjustBrightness(category.color, -20);
  return `linear-gradient(135deg, ${from}, ${to})`;
}

function CategoryBadge({ category }: { category: PublicCategory | null | undefined }) {
  if (!category) return null;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
      style={{ backgroundColor: category.color }}
    >
      {category.icon} {category.name}
    </span>
  );
}

export function ArticleCard({ article, category, variant = "grid" }: ArticleCardProps) {
  const gradient = getGradient(category);

  if (variant === "compact") {
    return (
      <Link href={`/articles/${article.slug}`} className="card rounded-2xl p-4 hover:shadow-card transition cursor-pointer block">
        <div className="flex items-start gap-4">
          {article.coverImage ? (
            <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
                sizes="80px"
                unoptimized
              />
            </div>
          ) : (
            <div
              className="flex h-20 w-20 shrink-0 items-end rounded-xl p-3"
              style={{ background: gradient }}
            >
              {category && (
                <span className="text-[10px] font-semibold tracking-wide opacity-80 text-white">
                  {category.name.slice(0, 4)}
                </span>
              )}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <CategoryBadge category={category} />
            <h3 className="mt-2 text-sm font-semibold leading-5 text-[#1A1A2E] line-clamp-2 hover:text-[#FF6B35] transition-colors">
              {article.title}
            </h3>
            <p className="mt-1.5 text-xs text-[#9CA3AF]">
              {formatArticleDate(article.publishedAt)} · {article.metrics.views} 阅读
            </p>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <Link href={`/articles/${article.slug}`} className="card rounded-2xl p-5 hover:shadow-card transition cursor-pointer block">
        <div className="grid gap-5 md:grid-cols-[200px_minmax(0,1fr)] items-center">
          {/* Image block */}
          <div className="relative h-[160px] rounded-xl overflow-hidden" style={{ background: gradient }}>
            {article.coverImage ? (
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
                sizes="200px"
                unoptimized
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
              <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                {article.metrics.views} 阅读
              </span>
              <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                {article.readMinutes} min
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-[#9CA3AF]">
              <CategoryBadge category={category} />
              <span>{formatArticleDate(article.publishedAt)}</span>
            </div>
            <h3 className="text-xl font-semibold leading-7 text-[#1A1A2E] line-clamp-2 hover:text-[#FF6B35] transition-colors">
              {article.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6B7280] line-clamp-2">{article.summary}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-sm text-[#9CA3AF]">{article.author}</span>
              <span className="rounded-full bg-[#FF6B35]/10 px-4 py-1.5 text-sm font-medium text-[#FF6B35]">
                阅读全文
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // grid variant (default)
  return (
    <Link href={`/articles/${article.slug}`} className="card rounded-2xl p-5 hover:shadow-card transition cursor-pointer block">
      {/* Color header bar */}
      <div className="relative h-[160px] rounded-xl overflow-hidden" style={{ background: gradient }}>
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
        <div className="absolute top-3 left-3 z-20">
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white"
            style={{ backgroundColor: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(4px)' }}
          >
            {category ? category.name : article.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 z-20">
          <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white/90"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}>
            {formatArticleDate(article.publishedAt)}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <CategoryBadge category={category} />
        <h3 className="mt-3 text-lg font-semibold leading-6 text-[#1A1A2E] line-clamp-2 hover:text-[#FF6B35] transition-colors">
          {article.title}
        </h3>
        <p className="mt-2.5 text-sm leading-6 text-[#6B7280] line-clamp-2">{article.summary}</p>
        <div className="mt-4 flex items-center justify-between gap-3 text-xs text-[#9CA3AF]">
          <span>{article.author}</span>
          <span>{article.metrics.views} 阅读 · {article.readMinutes} 分钟</span>
        </div>
      </div>
    </Link>
  );
}
