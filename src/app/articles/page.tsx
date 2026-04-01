import { ArticleCard } from "@/components/article-card";
import { CategoryTabs } from "@/components/category-tabs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { categories, getArticlesByCategory } from "@/lib/articles";

type ArticlesPageProps = {
  searchParams?: {
    category?: string;
  };
};

export default function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const currentCategory = searchParams?.category ?? "全部";
  const articles = getArticlesByCategory(currentCategory);

  return (
    <div className="page-shell min-h-screen bg-canvas">
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="speed-mark rounded-[34px] border border-line bg-surface p-6 shadow-card sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-primary">Article Index</p>
              <h1 className="mt-3 text-3xl font-semibold text-heading sm:text-5xl">摩托行业文章流</h1>
              <p className="mt-4 text-sm leading-7 text-body sm:text-base">
                以更接近行业媒体的白色卡片布局组织文章列表，强化分类筛选、缩略图辨识和高频扫读效率。
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["当前栏目", currentCategory],
                ["内容总量", `${articles.length} 篇`]
              ].map(([label, value]) => (
                <div key={label} className="rounded-[22px] border border-line bg-canvas px-4 py-3">
                  <p className="text-xs text-body">{label}</p>
                  <p className="mt-2 text-lg font-semibold text-heading">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <CategoryTabs categories={categories} current={currentCategory} basePath="/articles" />
          </div>
        </section>

        <section className="mt-8 space-y-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="list" />
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
