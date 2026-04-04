'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/admin', label: '数据看板', icon: '📊' },
  { href: '/admin/reviews', label: '内容审核', icon: '✅' },
  { href: '/admin/articles', label: '文章管理', icon: '📝' },
  { href: '/admin/categories', label: '分类管理', icon: '🏷️' },
  { href: '/admin/users', label: '用户管理', icon: '👥' },
  { href: '/admin/businesses', label: '商务信息', icon: '🏢' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthed(true);
      return;
    }
    const isAuth = sessionStorage.getItem('motoquan_admin_auth') === 'true';
    if (!isAuth) {
      router.replace('/admin/login');
    } else {
      setAuthed(true);
    }
  }, [pathname, router]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA]">
        <div className="text-heading">验证中...</div>
      </div>
    );
  }

  // Login page: no sidebar, centered content only
  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    );
  }

  // Admin shell with sidebar
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-white border-r border-line flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="px-5 py-6 border-b border-line">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏍️</span>
            <span className="font-bold text-heading text-lg">摩托圈</span>
          </Link>
          <p className="text-xs text-body mt-1">管理后台</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
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
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
