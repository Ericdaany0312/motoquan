'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getArticlesAPI, getCategoriesAPI, deleteArticleAPI, Article, Category } from '@/lib/admin-store';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const load = async () => {
    setLoading(true);
    try {
      const [arts, cats] = await Promise.all([getArticlesAPI(), getCategoriesAPI()]);
      setArticles(arts);
      setCategories(cats);
    } catch (e) {
      console.error('Failed to load:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // Reset to page 1 when filters/search change
  useEffect(() => { setPage(1); }, [filterStatus, filterCategory, search]);

  const filtered = articles.filter((a) => {
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    if (filterCategory !== 'all' && a.category !== filterCategory) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleDelete = async (id: string) => {
    if (!confirm('确认删除这篇文章？')) return;
    try {
      await deleteArticleAPI(id);
      load();
    } catch (e) {
      alert('删除失败：' + (e as Error).message);
    }
  };

  const statusBadge = (status: string) => (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
      status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
    }`}>
      {status === 'published' ? '已发布' : '草稿'}
    </span>
  );

  const categoryBadge = (catName: string) => {
    const cat = categories.find((c) => c.name === catName);
    return (
      <span
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white"
        style={{ backgroundColor: cat?.color || '#6B7280' }}
      >
        {cat?.icon} {catName}
      </span>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-heading">文章管理</h1>
          <p className="text-body mt-1">
            共 <span className="font-semibold text-primary">{filtered.length}</span> 篇
            {filtered.length !== articles.length && (
              <span className="text-xs ml-1">（筛选自全部 {articles.length} 篇）</span>
            )}
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition"
        >
          ✏️ 写新文章
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-card p-5 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="搜索文章标题..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-48 px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">全部状态</option>
            <option value="published">已发布</option>
            <option value="draft">草稿</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">全部分类</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value={10}>每页 10 条</option>
            <option value={25}>每页 25 条</option>
            <option value={100}>每页 100 条</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-body">加载中...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-body">
            <div className="text-4xl mb-3">📝</div>
            <p>暂无文章</p>
            <Link href="/admin/articles/new" className="text-primary hover:underline text-sm mt-2 inline-block">
              写第一篇 →
            </Link>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b border-line bg-gray-50">
                  <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">封面</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">标题</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">分类</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">状态</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">日期</th>
                  <th className="text-right px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">操作</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((article) => (
                  <tr key={article.id} className="border-b border-line last:border-0 hover:bg-gray-50 transition">
                    <td className="px-5 py-4">
                      {article.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={article.coverImage} alt={article.title} className="w-14 h-10 object-cover rounded-lg" />
                      ) : (
                        <div className="w-14 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">📷</div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-heading line-clamp-1">{article.title}</div>
                      <div className="text-xs text-body mt-0.5">{article.author} · {article.readMinutes}分钟阅读</div>
                    </td>
                    <td className="px-5 py-4">{categoryBadge(article.category)}</td>
                    <td className="px-5 py-4">{statusBadge(article.status)}</td>
                    <td className="px-5 py-4 text-sm text-body">{article.publishedAt?.slice(0, 10)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="px-3 py-1.5 text-sm text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition"
                        >
                          编辑
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="px-3 py-1.5 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-line bg-gray-50">
                <span className="text-sm text-body">
                  第 {safePage} / {totalPages} 页，共 {filtered.length} 篇
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(1)}
                    disabled={safePage === 1}
                    className="px-3 py-1.5 text-sm border border-line rounded-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    ««
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={safePage === 1}
                    className="px-3 py-1.5 text-sm border border-line rounded-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    «
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let p;
                    if (totalPages <= 5) {
                      p = i + 1;
                    } else if (safePage <= 3) {
                      p = i + 1;
                    } else if (safePage >= totalPages - 2) {
                      p = totalPages - 4 + i;
                    } else {
                      p = safePage - 2 + i;
                    }
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-1.5 text-sm border rounded-lg transition ${
                          p === safePage
                            ? 'bg-primary text-white border-primary'
                            : 'border-line hover:bg-white'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage === totalPages}
                    className="px-3 py-1.5 text-sm border border-line rounded-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    »
                  </button>
                  <button
                    onClick={() => setPage(totalPages)}
                    disabled={safePage === totalPages}
                    className="px-3 py-1.5 text-sm border border-line rounded-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    »»
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
