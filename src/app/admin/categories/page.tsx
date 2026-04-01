'use client';

import { useState, useEffect } from 'react';
import { getCategories, saveCategory, updateCategory, deleteCategory, Category } from '@/lib/admin-store';

const presetColors = ['#0A84FF', '#FF6B35', '#34C759', '#AF52DE', '#FF9500', '#FF2D55', '#5856D6', '#00C7BE', '#FF3B30', '#AC8E68'];
const presetIcons = ['🏍️', '📰', '🔧', '⚙️', '🛢️', '🔥', '💨', '🏁', '🚗', '🛵', '⛽', '🔩', '🚙', '🏎️', '🛻', '🛣️'];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', color: '#0A84FF', icon: '🏍️' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const load = () => setCategories(getCategories());
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditingId(null); setForm({ name: '', slug: '', color: '#0A84FF', icon: '🏍️' }); setErrors({}); setShowModal(true); };
  const openEdit = (cat: Category) => {
    setEditingId(cat.id);
    setForm({ name: cat.name, slug: cat.slug, color: cat.color, icon: cat.icon });
    setErrors({});
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = '请输入分类名称';
    if (!form.slug.trim()) errs.slug = '请输入slug';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) {
      updateCategory(editingId, form);
    } else {
      saveCategory(form);
    }
    setShowModal(false);
    load();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`确认删除分类「${name}」？`)) {
      deleteCategory(id);
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-heading">分类管理</h1>
          <p className="text-body mt-1">管理平台内容分类体系</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition"
        >
          <span>➕</span> 添加分类
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-line bg-gray-50">
              <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">分类</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">Slug</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-body uppercase tracking-wide">操作</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-line last:border-0 hover:bg-gray-50 transition">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                      style={{ backgroundColor: cat.color + '20' }}
                    >
                      {cat.icon}
                    </span>
                    <span className="font-medium text-heading">{cat.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">{cat.slug}</code>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(cat)}
                      className="px-3 py-1.5 text-sm text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-float w-full max-w-md">
            <div className="px-6 py-5 border-b border-line">
              <h3 className="font-bold text-heading text-lg">{editingId ? '编辑分类' : '添加分类'}</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-heading mb-1.5">分类名称 *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="例如：新车发布"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.name ? 'border-red-400' : 'border-line'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-heading mb-1.5">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="auto-generated"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.slug ? 'border-red-400' : 'border-line'}`}
                />
                <p className="text-xs text-body mt-1">URL中使用，如 /articles?category=<strong>{form.slug || 'slug'}</strong></p>
              </div>
              <div>
                <label className="block text-sm font-medium text-heading mb-1.5">图标</label>
                <div className="flex flex-wrap gap-2">
                  {presetIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setForm({ ...form, icon })}
                      className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center border-2 transition ${
                        form.icon === icon ? 'border-primary bg-primary/10' : 'border-line hover:border-primary/40'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-heading mb-1.5">颜色</label>
                <div className="flex flex-wrap gap-2">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm({ ...form, color })}
                      className={`w-9 h-9 rounded-full border-2 transition ${
                        form.color === color ? 'border-heading scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-9 h-9 rounded cursor-pointer border-0"
                  />
                  <span className="text-sm text-body">自定义颜色</span>
                </div>
              </div>
              {/* Preview */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-body mb-2">预览</p>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: form.color }}
                >
                  {form.icon} {form.name || '分类名称'}
                </span>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-line text-body rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition"
                >
                  {editingId ? '保存' : '添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
