import Link from 'next/link';
import { PublicCategory } from '@/lib/public-data';

type CategoryShowcaseProps = {
  categories: PublicCategory[];
  stats?: { articles: number; businesses: number };
};

export function CategoryShowcase({ categories, stats }: CategoryShowcaseProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      {/* ── Stats bar ─────────────────────────────── */}
      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: '精选文章', value: stats.articles, icon: '📰', color: '#FF6B35' },
            { label: '注册用户', value: '2,400+', icon: '👥', color: '#0A84FF' },
            { label: '入驻供应商', value: stats.businesses, icon: '🏢', color: '#34C759' },
          ].map((item) => (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-2xl bg-white border border-[#E4E6EF] p-5 text-center"
            >
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5 -translate-y-1/2 translate-x-1/4"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-2xl font-bold text-[#1A1A2E]" style={{ color: item.color }}>
                {item.value}
              </div>
              <div className="text-xs text-[#9CA3AF] mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Category cards ───────────────────────── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FF6B35]">Explore</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#1A1A2E]">探索内容分类</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/articles?category=${cat.name}`}
            className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{
              background: `linear-gradient(135deg, ${cat.color}dd, ${cat.color}88)`,
            }}
          >
            {/* Decorative circle */}
            <div
              className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20"
              style={{ backgroundColor: 'white' }}
            />
            <div className="relative z-10">
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold text-white text-base">{cat.name}</h3>
              <p className="mt-1 text-white/70 text-xs">探索更多 →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
