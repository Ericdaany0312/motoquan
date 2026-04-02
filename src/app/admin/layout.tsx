'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login, logout } from '@/lib/admin-store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check auth on mount and on every render
    const authed = localStorage.getItem('motoquan_admin_auth') === 'motoquan_logged_in';
    setChecking(false);
    if (!authed) {
      // Show login inline
    }
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    if (login(email, password)) {
      router.refresh();
    } else {
      alert('邮箱或密码错误');
    }
  };

  const handleLogout = () => {
    logout();
    router.refresh();
  };

  const authed = typeof window !== 'undefined' && localStorage.getItem('motoquan_admin_auth') === 'motoquan_logged_in';

  if (checking) return null;

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🏍️</div>
            <h1 className="text-xl font-bold text-heading">摩托圈管理后台</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-body mb-1.5">管理员邮箱</label>
              <input
                name="email"
                type="email"
                placeholder="admin@motoquan.com"
                className="w-full px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-body mb-1.5">密码</label>
              <input
                name="password"
                type="password"
                placeholder="输入密码"
                className="w-full px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition"
            >
              登录
            </button>
          </form>
          <p className="text-center text-xs text-body mt-4">
            <Link href="/" className="text-primary hover:underline">← 返回前台</Link>
          </p>
        </div>
      </div>
    );
  }

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
        <div className="px-3 py-4 border-t border-line space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-body hover:bg-gray-100 transition"
          >
            <span>🌐</span>
            返回前台
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition"
          >
            <span>🚪</span>
            退出登录
          </button>
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
