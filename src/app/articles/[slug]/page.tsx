import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatArticleDate,
  formatFullDate,
  getArticleBySlug,
  getCategoryMeta,
  getLatestArticles
} from "@/lib/articles";

type ArticleDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getLatestArticles().map((article) => ({
    slug: article.slug
  }));
}

export function generateMetadata({ params }: ArticleDetailPageProps): Metadata {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "文章未找到 | motoquan"
    };
  }

  return {
    title: `${article.title} | motoquan`,
    description: article.summary
  };
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const category = getCategoryMeta(article.category);
  const relatedArticles = getLatestArticles()
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  if (!category) {
    notFound();
  }

  return (
    <div className="page-shell min-h-screen bg-canvas">
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="rounded-[34px] border border-line bg-surface p-5 shadow-card sm:p-8">
            <Link href="/articles" className="text-sm font-medium text-body transition hover:text-primary">
              返回文章列表
            </Link>

            <div
              className="diagonal-frame relative mt-6 min-h-[320px] rounded-[30px] p-6 text-white sm:p-8"
              style={{ background: `linear-gradient(135deg, ${article.coverPalette.from}, ${article.coverPalette.to})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,46,0.8)] via-[rgba(26,26,46,0.2)] to-transparent" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="rounded-full bg-white/20 px-4 py-2 uppercase tracking-[0.24em]">{article.deck}</span>
                  <span className="rounded-full bg-white/16 px-4 py-2">{article.metrics.views} 阅读</span>
                </div>

                <div className="max-w-3xl">
                  <span
                    className="inline-flex rounded-full px-4 py-2 text-sm font-semibold"
                    style={{ backgroundColor: "rgba(255,255,255,0.18)", color: "#ffffff" }}
                  >
                    {article.category}
                  </span>
                  <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">{article.title}</h1>
                  <p className="mt-4 text-sm leading-7 text-white/82 sm:text-base">{article.summary}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-body">
              <span>{formatFullDate(article.publishedAt)}</span>
              <span>作者 {article.author}</span>
              <span>{article.readMinutes} 分钟阅读</span>
              <span>{article.metrics.comments} 条讨论</span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
              <div className="rounded-[26px] bg-canvas p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">文章导语</p>
                <p className="mt-3 text-base leading-8 text-heading">{article.summary}</p>
              </div>
              <div className="rounded-[26px] bg-secondarySoft p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Share Panel</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["微信", "微博", "收藏"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-white transition hover:bg-[#ff7b4d]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-6 text-[15px] leading-8 text-body sm:text-[17px]">
              {article.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <section className="mt-10 rounded-[30px] border border-line bg-canvas p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-primary">Key Points</p>
                  <h2 className="mt-2 text-2xl font-semibold text-heading">本篇重点</h2>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: category.softColor, color: category.color }}
                >
                  {formatArticleDate(article.publishedAt)}
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {article.keyPoints.map((point) => (
                  <div key={point} className="rounded-[22px] bg-surface p-4 shadow-card">
                    <div className="mb-3 h-1.5 w-12 rounded-full" style={{ backgroundColor: category.color }} />
                    <p className="text-sm leading-7 text-heading">{point}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] border border-line bg-surface p-5 shadow-card">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-secondary">Sidebar Note</p>
              <h2 className="mt-2 text-2xl font-semibold text-heading">相关阅读</h2>
              <p className="mt-3 text-sm leading-7 text-body">
                用紧凑卡片维持阅读延续性，保留行业媒体常见的“读完继续看”路径。
              </p>
            </div>

            <div className="space-y-4">
              {relatedArticles.map((related) => (
                <ArticleCard key={related.slug} article={related} variant="compact" />
              ))}
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
