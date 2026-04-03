'use client';

import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: '/admin', label: '数据看板', icon: '📊' },
    { href: '/admin/reviews', label: '内容审核', icon: '✅' },
    { href: '/admin/articles', label: '文章管理', icon: '📝' },
    { href: '/admin/categories', label: '分类管理', icon: '🏷️' },
    { href: '/admin/users', label: '用户管理', icon: '👥' },
    { href: '/admin/businesses', label: '商务信息', icon: '🏢' },
  ];

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-line flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="px-5 py-6 border-b border-line">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏍️</span>
            <span className="font-bold text-heading text-lg">摩托圈</span>
          </Link>
          <p className="text-xs text-body mt-1">管理后台</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  active
                    ? 'bg-primary text-white'
                    : 'text-body hover:bg-gray-100 hover:text-heading'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-line">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-body hover:bg-gray-100 transition"
          >
            <span>🌐</span>
            返回前台
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
