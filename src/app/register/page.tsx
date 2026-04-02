'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname } },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
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
            <h1 className="text-2xl font-bold text-[#1A1A2E]">注册账号</h1>
            <p className="text-sm text-[#9CA3AF] mt-1">加入摩托圈大家庭</p>
          </div>
          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
              注册成功！请前往邮箱查收验证邮件，完成验证后即可登录。
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">昵称</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="选择一个昵称"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#E4E6EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A84FF] focus:border-transparent"
                />
              </div>
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
                  placeholder="至少6位"
                  required
                  minLength={6}
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
                {loading ? '注册中...' : '立即注册'}
              </button>
            </form>
          )}
          <p className="text-center text-sm text-[#9CA3AF] mt-6">
            已有账号？{' '}
            <Link href="/login" className="text-[#0A84FF] font-medium hover:underline">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
