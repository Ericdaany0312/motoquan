'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getAuthStatus, login, logout } from '@/lib/admin-store';

const navItems = [
  { href: '/admin', label: '数据看板', icon: '📊' },
  { href: '/admin/articles', label: '文章管理', icon: '📝' },
  { href: '/admin/categories', label: '分类管理', icon: '🏷️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    setAuthenticated(getAuthStatus());
  }, []);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-card p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🏍️</div>
            <h1 className="text-xl font-bold text-heading">摩托圈管理后台</h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (login(loginForm.email, loginForm.password)) {
                setAuthenticated(true);
                setLoginError(false);
              } else {
                setLoginError(true);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-body mb-1.5">管理员邮箱</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="admin@motoquan.com"
                className="w-full px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-body mb-1.5">密码</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="motoquan2026"
                className="w-full px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm text-center">邮箱或密码错误</p>
            )}
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-line flex flex-col">
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
            onClick={() => { logout(); setAuthenticated(false); }}
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
