'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArticleCard } from '@/components/article-card';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getPublishedArticles, getPublicCategories, PublicArticle, PublicCategory } from '@/lib/public-data';

const PAGE_SIZE = 30;

export default function ArticlesPage() {
  const [articles, setArticles] = useState<PublicArticle[]>([]);
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [currentCategory, setCurrentCategory] = useState('全部');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchArticles = useCallback(async (cat: string, pg: number, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    const result = await getPublishedArticles(
      cat === '全部' ? undefined : cat,
      PAGE_SIZE,
      pg
    );
    if (append) {
      setArticles(prev => [...prev, ...result.articles]);
    } else {
      setArticles(result.articles);
    }
    setTotal(result.total);
    setHasMore(result.hasMore);
    setPage(pg);
    if (append) setLoadingMore(false);
    else setLoading(false);
  }, []);

  useEffect(() => {
    async function load() {
      const cats = await getPublicCategories();
      setCategories(cats);
      await fetchArticles(currentCategory, 1, false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory]);

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    fetchArticles(currentCategory, page + 1, true);
  };

  const handleCategoryChange = (cat: string) => {
    setCurrentCategory(cat);
    setPage(1);
    setArticles([]);
  };

  return (
    <div className="page-shell min-h-screen bg-canvas">
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
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
                ['当前栏目', currentCategory],
                ['内容总量', `${total} 篇`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[22px] border border-line bg-canvas px-4 py-3">
                  <p className="text-xs text-body">{label}</p>
                  <p className="mt-2 text-lg font-semibold text-heading">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange('全部')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  currentCategory === '全部'
                    ? 'bg-[#0A84FF] text-white'
                    : 'bg-[#0A84FF]/10 text-[#0A84FF] hover:bg-[#0A84FF]/20'
                }`}
              >
                全部
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:opacity-80 ${
                    currentCategory === cat.name ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Article List */}
        <section className="mt-8 space-y-5">
          {loading ? (
            <div className="text-center py-20 text-body">
              <div className="text-4xl mb-4 animate-pulse">🏍️</div>
              <p>加载中...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 text-body">
              <div className="text-5xl mb-4">📰</div>
              <p className="text-lg">暂无{currentCategory === '全部' ? '' : currentCategory}文章</p>
              <Link href="/admin/articles/new" className="mt-4 text-primary hover:underline text-sm inline-block">
                去后台发布第一篇 →
              </Link>
            </div>
          ) : (
            <>
              {articles.map((article) => {
                const cat = categories.find((c) => c.name === article.category) || null;
                return <ArticleCard key={article.slug} article={article} category={cat} variant="list" />;
              })}

              {/* Load More / Pagination */}
              {hasMore && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="flex items-center gap-2 rounded-full border-2 border-[#FF6B35] px-8 py-3 text-sm font-semibold text-[#FF6B35] transition hover:bg-[#FF6B35] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <>
                        <span className="animate-pulse">加载中...</span>
                      </>
                    ) : (
                      <>
                        加载更多
                        <span className="text-xs opacity-70">（{articles.length} / {total}）</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {!hasMore && articles.length > 0 && (
                <p className="text-center text-sm text-[#9CA3AF] py-4">
                  — 已加载全部 {total} 篇文章 —
                </p>
              )}
            </>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
