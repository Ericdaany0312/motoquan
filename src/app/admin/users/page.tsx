'use client';
import { useState, useEffect } from 'react';

interface Profile {
  id: string;
  nickname: string;
  phone: string;
  company: string;
  role: string;
  source_from: string;
  created_at: string;
  email: string;
}

const roleLabels: Record<string, { label: string; cls: string }> = {
  admin: { label: '管理员', cls: 'bg-red-50 text-red-600' },
  seller: { label: '供应商', cls: 'bg-purple-50 text-purple-600' },
  buyer: { label: '采购商', cls: 'bg-blue-50 text-blue-600' },
  user: { label: '普通用户', cls: 'bg-gray-50 text-gray-600' },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/profiles');
      if (!res.ok) throw new Error('无权限，请确认已登录后台');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUsers(data);
    } catch (e: any) {
      setError(e.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-heading">用户管理</h1>
          <p className="text-body mt-1">平台注册用户 · 共 {users.length} 人</p>
        </div>
        <button onClick={load} className="px-5 py-2.5 bg-white border border-line rounded-xl text-sm font-medium text-body hover:bg-gray-50 transition">
          🔄 刷新
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-line p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-body mb-2">全部用户</p>
          <p className="text-3xl font-bold text-heading">{users.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-line p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-body mb-2">供应商</p>
          <p className="text-3xl font-bold text-purple-600">{users.filter((u) => u.role === 'seller').length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-line p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-body mb-2">采购商</p>
          <p className="text-3xl font-bold text-blue-600">{users.filter((u) => u.role === 'buyer').length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-line p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-body mb-2">普通用户</p>
          <p className="text-3xl font-bold text-gray-600">{users.filter((u) => u.role === 'user').length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-body">加载中...</div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">
            <div className="text-4xl mb-3">⚠️</div>
            <p>{error}</p>
            <p className="text-sm text-body mt-2">用户数据需在 Supabase Dashboard → Authentication 中查看完整信息</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-body">
            <div className="text-4xl mb-3">👥</div>
            <p>暂无注册用户</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-line bg-gray-50">
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">用户</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">公司</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">角色</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">来源</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">注册时间</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const roleInfo = roleLabels[u.role] || roleLabels.user;
                return (
                  <tr key={u.id} className="border-b border-line last:border-0 hover:bg-gray-50 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] font-bold text-sm">
                          {(u.nickname || u.email || 'U')[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-heading text-sm">{u.nickname || '—'}</p>
                          <p className="text-xs text-[#9CA3AF]">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-body">{u.company || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${roleInfo.cls}`}>
                        {roleInfo.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-body">{u.source_from || '—'}</td>
                    <td className="px-5 py-4 text-sm text-body">{new Date(u.created_at).toLocaleDateString('zh-CN')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
