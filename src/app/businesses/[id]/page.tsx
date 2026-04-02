import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

async function getBusiness(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/businesses/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getAllBusinesses() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/businesses?status=approved`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function BusinessDetailPage({ params }: { params: { id: string } }) {
  const [biz, allBiz] = await Promise.all([
    getBusiness(params.id),
    getAllBusinesses(),
  ]);

  if (!biz) return notFound();

  const related = (allBiz as any[])
    .filter((b: any) => b.id !== biz.id && b.business_scope === biz.business_scope)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/businesses" className="inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#FF6B35] transition mb-6">
          ← 返回供应商黄页
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Main info */}
          <div className="bg-white rounded-[28px] border border-[#E4E6EF] p-8">
            {/* Header */}
            <div className="flex items-start gap-5 pb-6 border-b border-[#F5F6FA]">
              <div className="w-20 h-20 rounded-3xl bg-[#FF6B35]/10 flex items-center justify-center text-4xl">
                🏢
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1A1A2E]">{biz.company_name}</h1>
                {biz.business_scope && (
                  <span className="inline-block mt-2 px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold rounded-full">
                    {biz.business_scope}
                  </span>
                )}
                {(biz.province || biz.city) && (
                  <p className="mt-2 text-sm text-[#9CA3AF]">📍 {biz.province} {biz.city}</p>
                )}
              </div>
            </div>

            {/* Description */}
            {biz.description && (
              <div className="py-6 border-b border-[#F5F6FA]">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[#FF6B35] mb-3">公司简介</h2>
                <p className="text-[#1A1A2E] leading-8 text-[15px] whitespace-pre-line">{biz.description}</p>
              </div>
            )}

            {/* Products */}
            {biz.product_categories?.length > 0 && (
              <div className="py-6 border-b border-[#F5F6FA]">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[#FF6B35] mb-3">产品/服务分类</h2>
                <div className="flex flex-wrap gap-2">
                  {biz.product_categories.map((cat: string) => (
                    <span key={cat} className="px-4 py-2 bg-[#F5F6FA] text-[#1A1A2E] text-sm rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact info */}
            <div className="py-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[#FF6B35] mb-4">联系方式</h2>
              <div className="space-y-3">
                {[
                  { label: '联系人', value: biz.contact_person, icon: '👤' },
                  { label: '手机', value: biz.phone, icon: '📞' },
                  { label: '微信', value: biz.wechat, icon: '💬' },
                  { label: '邮箱', value: biz.email, icon: '📧' },
                ].map((item) => (
                  item.value && (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <p className="text-xs text-[#9CA3AF]">{item.label}</p>
                        <p className="font-medium text-[#1A1A2E]">{item.value}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* CTA card */}
            <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2d2d5a] rounded-[28px] p-6 text-white">
              <h3 className="font-bold text-lg">找 {biz.business_scope || '该公司'}？</h3>
              <p className="mt-2 text-white/60 text-sm">直接联系供应商，获取报价和合作信息</p>
              <div className="mt-5 space-y-2">
                {biz.phone && (
                  <a href={`tel:${biz.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#FF6B35] hover:bg-[#e8551a] text-white font-semibold rounded-xl transition text-sm">
                    📞 立即拨打
                  </a>
                )}
                {biz.wechat && (
                  <div className="flex items-center gap-2 justify-center py-2.5 bg-white/10 rounded-xl text-sm">
                    💬 微信：{biz.wechat}
                  </div>
                )}
              </div>
            </div>

            {/* Register CTA */}
            {!biz.submitted_by && (
              <div className="bg-white rounded-[28px] border border-[#E4E6EF] p-5">
                <p className="text-sm font-semibold text-[#1A1A2E] mb-2">我是这家公司的代表</p>
                <p className="text-xs text-[#9CA3AF] mb-3">免费入驻，完整展示公司信息</p>
                <Link href="/user" className="block text-center w-full py-2.5 bg-[#FF6B35] hover:bg-[#e8551a] text-white font-semibold rounded-xl transition text-sm">
                  入驻黄页 →
                </Link>
              </div>
            )}

            {/* Related */}
            {related.length > 0 && (
              <div className="bg-white rounded-[28px] border border-[#E4E6EF] p-5">
                <h3 className="font-semibold text-[#1A1A2E] mb-4">同类供应商</h3>
                <div className="space-y-4">
                  {related.map((b: any) => (
                    <Link key={b.id} href={`/businesses/${b.id}`} className="group flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-lg shrink-0">
                        🏢
                      </div>
                      <div>
                        <p className="font-medium text-[#1A1A2E] text-sm group-hover:text-[#FF6B35] transition line-clamp-1">
                          {b.company_name}
                        </p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{b.province} {b.city}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                {allBiz.length > related.length + 1 && (
                  <Link href="/businesses" className="mt-4 block text-center text-xs text-[#FF6B35] hover:underline">
                    查看全部供应商 →
                  </Link>
                )}
              </div>
            )}
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
