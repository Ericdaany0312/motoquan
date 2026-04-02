'use client';
import { useState, useEffect } from 'react';

interface Business {
  id: string;
  company_name: string;
  contact_person: string;
  phone: string;
  wechat: string;
  email: string;
  province: string;
  city: string;
  business_scope: string;
  product_categories: string[];
  description: string;
  status: string;
  level: string;
  submitted_at: string;
  reviewed_at: string | null;
  reviewer_notes: string | null;
  submitter?: { nickname: string; company: string };
}

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState<Business | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/businesses?status=${filterStatus}`);
      const data = await res.json();
      setBusinesses(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filterStatus]);

  const handleReview = async (id: string, status: 'approved' | 'rejected') => {
    await fetch('/api/admin/businesses', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, reviewer_notes: reviewNotes }),
    });
    setSelected(null);
    setReviewNotes('');
    load();
  };

  const statusBadge = (s: string) => {
    const map: Record<string, { label: string; cls: string }> = {
      pending: { label: '待审核', cls: 'bg-orange-50 text-orange-600' },
      approved: { label: '已通过', cls: 'bg-green-50 text-green-700' },
      rejected: { label: '已拒绝', cls: 'bg-red-50 text-red-600' },
    };
    const t = map[s] || { label: s, cls: 'bg-gray-50 text-gray-600' };
    return <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${t.cls}`}>{t.label}</span>;
  };

  const counts = {
    all: businesses.length,
    pending: businesses.filter((b) => b.status === 'pending').length,
    approved: businesses.filter((b) => b.status === 'approved').length,
    rejected: businesses.filter((b) => b.status === 'rejected').length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading">商务信息管理</h1>
        <p className="text-body mt-1">供应商入驻登记审核</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`rounded-2xl border p-5 text-left transition ${
              filterStatus === s
                ? 'bg-primary text-white border-primary'
                : 'bg-white border-line hover:bg-gray-50'
            }`}
          >
            <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${filterStatus === s ? 'text-white/70' : 'text-body'}`}>
              {s === 'all' ? '全部' : s === 'pending' ? '待审核' : s === 'approved' ? '已通过' : '已拒绝'}
            </p>
            <p className={`text-3xl font-bold ${filterStatus === s ? 'text-white' : 'text-heading'}`}>
              {counts[s]}
            </p>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-body">加载中...</div>
        ) : businesses.length === 0 ? (
          <div className="text-center py-16 text-body">
            <div className="text-4xl mb-3">🏢</div>
            <p>暂无商务登记信息</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-line bg-gray-50">
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">公司名称</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">联系人</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">地区</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">主营业务</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">状态</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">提交时间</th>
                <th className="text-right px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">操作</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((b) => (
                <tr key={b.id} className="border-b border-line last:border-0 hover:bg-gray-50 transition">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-heading">{b.company_name}</div>
                    {b.submitter?.company && (
                      <div className="text-xs text-body mt-0.5">来自：{b.submitter.company}</div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-body">
                    <div>{b.contact_person}</div>
                    <div className="text-xs text-[#9CA3AF]">{b.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-body">{b.province} {b.city}</td>
                  <td className="px-5 py-4 text-sm text-body max-w-xs truncate">{b.business_scope}</td>
                  <td className="px-5 py-4">{statusBadge(b.status)}</td>
                  <td className="px-5 py-4 text-sm text-body">{b.submitted_at?.slice(0, 10)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelected(b)}
                        className="px-3 py-1.5 text-sm text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition"
                      >
                        详情
                      </button>
                      {b.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleReview(b.id, 'approved')}
                            className="px-3 py-1.5 text-sm text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition"
                          >
                            通过
                          </button>
                          <button
                            onClick={() => handleReview(b.id, 'rejected')}
                            className="px-3 py-1.5 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition"
                          >
                            拒绝
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[28px] p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-heading">商务信息详情</h2>
              <button onClick={() => setSelected(null)} className="text-2xl text-body hover:text-heading">×</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-body">公司名称</span><p className="font-semibold text-heading mt-0.5">{selected.company_name}</p></div>
                <div><span className="text-body">联系人</span><p className="font-semibold text-heading mt-0.5">{selected.contact_person}</p></div>
                <div><span className="text-body">手机</span><p className="font-semibold text-heading mt-0.5">{selected.phone}</p></div>
                <div><span className="text-body">微信</span><p className="font-semibold text-heading mt-0.5">{selected.wechat || '—'}</p></div>
                <div><span className="text-body">邮箱</span><p className="font-semibold text-heading mt-0.5">{selected.email || '—'}</p></div>
                <div><span className="text-body">地区</span><p className="font-semibold text-heading mt-0.5">{selected.province} {selected.city}</p></div>
              </div>
              <div><span className="text-body">主营业务</span><p className="font-semibold text-heading mt-0.5">{selected.business_scope}</p></div>
              <div><span className="text-body">产品分类</span><p className="font-semibold text-heading mt-0.5 flex flex-wrap gap-1">
                {(selected.product_categories || []).map((c) => (
                  <span key={c} className="bg-gray-100 px-2 py-0.5 rounded text-xs">{c}</span>
                ))}
              </p></div>
              <div><span className="text-body">公司简介</span><p className="font-semibold text-heading mt-0.5 leading-relaxed">{selected.description || '—'}</p></div>
              <div><span className="text-body">审核备注</span>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="填写审核备注..."
                  className="mt-1 w-full px-3 py-2 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { handleReview(selected.id, 'approved'); }} className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition">✅ 通过</button>
              <button onClick={() => { handleReview(selected.id, 'rejected'); }} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition">❌ 拒绝</button>
              <button onClick={() => setSelected(null)} className="px-6 py-2.5 border border-line rounded-xl font-medium text-body hover:bg-gray-50 transition">取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
