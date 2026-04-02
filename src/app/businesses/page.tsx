import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

async function getBusinesses() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/businesses?status=approved`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

const SCOPE_LABELS: Record<string, string> = {
  '配件批发': '配件批发',
  '维修服务': '维修服务',
  '整车销售': '整车销售',
  'OEM代工': 'OEM代工',
};

export default async function BusinessesPage() {
  const businesses = await getBusinesses();

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <SiteHeader />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2d2d5a] text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">供应商黄页</h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            汇集摩托车产业链优质供应商——配件、维修、整车、改装，助力采购商高效匹配
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/register" className="px-6 py-2.5 bg-[#FF6B35] hover:bg-[#e8551a] text-white font-semibold rounded-full transition">
              免费入驻黄页
            </Link>
            <Link href="/articles" className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 transition">
              浏览行业资讯
            </Link>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="border-b border-[#E4E6EF] bg-white sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {['全部', '配件批发', '维修服务', '整车销售', 'OEM代工'].map((tab) => (
              <button key={tab} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                tab === '全部' ? 'bg-[#FF6B35] text-white' : 'bg-[#F5F6FA] text-[#6B7280] hover:bg-[#E4E6EF]'
              }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Business cards */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {businesses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏪</div>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">暂无已审核供应商</h2>
            <p className="text-[#9CA3AF]">正在招商中，热门供应商即将入驻</p>
            <Link href="/register" className="mt-6 inline-block px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-full hover:bg-[#e8551a] transition">
              抢先入驻 →
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((biz: any) => (
              <Link
                key={biz.id}
                href={`/businesses/${biz.id}`}
                className="bg-white rounded-[28px] border border-[#E4E6EF] p-6 hover:shadow-card hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6B35]/10 flex items-center justify-center text-2xl shrink-0">
                    🏢
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-[#1A1A2E] group-hover:text-[#FF6B35] transition-colors line-clamp-1">
                      {biz.company_name}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] mt-0.5">{biz.contact_person}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {biz.business_scope && (
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <span className="text-[#FF6B35]">📌</span>
                      <span className="line-clamp-1">{biz.business_scope}</span>
                    </div>
                  )}
                  {(biz.province || biz.city) && (
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <span className="text-[#0A84FF]">📍</span>
                      <span>{biz.province} {biz.city}</span>
                    </div>
                  )}
                  {biz.phone && (
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <span className="text-[#34C759]">📞</span>
                      <span>{biz.phone}</span>
                    </div>
                  )}
                </div>

                {biz.product_categories?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {biz.product_categories.slice(0, 3).map((cat: string) => (
                      <span key={cat} className="px-2.5 py-1 bg-[#F5F6FA] text-[#6B7280] text-xs rounded-full">
                        {cat}
                      </span>
                    ))}
                    {biz.product_categories.length > 3 && (
                      <span className="px-2.5 py-1 bg-[#F5F6FA] text-[#9CA3AF] text-xs rounded-full">
                        +{biz.product_categories.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-[#F5F6FA] flex items-center justify-between">
                  <span className="text-xs text-[#9CA3AF]">
                    {biz.submitted_at ? `入驻 ${new Date(biz.submitted_at).toLocaleDateString('zh-CN')}` : ''}
                  </span>
                  <span className="text-xs font-medium text-[#FF6B35] group-hover:underline">查看详情 →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#ff8c5a] rounded-[28px] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">我是供应商，想入驻黄页</h3>
            <p className="mt-1 text-white/80 text-sm">免费注册账号，提交公司信息通过审核后即可在黄页展示</p>
          </div>
          <Link
            href="/user"
            className="px-8 py-3 bg-white text-[#FF6B35] font-bold rounded-full hover:bg-white/90 transition whitespace-nowrap"
          >
            前往入驻 →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
