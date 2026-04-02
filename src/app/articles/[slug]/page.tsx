'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/article-card';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import {
  getArticleBySlug,
  getPublishedArticles,
  getPublicCategories,
  formatArticleDate,
  PublicArticle,
  PublicCategory,
} from '@/lib/public-data';
import {
  getArticleAction,
  toggleLike,
  toggleFavorite,
} from '@/lib/user-data';

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<PublicArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<PublicArticle[]>([]);
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryColor, setCategoryColor] = useState('#0A84FF');
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    async function load() {
      const [art, relatedResult, cats] = await Promise.all([
        getArticleBySlug(params.slug),
        getPublishedArticles(undefined, 4, 1),
        getPublicCategories(),
      ]);
      setArticle(art);
      setRelatedArticles(relatedResult.articles.filter((a) => a.slug !== params.slug).slice(0, 3));
      setCategories(cats);
      if (art) {
        const cat = cats.find((c) => c.name === art.category);
        if (cat) setCategoryColor(cat.color);
        const action = getArticleAction(art.id);
        setLiked(action.liked);
        setFavorited(action.favorited);
      }
      setLoading(false);
    }
    load();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="page-shell min-h-screen bg-canvas">
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-4 py-20 text-center text-body">
          <div className="text-5xl animate-pulse">🏍️</div>
          <p className="mt-4">加载中...</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!article) {
    return notFound();
  }

  const relatedCat = categories.find((c) => c.name === article.category) || null;
  const darkerColor = adjustBrightness(categoryColor, -25);

  return (
    <div className="page-shell min-h-screen bg-canvas">
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main Article */}
          <article className="rounded-[34px] border border-line bg-surface p-5 shadow-card sm:p-8">
            <Link href="/articles" className="text-sm font-medium text-body transition hover:text-primary">
              ← 返回文章列表
            </Link>

            {/* Hero Banner */}
            <div
              className="diagonal-frame relative mt-6 min-h-[280px] rounded-[30px] p-6 text-white sm:p-8 overflow-hidden"
              style={{ background: `linear-gradient(140deg, ${categoryColor}, ${darkerColor})` }}
            >
              {article.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-[30px]"
                />
              )}
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[240px]">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  {relatedCat && (
                    <span className="rounded-full bg-white/20 px-4 py-2">
                      {relatedCat.icon} {relatedCat.name}
                    </span>
                  )}
                  <span className="rounded-full bg-white/16 px-4 py-2">{article.metrics.views} 阅读</span>
                </div>
                <div className="max-w-3xl">
                  <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl line-clamp-4">
                    {article.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-body">
              <span>{formatArticleDate(article.publishedAt)}</span>
              <span>·</span>
              <span>作者 {article.author}</span>
              <span>·</span>
              <span>{article.readMinutes} 分钟阅读</span>
              <span>·</span>
              <span>{article.metrics.comments} 条讨论</span>
            </div>

            {/* Summary + Share */}
            <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
              <div className="rounded-[26px] bg-canvas p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary mb-2">文章摘要</p>
                <p className="text-base leading-8 text-heading">{article.summary}</p>
              </div>
              <div className="rounded-[26px] bg-[#FF6B35]/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#FF6B35] mb-2">互动</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const newVal = toggleLike(article.id);
                      setLiked(newVal);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      liked
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-[#FF6B35] text-white hover:bg-[#ff7b4d]'
                    }`}
                  >
                    {liked ? '❤️ 已赞' : '🤍 赞'}
                  </button>
                  <button
                    onClick={() => {
                      const newVal = toggleFavorite(article.id);
                      setFavorited(newVal);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      favorited
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-[#FF6B35] text-white hover:bg-[#ff7b4d]'
                    }`}
                  >
                    {favorited ? '⭐ 已收藏' : '☆ 收藏'}
                  </button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="mt-10 space-y-6 text-[15px] leading-8 text-body sm:text-[17px]">
              {article.content.split('\n\n').filter(Boolean).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 text-xs text-body"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Related / Key Points */}
            <section className="mt-10 rounded-[30px] border border-line bg-canvas p-6">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-primary">Related</p>
                  <h2 className="mt-2 text-2xl font-semibold text-heading">相关阅读</h2>
                </div>
                <Link
                  href="/articles"
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: categoryColor }}
                >
                  更多 →
                </Link>
              </div>
              <div className="space-y-3">
                {relatedArticles.map((related) => {
                  const cat = categories.find((c) => c.name === related.category) || null;
                  return <ArticleCard key={related.slug} article={related} category={cat} variant="compact" />;
                })}
              </div>
            </section>
          </article>

          {/* Sticky Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] border border-line bg-surface p-5 shadow-card">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#FF6B35]">About</p>
              <h2 className="mt-2 text-xl font-semibold text-heading">关于本文</h2>
              <div className="mt-4 space-y-3 text-sm text-body">
                <div className="flex justify-between">
                  <span>分类</span>
                  <span className="font-medium text-heading">{article.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>作者</span>
                  <span className="font-medium text-heading">{article.author}</span>
                </div>
                <div className="flex justify-between">
                  <span>阅读时长</span>
                  <span className="font-medium text-heading">{article.readMinutes} 分钟</span>
                </div>
                <div className="flex justify-between">
                  <span>阅读量</span>
                  <span className="font-medium text-heading">{article.metrics.views}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-line bg-surface p-5 shadow-card">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-primary">Categories</p>
              <h2 className="mt-2 text-xl font-semibold text-heading">栏目分类</h2>
              <div className="mt-4 space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/articles?category=${encodeURIComponent(cat.name)}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-body hover:bg-gray-50 transition"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="flex-1 font-medium">{cat.name}</span>
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
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
