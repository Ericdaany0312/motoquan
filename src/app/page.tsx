import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getPublishedArticles,
  getFeaturedArticle,
  getTrendingArticles,
  getPublicCategories,
  formatArticleDate,
} from "@/lib/public-data";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const [featured, latestArticles, trendingArticles, categories] = await Promise.all([
    getFeaturedArticle(),
    getPublishedArticles(undefined, 6),
    getTrendingArticles(4),
    getPublicCategories(),
  ]);

  const featuredCategory = featured
    ? categories.find((c) => c.name === featured.category) || null
    : null;

  const featuredGradientFrom = featuredCategory?.color || '#0A84FF';
  const featuredGradientTo = adjustBrightness(featuredGradientFrom, -25);

  return (
    <div className="page-shell min-h-screen bg-canvas">
      <SiteHeader />
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_340px]">
            {/* Featured Article */}
            {featured ? (
              <article className="speed-mark rounded-[36px] border border-line bg-surface overflow-hidden shadow-float">
                <div
                  className="diagonal-frame relative rounded-[30px] m-3 p-6 sm:p-8 text-white"
                  style={{
                    background: `linear-gradient(140deg, ${featuredGradientFrom} 0%, ${featuredGradientTo} 100%)`,
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
                      Featured
                    </span>
                    {featuredCategory && (
                      <span
                        className="rounded-full px-3 py-1.5 text-xs font-semibold"
                        style={{ backgroundColor: 'rgba(255,255,255,0.22)', color: '#fff' }}
                      >
                        {featuredCategory.icon} {featuredCategory.name}
                      </span>
                    )}
                  </div>

                  <div className="max-w-2xl">
                    <p className="text-sm font-medium text-white/80">{featured.summary.slice(0, 80)}...</p>
                    <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-4xl line-clamp-3">
                      {featured.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
                      <span>{formatArticleDate(featured.publishedAt)}</span>
                      <span>·</span>
                      <span>{featured.author}</span>
                      <span>·</span>
                      <span>{featured.metrics.views} 阅读</span>
                      <span>·</span>
                      <span>{featured.readMinutes} 分钟</span>
                    </div>

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
            ) : (
              <div className="flex items-center justify-center rounded-[36px] border border-line bg-surface p-20 text-body">
                <div className="text-center">
                  <div className="text-5xl mb-4">🏍️</div>
                  <p>暂无精选文章</p>
                  <Link href="/admin/articles/new" className="mt-3 text-sm text-primary hover:underline inline-block">
                    去后台发布第一篇 →
                  </Link>
                </div>
              </div>
            )}

            {/* Trending Sidebar */}
            <aside className="rounded-[32px] border border-line bg-surface p-5 shadow-card sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#FF6B35]">Trending</p>
                  <h2 className="mt-2 text-2xl font-semibold text-heading">热读雷达</h2>
                </div>
                <span className="rounded-full bg-[#FF6B35]/10 px-3 py-1 text-xs font-semibold text-[#FF6B35]">
                  Orange Desk
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {trendingArticles.length > 0 ? trendingArticles.map((article, index) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="block rounded-[24px] border border-line p-4 transition hover:-translate-y-0.5 hover:border-[#FF6B35]/30"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF6B35] text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-xs font-medium text-[#FF6B35]">{article.category}</p>
                        <h3 className="mt-2 text-base font-semibold leading-6 text-heading line-clamp-2">{article.title}</h3>
                        <p className="mt-2 text-xs text-body">
                          {article.metrics.views} 阅读 · {article.metrics.comments} 讨论
                        </p>
                      </div>
                    </div>
                  </Link>
                )) : (
                  <p className="text-center text-body text-sm py-8">暂无数据</p>
                )}
              </div>

              <div className="mt-6 rounded-[24px] bg-[#FF6B35]/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#FF6B35]">Quick Brief</p>
                <p className="mt-3 text-sm leading-7 text-heading">
                  关注发布、零售、改装与装备消费的交叉变化，保持一眼可扫的行业阅读效率。
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* Category Navigation */}
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
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/articles"
                  className="rounded-full bg-[#0A84FF] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  全部
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/articles?category=${encodeURIComponent(cat.name)}`}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:opacity-80"
                    style={{ backgroundColor: cat.color }}
                  >
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles Grid */}
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

          {latestArticles.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {latestArticles.map((article) => {
                const cat = categories.find((c) => c.name === article.category) || null;
                return <ArticleCard key={article.slug} article={article} category={cat} />;
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-body">
              <div className="text-5xl mb-4">📰</div>
              <p className="text-lg">暂无文章</p>
              <p className="mt-2 text-sm">去后台发布几篇文章吧</p>
              <Link href="/admin/articles/new" className="mt-4 text-primary hover:underline text-sm inline-block">
                写新文章 →
              </Link>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function adjustBrightness(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
