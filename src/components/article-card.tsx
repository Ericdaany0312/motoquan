import Link from "next/link";
import { Article, formatArticleDate, getCategoryMeta } from "@/lib/articles";

type ArticleCardProps = {
  article: Article;
  variant?: "grid" | "list" | "compact";
};

export function ArticleCard({ article, variant = "grid" }: ArticleCardProps) {
  const category = getCategoryMeta(article.category);

  if (!category) {
    return null;
  }

  if (variant === "compact") {
    return (
      <article className="rounded-[24px] border border-line bg-surface p-4 shadow-card transition hover:-translate-y-0.5">
        <div className="flex items-start gap-4">
          <div
            className="diagonal-frame flex h-20 w-20 shrink-0 items-end rounded-[20px] p-3 text-white"
            style={{ background: `linear-gradient(135deg, ${article.coverPalette.from}, ${article.coverPalette.to})` }}
          >
            <span className="text-[10px] font-semibold tracking-[0.2em]">{category.shortLabel}</span>
          </div>
          <div className="min-w-0 flex-1">
            <span
              className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{ backgroundColor: category.softColor, color: category.color }}
            >
              {article.category}
            </span>
            <Link href={`/articles/${article.slug}`} className="mt-3 block">
              <h3 className="text-base font-semibold leading-6 text-heading transition hover:text-primary">
                {article.title}
              </h3>
            </Link>
            <p className="mt-2 text-xs text-body">
              {formatArticleDate(article.publishedAt)} · {article.metrics.views}
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
          <div
            className="diagonal-frame relative min-h-[180px] rounded-[24px] p-5 text-white"
            style={{ background: `linear-gradient(135deg, ${article.coverPalette.from}, ${article.coverPalette.to})` }}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                {article.deck}
              </span>
              <span className="rounded-full bg-white/18 px-3 py-1 text-[11px] font-semibold">
                {article.metrics.views}
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/80">{category.shortLabel}</p>
              <p className="mt-3 text-2xl font-semibold leading-none">{article.coverLabel}</p>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-body">
              <span
                className="rounded-full px-3 py-1 font-semibold"
                style={{ backgroundColor: category.softColor, color: category.color }}
              >
                {article.category}
              </span>
              <span>{formatArticleDate(article.publishedAt)}</span>
              <span>{article.readMinutes} min</span>
            </div>
            <Link href={`/articles/${article.slug}`} className="mt-4 block">
              <h3 className="text-2xl font-semibold leading-9 text-heading transition group-hover:text-primary">
                {article.title}
              </h3>
            </Link>
            <p className="mt-3 text-sm leading-7 text-body">{article.summary}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-body">
                {article.author} · {article.metrics.comments} 条讨论
              </p>
              <Link
                href={`/articles/${article.slug}`}
                className="rounded-full bg-primarySoft px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
              >
                阅读全文
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group rounded-[28px] border border-line bg-surface p-5 shadow-card transition hover:-translate-y-1 hover:shadow-float">
      <div
        className="diagonal-frame relative min-h-[220px] rounded-[24px] p-5 text-white"
        style={{ background: `linear-gradient(135deg, ${article.coverPalette.from}, ${article.coverPalette.to})` }}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
            {article.deck}
          </span>
          <span className="rounded-full bg-white/18 px-3 py-1 text-[11px] font-medium">
            {formatArticleDate(article.publishedAt)}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs uppercase tracking-[0.32em] text-white/80">{category.shortLabel}</p>
          <p className="mt-3 text-[30px] font-semibold leading-none">{article.coverLabel}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: category.softColor, color: category.color }}
        >
          {article.category}
        </span>
        <span className="text-xs text-body">{article.metrics.views} 阅读</span>
      </div>

      <Link href={`/articles/${article.slug}`} className="mt-4 block">
        <h3 className="text-xl font-semibold leading-8 text-heading transition group-hover:text-primary">
          {article.title}
        </h3>
      </Link>
      <p className="mt-3 text-sm leading-7 text-body">{article.summary}</p>
      <div className="mt-5 flex items-center justify-between gap-3 text-sm text-body">
        <span>{article.author}</span>
        <span>{article.readMinutes} 分钟阅读</span>
      </div>
    </article>
  );
}
