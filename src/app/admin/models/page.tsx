'use client';

import { useState, useEffect } from 'react';

interface Model {
  id: string;
  brand: string;
  series?: string;
  model_name: string;
  slug?: string;
  year?: number;
  bike_type?: string;
  engine_cc?: number;
  power_hp?: number;
  torque_nm?: number;
  seat_height_mm?: number;
  weight_kg?: number;
  fuel_capacity_l?: number;
  msrp?: number;
  main_image?: string;
  is_new_model?: boolean;
}

interface Brand {
  id: string;
  brand_name: string;
  slug: string;
  country?: string;
}

export default function AdminModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editModel, setEditModel] = useState<Model | null>(null);
  const [filterBrand, setFilterBrand] = useState('all');

  const load = async () => {
    setLoading(true);
    try {
      const [modelsRes, brandsRes] = await Promise.all([
        fetch('/api/models?limit=100'),
        fetch('/api/brands'),
      ]);
      const modelsData = await modelsRes.json();
      const brandsData = await brandsRes.json();
      setModels((modelsData.models || []).slice(0, 100));
      setBrands(brandsData.brands || []);
    } catch (e) {
      console.error('Failed to load:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('确认删除这个车型？')) return;
    try {
      const res = await fetch(`/api/models/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      load();
    } catch (e) {
      alert('删除失败：' + (e as Error).message);
    }
  };

  const filtered = filterBrand === 'all'
    ? models
    : models.filter((m) => m.brand === filterBrand);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-heading">车型管理</h1>
          <p className="text-body mt-1">管理车型库数据，共 {models.length} 个车型</p>
        </div>
        <button
          onClick={() => { setEditModel(null); setShowForm(true); }}
          className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition"
        >
          + 新增车型
        </button>
      </div>

      {/* Filter */}
      <div className="mb-5 flex items-center gap-3 flex-wrap">
        <span className="text-sm text-body">品牌筛选</span>
        <button
          onClick={() => setFilterBrand('all')}
          className={`px-3 py-1.5 rounded-full text-sm transition ${filterBrand === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-body hover:bg-gray-200'}`}
        >
          全部
        </button>
        {brands.map((b) => (
          <button
            key={b.id}
            onClick={() => setFilterBrand(b.brand_name)}
            className={`px-3 py-1.5 rounded-full text-sm transition ${filterBrand === b.brand_name ? 'bg-primary text-white' : 'bg-gray-100 text-body hover:bg-gray-200'}`}
          >
            {b.brand_name}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-body">加载中...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-body">暂无车型数据</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-line bg-gray-50">
                <th className="text-left px-5 py-3 text-sm font-semibold text-heading">车型</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-heading">品牌</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-heading">类型</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-heading">排量</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-heading">功率</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-heading">状态</th>
                <th className="text-right px-5 py-3 text-sm font-semibold text-heading">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-line last:border-0 hover:bg-gray-50/50">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-heading">{m.model_name}</div>
                    {m.slug && <div className="text-xs text-muted mt-0.5">{m.slug}</div>}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-body">{m.brand}</td>
                  <td className="px-5 py-3.5 text-sm text-body">{m.bike_type || '-'}</td>
                  <td className="px-5 py-3.5 text-sm text-body">{m.engine_cc ? `${m.engine_cc}cc` : '-'}</td>
                  <td className="px-5 py-3.5 text-sm text-body">{m.power_hp ? `${m.power_hp}hp` : '-'}</td>
                  <td className="px-5 py-3-5">
                    {m.is_new_model && (
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">新车</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setEditModel(m); setShowForm(true); }}
                        className="px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <ModelForm
          model={editModel}
          brands={brands}
          onClose={() => setShowForm(false)}
          onSave={() => { setShowForm(false); load(); }}
        />
      )}
    </div>
  );
}

function ModelForm({
  model,
  brands,
  onClose,
  onSave,
}: {
  model: Model | null;
  brands: Brand[];
  onClose: () => void;
  onSave: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    brand: model?.brand || '',
    model_name: model?.model_name || '',
    slug: model?.slug || '',
    bike_type: model?.bike_type || '',
    engine_cc: model?.engine_cc || '',
    power_hp: model?.power_hp || '',
    torque_nm: model?.torque_nm || '',
    weight_kg: model?.weight_kg || '',
    seat_height_mm: model?.seat_height_mm || '',
    msrp: model?.msrp || '',
    main_image: model?.main_image || '',
    is_new_model: model?.is_new_model || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        engine_cc: form.engine_cc ? parseInt(form.engine_cc as string) : null,
        power_hp: form.power_hp ? parseInt(form.power_hp as string) : null,
        torque_nm: form.torque_nm ? parseFloat(form.torque_nm as string) : null,
        weight_kg: form.weight_kg ? parseFloat(form.weight_kg as string) : null,
        seat_height_mm: form.seat_height_mm ? parseInt(form.seat_height_mm as string) : null,
        msrp: form.msrp ? parseFloat(form.msrp as string) : null,
      };
      if (model) {
        await fetch(`/api/models/${model.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/models', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      onSave();
    } catch (e) {
      alert('保存失败：' + (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="flex items-center justify-between p-5 border-b border-line">
          <h2 className="text-lg font-bold text-heading">{model ? '编辑车型' : '新增车型'}</h2>
          <button onClick={onClose} className="text-2xl text-body hover:text-heading">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">品牌 *</label>
              <select
                required
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">选择品牌</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.brand_name}>{b.brand_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">车型名称 *</label>
              <input
                required
                value={form.model_name}
                onChange={(e) => setForm({ ...form, model_name: e.target.value })}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="如：450SR"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">URL别名</label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="如：cfmoto-450sr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">车型类型</label>
              <select
                value={form.bike_type}
                onChange={(e) => setForm({ ...form, bike_type: e.target.value })}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">选择类型</option>
                {['仿赛','街车','ADV','巡航','踏板','复古','拉力'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">排量(cc)</label>
              <input
                type="number"
                value={form.engine_cc}
                onChange={(e) => setForm({ ...form, engine_cc: e.target.value })}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="450"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">功率(hp)</label>
              <input
                type="number"
                value={form.power_hp}
                onChange={(e) => setForm({ ...form, power_hp: e.target.value })}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="43"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">扭矩(Nm)</label>
              <input
                type="number"
                step="0.1"
                value={form.torque_nm}
                onChange={(e) => setForm({ ...form, torque_nm: e.target.value })}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">整备质量(kg)</label>
              <input
                type="number"
                step="0.1"
                value={form.weight_kg}
                onChange={(e) => setForm({ ...form, weight_kg: e.target.value })}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">座高(mm)</label>
              <input
                type="number"
                value={form.seat_height_mm}
                onChange={(e) => setForm({ ...form, seat_height_mm: e.target.value })}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">售价(万)</label>
              <input
                type="number"
                step="0.01"
                value={form.msrp}
                onChange={(e) => setForm({ ...form, msrp: e.target.value })}
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-heading mb-1.5">主图URL</label>
            <input
              value={form.main_image}
              onChange={(e) => setForm({ ...form, main_image: e.target.value })}
              className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="https://..."
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_new_model"
              checked={form.is_new_model}
              onChange={(e) => setForm({ ...form, is_new_model: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="is_new_model" className="text-sm text-heading">全新车型</label>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-line rounded-xl text-sm font-medium text-body hover:bg-gray-50 transition"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition disabled:opacity-60"
            >
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
