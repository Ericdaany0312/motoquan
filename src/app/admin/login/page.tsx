'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = 'admin@motoquan.com';
const ADMIN_PASSWORD = 'motoquan2026';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('motoquan_admin_auth', 'true');
      router.push('/admin');
    } else {
      setError('用户名或密码错误');
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-card p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🏍️</div>
            <h1 className="text-xl font-bold text-heading">摩托圈管理后台</h1>
            <p className="text-sm text-body mt-1">请登录后继续操作</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">邮箱</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-line bg-white text-heading text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder={ADMIN_EMAIL}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-line bg-white text-heading text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="输入密码"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition text-sm"
            >
              登录
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
