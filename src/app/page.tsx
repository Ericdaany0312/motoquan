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
                {/* Full gradient card with diagonal overlay */}
                <div
                  className="diagonal-frame relative rounded-[30px] m-3 p-6 sm:p-8 text-white"
                  style={{
                    background: `linear-gradient(140deg, ${featured.coverPalette.from} 0%, ${featured.coverPalette.to} 100%)`
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
                      Featured
                    </span>
                    <span
                      className="rounded-full px-3 py-1.5 text-xs font-semibold"
                      style={{ backgroundColor: 'rgba(255,255,255,0.22)', color: '#fff' }}
                    >
                      {featured.category}
                    </span>
                  </div>

                  <div className="max-w-2xl">
                    <p className="text-sm font-medium text-white/80">{featured.deck}</p>
                    <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-4xl">
                      {featured.title}
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-white/85 sm:text-base">
                      {featured.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
                      <span>{formatArticleDate(featured.publishedAt)}</span>
                      <span>·</span>
                      <span>{featured.author}</span>
                      <span>·</span>
                      <span>{featured.metrics.views} 阅读</span>
                      <span>·</span>
                      <span>{featured.readMinutes} 分钟</span>
                    </div>

                    <ul className="mt-4 space-y-1.5">
                      {featured.keyPoints.slice(0, 3).map((point) => (
                        <li key={point} className="flex items-start gap-2 text-xs text-white/80">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={`/articles/${featured.slug}`}
                        className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-heading transition hover:bg-white/90"
                      >
                        阅读全文 →
                      </Link>
                      <Link
                        href="/articles"
                        className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                      >
                        更多报道
                      </Link>
                    </div>
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
