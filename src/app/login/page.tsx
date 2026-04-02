'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[28px] p-8 shadow-sm">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <img src="/motoquan-logo.png" alt="摩托圈" className="h-10 w-auto" />
            </Link>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">登录账号</h1>
            <p className="text-sm text-[#9CA3AF] mt-1">欢迎回到摩托圈</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">邮箱</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E4E6EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A84FF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E4E6EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A84FF] focus:border-transparent"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FF6B35] hover:bg-[#e8551a] disabled:opacity-50 text-white font-semibold rounded-full transition-colors"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>
          <p className="text-center text-sm text-[#9CA3AF] mt-6">
            还没有账号？{' '}
            <Link href="/register" className="text-[#0A84FF] font-medium hover:underline">
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
