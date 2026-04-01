import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { CategoryTabs } from "@/components/category-tabs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  categories,
  formatArticleDate,
  getCategoryMeta,
  getFeaturedArticles,
  getLatestArticles,
  getTrendingArticles
} from "@/lib/articles";

export default function HomePage() {
  const featured = getFeaturedArticles()[0];
  const latestArticles = getLatestArticles(6);
  const trendingArticles = getTrendingArticles(4);
  const featuredCategory = featured ? getCategoryMeta(featured.category) : null;

  return (
    <div className="page-shell min-h-screen bg-canvas">
      <SiteHeader />
      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_340px]">
            {featured && featuredCategory ? (
              <article className="speed-mark rounded-[36px] border border-line bg-surface overflow-hidden shadow-float">
                {/* Color bar top */}
                <div
                  className="h-3"
                  style={{
                    background: `linear-gradient(90deg, ${featured.coverPalette.from}, ${featured.coverPalette.to})`
                  }}
                />
                <div className="p-6 sm:p-8">
                  {/* Category + Meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      Featured
                    </span>
                    <span
                      className="rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                      style={{ backgroundColor: featuredCategory.color }}
                    >
                      {featured.category}
                    </span>
                    <span className="text-xs text-body">{formatArticleDate(featured.publishedAt)}</span>
                    <span className="text-xs text-body">·</span>
                    <span className="text-xs text-body">{featured.readMinutes} 分钟阅读</span>
                  </div>

                  {/* Title */}
                  <Link href={`/articles/${featured.slug}`}>
                    <h1 className="text-2xl font-bold leading-tight text-heading sm:text-4xl hover:text-primary transition">
                      {featured.title}
                    </h1>
                  </Link>

                  {/* Summary */}
                  <p className="mt-4 text-sm leading-7 text-body">
                    {featured.summary}
                  </p>

                  {/* Key Points */}
                  <ul className="mt-5 space-y-2.5">
                    {featured.keyPoints.slice(0, 3).map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-body">
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: featuredCategory.color }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/articles/${featured.slug}`}
                      className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                      style={{ backgroundColor: featuredCategory.color }}
                    >
                      阅读全文 →
                    </Link>
                    <Link
                      href="/articles"
                      className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-body transition hover:border-primary hover:text-primary"
                    >
                      更多报道
                    </Link>
                  </div>
                </div>
              </article>
            ) : null}

            <aside className="rounded-[32px] border border-line bg-surface p-5 shadow-card sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-secondary">Trending</p>
                  <h2 className="mt-2 text-2xl font-semibold text-heading">热读雷达</h2>
                </div>
                <span className="rounded-full bg-secondarySoft px-3 py-1 text-xs font-semibold text-secondary">
                  Orange Desk
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {trendingArticles.map((article, index) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="block rounded-[24px] border border-line p-4 transition hover:-translate-y-0.5 hover:border-secondary/30"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-xs font-medium text-secondary">{article.category}</p>
                        <h3 className="mt-2 text-base font-semibold leading-6 text-heading">{article.title}</h3>
                        <p className="mt-2 text-xs text-body">
                          {article.metrics.views} 阅读 · {article.metrics.comments} 讨论
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-[24px] bg-secondarySoft p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Quick Brief</p>
                <p className="mt-3 text-sm leading-7 text-heading">
                  关注发布、零售、改装与装备消费的交叉变化，保持一眼可扫的行业阅读效率。
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
          <div className="rounded-[30px] border border-line bg-surface p-5 shadow-card sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-primary">Category Line</p>
                <h2 className="mt-2 text-2xl font-semibold text-heading">栏目导航</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-body">
                用鲜明颜色区分不同内容入口，让首页像行业媒体的栏目条而不是普通博客标签。
              </p>
            </div>
            <div className="mt-5">
              <CategoryTabs categories={categories} current="全部" basePath="/articles" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-primary">Latest Stories</p>
              <h2 className="mt-2 text-3xl font-semibold text-heading">最新文章</h2>
            </div>
            <Link href="/articles" className="text-sm font-medium text-body transition hover:text-primary">
              查看完整文章流
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
