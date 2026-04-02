'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getArticlesAPI, reviewArticleAPI, Article } from '@/lib/admin-store';

function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString('zh-CN') : '—';
}

export default function AdminReviewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Article | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [tab, setTab] = useState<'pending' | 'published' | 'rejected'>('pending');
  const [actionLoading, setActionLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getArticlesAPI();
      setArticles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = articles.filter((a) => {
    if (tab === 'pending') return a.status === 'draft';
    if (tab === 'published') return a.status === 'published';
    if (tab === 'rejected') return a.status === 'draft' && !!a.reviewNotes;
    return true;
  });

  const pendingCount = articles.filter((a) => a.status === 'draft').length;
  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const rejectedCount = articles.filter((a) => a.status === 'draft' && !!a.reviewNotes).length;

  const handleAction = async (article: Article, action: 'approve' | 'reject') => {
    setActionLoading(true);
    try {
      await reviewArticleAPI(article.id, action, reviewNotes);
      setSelected(null);
      setReviewNotes('');
      load();
    } catch (e) {
      alert('操作失败：' + (e as Error).message);
    } finally {
      setActionLoading(false);
    }
  };

  const openReview = (article: Article) => {
    setSelected(article);
    setReviewNotes(article.reviewNotes || '');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading">内容审核</h1>
        <p className="text-body mt-1">审核文章内容，通过后发布到前台</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {([
          { key: 'pending', label: '待审核', count: pendingCount, color: 'bg-orange-50 text-orange-600' },
          { key: 'published', label: '已发布', count: publishedCount, color: 'bg-green-50 text-green-600' },
          { key: 'rejected', label: '已驳回', count: rejectedCount, color: 'bg-red-50 text-red-600' },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
              tab === t.key
                ? 'bg-primary text-white'
                : `${t.color} hover:opacity-80`
            }`}
          >
            {t.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              tab === t.key ? 'bg-white/20 text-white' : t.color.replace('bg-', 'bg-opacity-30 ')
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Article list */}
      <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-body">加载中...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-body">
            <div className="text-4xl mb-3">✅</div>
            <p>{tab === 'pending' ? '暂无待审核文章' : tab === 'published' ? '暂无已发布文章' : '暂无已驳回文章'}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-line bg-gray-50">
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">封面</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">标题</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">分类</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">状态</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">审核备注</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">创建时间</th>
                <th className="text-right px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((article) => (
                <tr key={article.id} className="border-b border-line last:border-0 hover:bg-gray-50 transition">
                  <td className="px-5 py-4">
                    {article.coverImage ? (
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden">
                        <Image src={article.coverImage} alt={article.title} fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className="w-14 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">无图</div>
                    )}
                  </td>
                  <td className="px-5 py-4 max-w-xs">
                    <p className="font-medium text-heading text-sm line-clamp-1">{article.title}</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">{article.author} · {article.readMinutes}分钟</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-body">{article.category}</td>
                  <td className="px-5 py-4">
                    {article.status === 'published' ? (
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">已发布</span>
                    ) : article.reviewNotes ? (
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">已驳回</span>
                    ) : (
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">待审核</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-body max-w-[200px]">
                    {article.reviewNotes ? (
                      <span className="line-clamp-2">{article.reviewNotes}</span>
                    ) : <span className="text-[#9CA3AF]">—</span>}
                  </td>
                  <td className="px-5 py-4 text-sm text-body">{formatDate(article.publishedAt)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openReview(article)}
                        className="px-3 py-1.5 text-sm text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition"
                      >
                        {article.status === 'published' ? '撤回' : '审核'}
                      </button>
                      <Link
                        href={`/articles/${article.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 text-sm text-[#9CA3AF] border border-[#E4E6EF] rounded-lg hover:bg-gray-50 transition"
                      >
                        预览
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Review Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[28px] p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-heading">审核文章</h2>
                <p className="text-sm text-[#9CA3AF] mt-1">{selected.category} · {selected.author}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-2xl text-body hover:text-heading">×</button>
            </div>

            {/* Article preview */}
            <div className="bg-[#F5F6FA] rounded-2xl p-5 mb-6">
              {selected.coverImage && (
                <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4">
                  <Image src={selected.coverImage} alt={selected.title} fill className="object-cover" unoptimized />
                </div>
              )}
              <h3 className="font-bold text-heading text-lg">{selected.title}</h3>
              <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">{selected.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(selected.tags || []).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-white rounded-full text-xs text-[#6B7280] border border-[#E4E6EF]">{tag}</span>
                ))}
              </div>
            </div>

            {/* Review notes */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-heading mb-2">审核备注（选填）</label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="填写审核意见，驳回时建议填写原因..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-[#E4E6EF] text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => handleAction(selected, 'approve')}
                disabled={actionLoading}
                className="flex-1 py-3 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-semibold rounded-xl transition"
              >
                ✅ 通过发布
              </button>
              <button
                onClick={() => handleAction(selected, 'reject')}
                disabled={actionLoading}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-xl transition"
              >
                ❌ 驳回
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-6 py-3 border border-[#E4E6EF] rounded-xl font-medium text-body hover:bg-gray-50 transition"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
