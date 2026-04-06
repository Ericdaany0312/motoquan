import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HomeCTA } from "@/components/home-cta";
import { HeroBanner } from "@/components/hero-banner";
import { CategoryShowcase } from "@/components/category-showcase";
import { SupplierShowcaseLoginCTA } from "@/components/supplier-showcase";
import {
  getPublishedArticles,
  getFeaturedArticles,
  getTrendingArticles,
  getPublicCategories,
  formatArticleDate,
  getBusinessCount,
  getArticleCount,
} from "@/lib/public-data";

export const revalidate = 60;

export default async function HomePage() {
  const [featuredArticles, latestResult, trendingArticles, categories, articleCount, businessCount] =
    await Promise.all([
      getFeaturedArticles(),
      getPublishedArticles(undefined, 6, 1),
      getTrendingArticles(4),
      getPublicCategories(),
      getArticleCount(),
      getBusinessCount(),
    ]);

  const latestArticles = latestResult.articles;

  return (
    <div className="page-shell bg-[#F5F6FA]">
      <SiteHeader />

      <main>
        {/* ── Hero Banner Carousel ──────────────── */}
        <section className="mx-auto max-w-7xl px-4 pt-8 pb-0 sm:px-6 lg:px-8">
          <HeroBanner
            articles={featuredArticles}
            categories={categories}
            trendingArticles={trendingArticles}
          />
        </section>

        {/* ── Category Showcase + Stats ───────── */}
        <CategoryShowcase categories={categories} stats={{ articles: articleCount, businesses: businessCount }} />

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
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => {
                const cat = categories.find((c) => c.name === article.category) || null;
                return <ArticleCard key={article.slug} article={article} category={cat} />;
              })}
            </div>
          ) : (
            <div className="card rounded-2xl py-16 text-center">
              <div className="text-4xl mb-4">📰</div>
              <p className="text-[#6B7280]">暂无文章</p>
            </div>
          )}
        </section>

        {/* ── Supplier Showcase ─────────────────── */}
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2d2d5a] rounded-[32px] p-8 sm:p-12 text-white relative overflow-hidden">
            {/* decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FF6B35]/10 -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#0A84FF]/10 translate-y-1/2 -translate-x-1/4" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#FF6B35] mb-2">Directory</p>
                  <h2 className="text-3xl font-bold">供应商黄页</h2>
                  <p className="mt-2 text-white/60 text-sm max-w-md">汇集摩托车配件、维修、整车经销商——找货、找店、找合作，一个平台全搞定</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/businesses"
                    className="px-6 py-3 bg-[#FF6B35] hover:bg-[#e8551a] text-white font-semibold rounded-full transition text-sm text-center"
                  >
                    查看全部供应商 →
                  </Link>
                  <SupplierShowcaseLoginCTA />
                </div>
              </div>
              {/* Value props */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: '🔧', title: '配件采购', desc: '刹车片·链条·轮胎·油品' },
                  { icon: '🏪', title: '维修保养', desc: '正规门店·品质保障' },
                  { icon: '🚗', title: '新车整车', desc: '授权经销商·官方价格' },
                  { icon: '🤝', title: '商务合作', desc: '批量采购·OEM代工' },
                ].map((item) => (
                  <div key={item.title} className="bg-white/8 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Register ─────────────────────── */}
        <HomeCTA />
      </main>

      <SiteFooter />
    </div>
  );
}
