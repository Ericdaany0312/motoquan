'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export function HomeCTA() {
  const { user } = useAuth();
  if (user) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FF6B35] mb-2">Join Us</p>
        <h2 className="text-2xl font-bold text-[#1A1A2E]">注册账号，解锁更多功能</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {[
          { icon: '❤️', title: '收藏同步', desc: '收藏感兴趣的文章和商家，多设备自动同步，不再丢失' },
          { icon: '💬', title: '参与讨论', desc: '在文章下留言，与从业者交流经验' },
          { icon: '🏢', title: '商家入驻', desc: '提交公司信息，在供应商黄页展示，被更多采购商看到' },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-2xl border border-[#E4E6EF] p-6 text-center hover:shadow-card transition">
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-[#1A1A2E] mb-2">{item.title}</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#FF6B35] hover:bg-[#e8551a] text-white font-semibold rounded-full transition"
        >
          立即注册，免费加入
        </Link>
        <p className="mt-3 text-xs text-[#9CA3AF]">
          已有账号？<Link href="/login" className="text-[#0A84FF] hover:underline">直接登录</Link>
        </p>
      </div>
    </section>
  );
}
