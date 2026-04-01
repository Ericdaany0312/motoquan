'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getCategoriesAPI,
  getSourcesAPI,
  getArticleByIdAPI,
  saveArticleAPI,
  updateArticleAPI,
} from '@/lib/admin-store';

interface Props {
  articleId?: string;
}

export default function ArticleForm({ articleId }: Props) {
  const router = useRouter();
  const isEdit = !!articleId;
  const [categories, setCategories] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '新车发布',
    tags: '',
    summary: '',
    content: '',
    coverImage: '',
    status: 'draft' as 'draft' | 'published',
    featured: false,
    author: '管理员',
    readMinutes: 5,
    sourceId: '',
    originalUrl: '',
  });
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function init() {
      const [cats, srcs] = await Promise.all([getCategoriesAPI(), getSourcesAPI()]);
      setCategories(cats);
      setSources(srcs);
      if (articleId) {
        const existing = await getArticleByIdAPI(articleId);
        if (existing) {
          setForm({
            title: existing.title,
            slug: existing.slug,
            category: existing.category,
            tags: (existing.tags || []).join('、'),
            summary: existing.summary,
            content: existing.content,
            coverImage: existing.coverImage || '',
            status: existing.status,
            featured: existing.featured || false,
            author: existing.author,
            readMinutes: existing.readMinutes || 5,
            sourceId: (existing as any).sourceId || '',
            originalUrl: (existing as any).originalUrl || '',
          });
          setSlugManuallyEdited(true);
        }
      }
    }
    init();
  }, [articleId]);

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title }));
    if (!slugManuallyEdited) {
      setForm((f) => ({ ...f, slug: slugify(title) }));
    }
  };

  const handleSlugChange = (slug: string) => {
    setSlugManuallyEdited(true);
    setForm((f) => ({ ...f, slug: slugify(slug) }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = '请输入标题';
    if (!form.slug.trim()) errs.slug = '请输入slug';
    if (!form.summary.trim()) errs.summary = '请输入摘要';
    if (!form.content.trim()) errs.content = '请输入正文内容';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      const data = {
        ...form,
        slug: form.slug || slugify(form.title),
        tags: form.tags.split(/[,，、]/).map((t) => t.trim()).filter(Boolean),
        publishedAt: new Date().toISOString().slice(0, 10),
        metrics: { views: '0', comments: 0 },
      };
      if (isEdit) {
        await updateArticleAPI(articleId!, data);
      } else {
        await saveArticleAPI(data);
      }
      router.push('/admin/articles');
    } catch (err) {
      alert('保存失败：' + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${
      errors[field] ? 'border-red-400' : 'border-line'
    }`;

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/articles" className="text-sm text-primary hover:underline mb-3 inline-flex items-center gap-1">
          ← 返回文章列表
        </Link>
        <h1 className="text-2xl font-bold text-heading">{isEdit ? '编辑文章' : '写新文章'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main fields */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl shadow-card p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">文章标题 *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="输入文章标题"
                className={inputClass('title')}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">Slug（URL别名）</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="auto-generated-from-title"
                className={inputClass('slug')}
              />
              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
              <p className="text-xs text-body mt-1">motoquan.com/articles/<strong>{form.slug || 'slug'}</strong></p>
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">摘要 *</label>
              <textarea
                value={form.summary}
                onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                placeholder="输入文章摘要，用于列表页展示"
                rows={3}
                className={inputClass('summary')}
              />
              {errors.summary && <p className="text-red-500 text-xs mt-1">{errors.summary}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">正文内容 *（支持 Markdown）</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="输入文章正文内容，支持 Markdown 格式..."
                rows={15}
                className={`${inputClass('content')} font-mono text-sm leading-relaxed`}
              />
              {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
            </div>
          </div>
        </div>

        {/* Sidebar fields */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow-card p-6 space-y-5">
            <h3 className="font-bold text-heading">发布设置</h3>

            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">分类</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">文章来源</label>
              <select
                value={form.sourceId}
                onChange={(e) => setForm((f) => ({ ...f, sourceId: e.target.value }))}
                className="w-full px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">无 / 原创</option>
                {sources.map((s) => (
                  <option key={s.id} value={s.id}>{s.source_name_cn} ({s.country})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">原文链接</label>
              <input
                type="url"
                value={form.originalUrl}
                onChange={(e) => setForm((f) => ({ ...f, originalUrl: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">标签（逗号分隔）</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                placeholder="本田, 维修, 发动机"
                className="w-full px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">封面图片URL</label>
              <input
                type="text"
                value={form.coverImage}
                onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {form.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.coverImage} alt="预览" className="mt-2 w-full h-32 object-cover rounded-xl" onError={(e) => (e.currentTarget.style.display = 'none')} />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">作者</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                className="w-full px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">阅读时长（分钟）</label>
              <input
                type="number"
                value={form.readMinutes}
                onChange={(e) => setForm((f) => ({ ...f, readMinutes: parseInt(e.target.value) || 5 }))}
                min={1}
                max={60}
                className="w-full px-4 py-2.5 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor="featured" className="text-sm font-medium text-heading">设为精选文章</label>
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-3">发布状态</label>
              <div className="flex gap-3">
                {(['draft', 'published'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, status: s }))}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition ${
                      form.status === s
                        ? s === 'published'
                          ? 'bg-green-500 text-white border-green-500'
                          : 'bg-gray-800 text-white border-gray-800'
                        : 'border-line text-body hover:border-primary/30'
                    }`}
                  >
                    {s === 'published' ? '✅ 发布' : '📋 草稿'}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition disabled:opacity-50"
            >
              {saving ? '保存中...' : isEdit ? '保存修改' : '创建文章'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u4e00-\u9fa5]/g, (c) => c.charCodeAt(0).toString(36))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
