import Link from "next/link";
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
      <article className="card rounded-2xl p-4">
        <div className="flex items-start gap-4">
          <div
            className="flex h-20 w-20 shrink-0 items-end rounded-xl p-3 text-white"
            style={{ background: gradient }}
          >
            {category && (
              <span className="text-[10px] font-semibold tracking-wide opacity-80">
                {category.name.slice(0, 4)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <CategoryBadge category={category} />
            <Link href={`/articles/${article.slug}`} className="mt-2 block">
              <h3 className="text-sm font-semibold leading-5 text-[#1A1A2E] line-clamp-2 hover:text-[#FF6B35] transition-colors">
                {article.title}
              </h3>
            </Link>
            <p className="mt-1.5 text-xs text-[#9CA3AF]">
              {formatArticleDate(article.publishedAt)} · {article.metrics.views} 阅读
            </p>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "list") {
    return (
      <article className="card rounded-2xl p-5">
        <div className="grid gap-5 md:grid-cols-[200px_minmax(0,1fr)] items-center">
          {/* Image/gradient block */}
          <div
            className="relative min-h-[160px] rounded-xl p-5 text-white overflow-hidden"
            style={{ background: gradient }}
          >
            {article.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.coverImage}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
            )}
            <div className="relative z-10 flex items-start justify-between">
              <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-[11px] font-semibold">
                {article.metrics.views} 阅读
              </span>
              <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-[11px] font-semibold">
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
            <Link href={`/articles/${article.slug}`} className="block">
              <h3 className="text-xl font-semibold leading-7 text-[#1A1A2E] line-clamp-2 hover:text-[#FF6B35] transition-colors">
                {article.title}
              </h3>
            </Link>
            <p className="mt-2 text-sm leading-6 text-[#6B7280] line-clamp-2">{article.summary}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-sm text-[#9CA3AF]">{article.author}</span>
              <Link
                href={`/articles/${article.slug}`}
                className="rounded-full bg-[#FF6B35]/10 px-4 py-1.5 text-sm font-medium text-[#FF6B35] transition-colors hover:bg-[#FF6B35] hover:text-white"
              >
                阅读全文
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // grid variant (default)
  return (
    <article className="card rounded-2xl p-5">
      {/* Color header bar */}
      <div
        className="relative min-h-[160px] rounded-xl p-5 text-white overflow-hidden"
        style={{ background: gradient }}
      >
        {article.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.coverImage}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        )}
        <div className="relative z-10 flex items-start justify-between">
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
            style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
          >
            {category ? category.name : article.category}
          </span>
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white/90">
            {formatArticleDate(article.publishedAt)}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <CategoryBadge category={category} />
        <Link href={`/articles/${article.slug}`} className="mt-3 block">
          <h3 className="text-lg font-semibold leading-6 text-[#1A1A2E] line-clamp-2 hover:text-[#FF6B35] transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2.5 text-sm leading-6 text-[#6B7280] line-clamp-2">{article.summary}</p>
        <div className="mt-4 flex items-center justify-between gap-3 text-xs text-[#9CA3AF]">
          <span>{article.author}</span>
          <span>{article.metrics.views} 阅读 · {article.readMinutes} 分钟</span>
        </div>
      </div>
    </article>
  );
}
