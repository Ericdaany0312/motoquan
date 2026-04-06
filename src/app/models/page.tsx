import Link from 'next/link';
import Image from 'next/image';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import {
  getPublicModels,
  getPublicBrands,
  formatArticleDate,
} from '@/lib/public-data';

export const revalidate = 60;

const CATEGORY_LABELS: Record<string, string> = {
  '仿赛': '仿赛',
  '街车': '街车',
  'ADV': 'ADV',
  '巡航': '巡航',
  '踏板': '踏板',
  '拉力': 'ADV',
  '复古': '复古',
};

export default async function ModelsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; category?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const brand = sp.brand || '';
  const category = sp.category || '';
  const page = parseInt(sp.page || '1');

  const [modelsResult, brands] = await Promise.all([
    getPublicModels(brand || undefined, category || undefined, page, 20),
    getPublicBrands(),
  ]);

  const { models, total } = modelsResult;
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="page-shell bg-[#F5F6FA]">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FF6B35]">Database</p>
          <h1 className="mt-2 text-3xl font-bold text-[#1A1A2E]">车型库</h1>
          <p className="mt-2 text-[#6B7280]">
            共 {total} 款车型，来源于权威媒体与厂商公开数据
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {/* Brand filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#6B7280]">品牌</span>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/models"
                className={`rounded-full px-3 py-1 text-sm transition ${!brand ? 'bg-[#FF6B35] text-white' : 'bg-white text-[#6B7280] border border-[#E4E6EF] hover:border-[#FF6B35]'}`}
              >
                全部
              </Link>
              {brands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/models?brand=${b.slug}${category ? `&category=${category}` : ''}`}
                  className={`rounded-full px-3 py-1 text-sm transition ${brand === b.slug ? 'bg-[#FF6B35] text-white' : 'bg-white text-[#6B7280] border border-[#E4E6EF] hover:border-[#FF6B35]'}`}
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#6B7280]">类型</span>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/models${brand ? `?brand=${brand}` : ''}`}
                className={`rounded-full px-3 py-1 text-sm transition ${!category ? 'bg-[#0A84FF] text-white' : 'bg-white text-[#6B7280] border border-[#E4E6EF] hover:border-[#0A84FF]'}`}
              >
                全部
              </Link>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <Link
                  key={key}
                  href={`/models?${brand ? `brand=${brand}&` : ''}category=${key}`}
                  className={`rounded-full px-3 py-1 text-sm transition ${category === key ? 'bg-[#0A84FF] text-white' : 'bg-white text-[#6B7280] border border-[#E4E6EF] hover:border-[#0A84FF]'}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Model grid */}
        {models.length > 0 ? (
          <div className="grid gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {models.map((model) => (
              <Link
                key={model.id}
                href={`/models/${model.id}`}
                className="card rounded-2xl overflow-hidden hover:shadow-card transition group"
              >
                {/* Image area */}
                <div className="relative h-40 bg-gradient-to-br from-[#1A1A2E] to-[#2d2d5a] overflow-hidden">
                  {model.main_image ? (
                    <Image
                      src={model.main_image}
                      alt={model.model_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl">🏍️</span>
                    </div>
                  )}
                  {/* Hot/New badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {model.is_hot && (
                      <span className="rounded-full bg-[#FF6B35] px-2 py-0.5 text-[10px] font-bold text-white">
                        热门
                      </span>
                    )}
                    {model.is_new_model && (
                      <span className="rounded-full bg-[#34C759] px-2 py-0.5 text-[10px] font-bold text-white">
                        新车
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-[11px] text-[#FF6B35] font-medium">{model.brand}</p>
                  <h3 className="mt-1 text-base font-semibold text-[#1A1A2E] group-hover:text-[#FF6B35] transition-colors">
                    {model.model_name}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-[#9CA3AF]">
                    {model.bike_type && (
                      <span className="rounded-full bg-[#F0F0F0] px-2 py-0.5">{model.bike_type}</span>
                    )}
                    {model.engine_cc && (
                      <span className="rounded-full bg-[#F0F0F0] px-2 py-0.5">{model.engine_cc}cc</span>
                    )}
                    {model.power_hp && (
                      <span className="rounded-full bg-[#F0F0F0] px-2 py-0.5">{model.power_hp}hp</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card rounded-2xl py-20 text-center">
            <div className="text-5xl mb-4">🏍️</div>
            <p className="text-lg text-[#6B7280]">暂无车型数据</p>
            <p className="mt-2 text-sm text-[#9CA3AF]">车型数据正在录入中，敬请期待</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/models?page=${p}${brand ? `&brand=${brand}` : ''}${category ? `&category=${category}` : ''}`}
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition ${p === page ? 'bg-[#FF6B35] text-white' : 'bg-white text-[#6B7280] border border-[#E4E6EF] hover:border-[#FF6B35]'}`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
