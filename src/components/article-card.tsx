import Link from "next/link";
import { PublicArticle, PublicCategory, formatArticleDate } from "@/lib/public-data";

type ArticleCardProps = {
  article: PublicArticle;
  category?: PublicCategory | null;
  variant?: "grid" | "list" | "compact";
};

// Derive gradient from category color
function getGradient(category: PublicCategory | null | undefined): string {
  if (!category) return "linear-gradient(135deg, #0A84FF, #0A6FD4)";
  const from = category.color;
  const to = adjustBrightness(category.color, -20);
  return `linear-gradient(135deg, ${from}, ${to})`;
}

function adjustBrightness(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function CategoryBadge({ category }: { category: PublicCategory | null | undefined }) {
  if (!category) return null;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white"
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
      <article className="rounded-[24px] border border-line bg-surface p-4 shadow-card transition hover:-translate-y-0.5">
        <div className="flex items-start gap-4">
          <div
            className="diagonal-frame flex h-20 w-20 shrink-0 items-end rounded-[20px] p-3 text-white"
            style={{ background: gradient }}
          >
            {category && <span className="text-[10px] font-semibold tracking-[0.2em]">{category.name.slice(0, 4)}</span>}
          </div>
          <div className="min-w-0 flex-1">
            <CategoryBadge category={category} />
            <Link href={`/articles/${article.slug}`} className="mt-3 block">
              <h3 className="text-base font-semibold leading-6 text-heading transition hover:text-primary line-clamp-2">
                {article.title}
              </h3>
            </Link>
            <p className="mt-2 text-xs text-body">
              {formatArticleDate(article.publishedAt)} · {article.metrics.views} 阅读
            </p>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "list") {
    return (
      <article className="group rounded-[28px] border border-line bg-surface p-4 shadow-card transition hover:-translate-y-1 hover:shadow-float sm:p-5">
        <div className="grid gap-5 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
          {/* Image area - gradient card */}
          <div
            className="diagonal-frame relative min-h-[180px] rounded-[24px] p-5 text-white overflow-hidden"
            style={{ background: gradient }}
          >
            {/* Cover image if available */}
            {article.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.coverImage}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover rounded-[24px] opacity-60"
              />
            )}
            <div className="relative z-10 flex items-start justify-between gap-4">
              <span className="rounded-full bg-white/25 px-3 py-1 text-[11px] font-semibold">
                {article.metrics.views} 阅读
              </span>
              <span className="rounded-full bg-white/25 px-3 py-1 text-[11px] font-semibold">
                {article.readMinutes} min
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/80">
                {category ? category.name.slice(0, 4) : article.category}
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-body">
              <CategoryBadge category={category} />
              <span>{formatArticleDate(article.publishedAt)}</span>
              <span>{article.readMinutes} 分钟</span>
            </div>
            <Link href={`/articles/${article.slug}`} className="block">
              <h3 className="text-2xl font-semibold leading-9 text-heading transition group-hover:text-primary line-clamp-2">
                {article.title}
              </h3>
            </Link>
            <p className="mt-3 text-sm leading-7 text-body line-clamp-2">{article.summary}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-body">
                {article.author} · {article.metrics.comments} 条讨论
              </p>
              <Link
                href={`/articles/${article.slug}`}
                className="rounded-full bg-[#0A84FF]/10 px-4 py-2 text-sm font-medium text-[#0A84FF] transition hover:bg-[#0A84FF] hover:text-white"
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
    <article className="group rounded-[28px] border border-line bg-surface p-5 shadow-card transition hover:-translate-y-1 hover:shadow-float">
      <div
        className="diagonal-frame relative min-h-[220px] rounded-[24px] p-5 text-white overflow-hidden"
        style={{ background: gradient }}
      >
        {article.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.coverImage}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover rounded-[24px]"
          />
        )}
        <div className="relative z-10 flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
            {category ? category.name : article.category}
          </span>
          <span className="rounded-full bg-white/18 px-3 py-1 text-[11px] font-medium">
            {formatArticleDate(article.publishedAt)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <CategoryBadge category={category} />
        <span className="text-xs text-body">{article.metrics.views} 阅读</span>
      </div>

      <Link href={`/articles/${article.slug}`} className="mt-4 block">
        <h3 className="text-xl font-semibold leading-8 text-heading transition group-hover:text-primary line-clamp-2">
          {article.title}
        </h3>
      </Link>
      <p className="mt-3 text-sm leading-7 text-body line-clamp-2">{article.summary}</p>
      <div className="mt-5 flex items-center justify-between gap-3 text-sm text-body">
        <span>{article.author}</span>
        <span>{article.readMinutes} 分钟阅读</span>
      </div>
    </article>
  );
}
