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

export const revalidate = 60;

export default async function HomePage() {
  const [featured, latestResult, trendingArticles, categories] = await Promise.all([
    getFeaturedArticle(),
    getPublishedArticles(undefined, 6, 1),
    getTrendingArticles(4),
    getPublicCategories(),
  ]);

  const latestArticles = latestResult.articles;

  const featuredCategory = featured
    ? categories.find((c) => c.name === featured.category) || null
    : null;

  return (
    <div className="page-shell bg-[#F5F6FA]">
      <SiteHeader />

      <main>
        {/* ── Hero ─────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {featured ? (
            <div className="grid gap-0 overflow-hidden rounded-2xl shadow-xl lg:grid-cols-[1fr_340px] border border-line"
                 style={{ minHeight: '420px' }}>

              {/* Left: large cover image, full-bleed */}
              <article className="relative overflow-hidden min-h-[300px] lg:min-h-0">
                {featured.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: featuredCategory
                        ? `linear-gradient(135deg, ${featuredCategory.color}, ${adjustBrightness(featuredCategory.color, -30)})`
                        : 'linear-gradient(135deg, #0A84FF, #0656b0)'
                    }}
                  />
                )}
                {/* Bottom gradient for text readability */}
                <div className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(10,12,26,0.85) 0%, rgba(10,12,26,0.3) 50%, transparent 100%)'
                  }}
                />
                {/* Top-right category pill */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                        style={{ backgroundColor: featuredCategory?.color || '#0A84FF' }}>
                    {featuredCategory?.icon} {featuredCategory?.name || featured.category}
                  </span>
                </div>
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="rounded-full bg-[#FF6B35] px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest text-white">
                      精选
                    </span>
                  </div>
                  <Link href={`/articles/${featured.slug}`}>
                    <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-white line-clamp-2 hover:text-[#FF6B35] transition-colors">
                      {featured.title}
                    </h1>
                  </Link>
                  <p className="mt-3 text-sm text-white/75 leading-relaxed line-clamp-2 max-w-lg">
                    {featured.summary}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-white/60">
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{formatArticleDate(featured.publishedAt)}</span>
                    <span>·</span>
                    <span>{featured.metrics.views} 阅读</span>
                  </div>
                </div>
              </article>

              {/* Right: trending sidebar */}
              <aside className="flex flex-col bg-white">
                <div className="p-5 flex-1">
                  <div className="mb-4">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FF6B35]">Hot</p>
                    <h2 className="mt-1 text-base font-semibold text-[#1A1A2E]">热门阅读</h2>
                  </div>
                  <div className="space-y-4">
                    {trendingArticles.map((article, i) => {
                      const cat = categories.find((c) => c.name === article.category) || null;
                      return (
                        <Link
                          key={article.slug}
                          href={`/articles/${article.slug}`}
                          className="group flex items-start gap-3 pb-4 border-b border-[#F0F0F0] last:border-0 last:pb-0"
                        >
                          <span
                            className="flex h-7 w-7 shrink-0 rounded-lg items-center justify-center text-xs font-bold text-white mt-0.5"
                            style={{ backgroundColor: cat?.color || '#0A84FF' }}
                          >
                            {i + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="text-[11px] font-medium" style={{ color: cat?.color || '#0A84FF' }}>
                              {article.category}
                            </p>
                            <h3 className="text-sm font-medium leading-5 text-[#1A1A2E] line-clamp-2 group-hover:text-[#FF6B35] transition-colors">
                              {article.title}
                            </h3>
                            <p className="mt-1 text-[11px] text-[#9CA3AF]">
                              {article.metrics.views} 阅读
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="card rounded-2xl p-20 text-center">
              <div className="text-5xl mb-4">🏍️</div>
              <p className="text-lg text-[#6B7280]">暂无精选文章</p>
              <Link
                href="/admin/articles/new"
                className="mt-4 text-sm text-[#FF6B35] hover:underline inline-block"
              >
                去后台发布第一篇 →
              </Link>
            </div>
          )}
        </section>

        {/* ── Latest ─────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FF6B35]">Latest</p>
              <h2 className="mt-1 text-2xl font-semibold text-[#1A1A2E]">最新文章</h2>
            </div>
            <Link
              href="/articles"
              className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#FF6B35]"
            >
              查看全部 →
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
            <div className="card rounded-2xl py-16 text-center">
              <div className="text-4xl mb-4">📰</div>
              <p className="text-[#6B7280]">暂无文章</p>
              <Link
                href="/admin/articles/new"
                className="mt-3 text-sm text-[#FF6B35] hover:underline inline-block"
              >
                去后台发布 →
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
