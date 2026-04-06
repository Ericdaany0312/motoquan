import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { getModelById, getPublishedArticles } from '@/lib/public-data';

export const revalidate = 60;

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const model = await getModelById(id);

  if (!model) notFound();

  const { articles } = await getPublishedArticles(undefined, 6, 1);
  const relatedArticles = articles.slice(0, 6);

  return (
    <div className="page-shell bg-[#F5F6FA]">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#9CA3AF]">
          <Link href="/models" className="hover:text-[#FF6B35] transition-colors">车型库</Link>
          <span>›</span>
          {model.brand && (
            <>
              <span>{model.brand.name}</span>
              <span>›</span>
            </>
          )}
          <span className="text-[#1A1A2E]">{model.name}</span>
        </div>

        {/* Hero section */}
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left: main info */}
          <div className="card rounded-2xl overflow-hidden">
            {/* Main image */}
            <div className="relative h-72 bg-gradient-to-br from-[#1A1A2E] to-[#2d2d5a]">
              {model.main_image ? (
                <Image
                  src={model.main_image}
                  alt={model.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl opacity-20">🏍️</span>
                </div>
              )}
              {/* Badges */}
              <div className="absolute top-5 left-5 flex gap-2">
                {model.is_hot && (
                  <span className="rounded-full bg-[#FF6B35] px-3 py-1 text-xs font-bold text-white">热门车型</span>
                )}
                {model.is_new && (
                  <span className="rounded-full bg-[#34C759] px-3 py-1 text-xs font-bold text-white">全新上市</span>
                )}
              </div>
            </div>

            {/* Basic info */}
            <div className="p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {model.brand && (
                    <p className="text-sm text-[#FF6B35] font-medium">{model.brand.name}</p>
                  )}
                  <h1 className="mt-1 text-3xl font-bold text-[#1A1A2E]">{model.name}</h1>
                  {model.category && (
                    <span className="mt-2 inline-block rounded-full bg-[#F0F0F0] px-3 py-1 text-sm text-[#6B7280]">
                      {model.category}
                    </span>
                  )}
                </div>
                {model.price && (
                  <div className="text-right">
                    <p className="text-[11px] text-[#9CA3AF]">官方售价</p>
                    <p className="mt-1 text-xl font-bold text-[#FF6B35]">{model.price}</p>
                  </div>
                )}
              </div>

              {/* Specs grid */}
              <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: '排量', value: model.displacement ? `${model.displacement}cc` : '-' },
                  { label: '功率', value: model.power || '-' },
                  { label: '扭矩', value: model.torque || '-' },
                  { label: '整备质量', value: model.weight ? `${model.weight}kg` : '-' },
                  { label: '座高', value: model.seat_height ? `${model.seat_height}mm` : '-' },
                  { label: '最高时速', value: model.top_speed ? `${model.top_speed}km/h` : '-' },
                ].map((spec) => (
                  <div key={spec.label} className="rounded-xl bg-[#F5F6FA] p-4">
                    <p className="text-[11px] text-[#9CA3AF]">{spec.label}</p>
                    <p className="mt-1 font-semibold text-[#1A1A2E]">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              {model.highlights && model.highlights.length > 0 && (
                <div className="mt-7">
                  <h3 className="text-sm font-semibold text-[#1A1A2E] mb-3">车型亮点</h3>
                  <div className="flex flex-wrap gap-2">
                    {model.highlights.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#FF6B35]/10 px-3 py-1 text-sm text-[#FF6B35]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: related articles + brand */}
          <aside className="space-y-5">
            {/* Brand card */}
            {model.brand && (
              <div className="card rounded-2xl p-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF]">所属品牌</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-[#F5F6FA] flex items-center justify-center text-2xl">
                    🏭
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A2E]">{model.brand.name}</h3>
                    <p className="text-sm text-[#9CA3AF]">{model.brand.country}</p>
                  </div>
                </div>
                <Link
                  href={`/models?brand=${model.brand.slug}`}
                  className="mt-4 block w-full rounded-full border border-[#E4E6EF] px-4 py-2 text-center text-sm font-medium text-[#6B7280] hover:border-[#FF6B35] hover:text-[#FF6B35] transition text-center"
                >
                  查看该品牌全部车型 →
                </Link>
              </div>
            )}

            {/* Related articles */}
            <div className="card rounded-2xl p-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF]">相关资讯</p>
              <div className="mt-4 space-y-4">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="group flex items-start gap-3"
                  >
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FF6B35]" />
                    <div>
                      <h4 className="text-sm font-medium text-[#1A1A2E] line-clamp-2 group-hover:text-[#FF6B35] transition-colors">
                        {article.title}
                      </h4>
                      <p className="mt-1 text-[11px] text-[#9CA3AF]">{article.category}</p>
                    </div>
                  </Link>
                ))}
                {relatedArticles.length === 0 && (
                  <p className="text-sm text-[#9CA3AF]">暂无相关文章</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
