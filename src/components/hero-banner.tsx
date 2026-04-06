'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PublicArticle, PublicCategory, formatArticleDate } from '@/lib/public-data';

type HeroBannerProps = {
  articles: PublicArticle[];
  categories: PublicCategory[];
  trendingArticles: PublicArticle[];
};

export function HeroBanner({ articles, categories, trendingArticles }: HeroBannerProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % articles.length);
  }, [articles.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + articles.length) % articles.length);
  }, [articles.length]);

  useEffect(() => {
    if (articles.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, articles.length]);

  if (!articles.length) return null;

  const article = articles[current];
  const cat = categories.find((c) => c.name === article.category) || null;

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl" style={{ minHeight: '440px' }}>
      {/* Slides */}
      {articles.map((a, i) => {
        const ac = categories.find((c) => c.name === a.category) || null;
        return (
          <div
            key={a.slug}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}
          >
            {/* Background image */}
            {a.coverImage ? (
              <Image
                src={a.coverImage}
                alt={a.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
                unoptimized
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: ac
                    ? `linear-gradient(135deg, ${ac.color}, ${adjustBrightness(ac.color, -30)})`
                    : 'linear-gradient(135deg, #0A84FF, #0656b0)',
                }}
              />
            )}
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(10,12,26,0.9) 0%, rgba(10,12,26,0.4) 50%, rgba(10,12,26,0.2) 100%)',
              }}
            />
          </div>
        );
      })}

      {/* Content */}
      <div className="relative z-10 flex h-full" style={{ minHeight: '440px' }}>
        {/* Left: main article */}
        <article className="flex-1 flex flex-col justify-end p-8 sm:p-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full bg-[#FF6B35] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
              精选
            </span>
            {cat && (
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: cat.color }}
              >
                {cat.icon} {cat.name}
              </span>
            )}
          </div>
          <Link href={`/articles/${article.slug}`}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white line-clamp-2 hover:text-[#FF6B35] transition-colors cursor-pointer">
              {article.title}
            </h1>
          </Link>
          <p className="mt-3 text-sm text-white/70 leading-relaxed line-clamp-2 max-w-xl">
            {article.summary}
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-white/50">
            <span>{article.author}</span>
            <span>·</span>
            <span>{formatArticleDate(article.publishedAt)}</span>
            <span>·</span>
            <span>{article.metrics.views} 阅读</span>
          </div>
        </article>

        {/* Right: trending sidebar */}
        <aside className="hidden w-72 bg-white/10 backdrop-blur-md p-6 flex-col lg:flex">
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FF6B35]">🔥 Hot</p>
            <h2 className="mt-1 text-base font-semibold text-white">热门阅读</h2>
          </div>
          <div className="flex-1 space-y-3">
            {trendingArticles.slice(0, 4).map((a, i) => {
              const tc = categories.find((c) => c.name === a.category) || null;
              return (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="group flex items-start gap-3 pb-3 border-b border-white/10 last:border-0 last:pb-0"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white mt-0.5"
                    style={{ backgroundColor: tc?.color || '#0A84FF' }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-white/60">{a.category}</p>
                    <h3 className="text-sm font-medium leading-5 text-white line-clamp-2 group-hover:text-[#FF6B35] transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-1 text-[11px] text-white/40">{a.metrics.views} 阅读</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </aside>
      </div>

      {/* Controls */}
      {articles.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white flex items-center justify-center transition"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white flex items-center justify-center transition"
          >
            ›
          </button>
          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {articles.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-[#FF6B35]' : 'w-1.5 bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
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
