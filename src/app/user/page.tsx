'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const CATEGORIES = ['新车发布', '行业资讯', '赛事活动', '维修教程', '配件选购', '改装方案'];

export default function UserCenterPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<'profile' | 'password' | 'biz'>('profile');

  // Profile fields
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('user');
  const [sourceFrom, setSourceFrom] = useState('');
  const [interestTags, setInterestTags] = useState<string[]>([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password fields
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Business registration
  const [bizTab, setBizTab] = useState(false);
  const [bizForm, setBizForm] = useState({
    company_name: '', contact_person: '', phone: '', wechat: '',
    email: '', province: '', city: '', business_scope: '', description: '',
  });
  const [bizLoading, setBizLoading] = useState(false);
  const [bizMsg, setBizMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load profile data
  useEffect(() => {
    if (!user) return;
    fetch(`/api/profiles/${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setNickname(data.nickname || '');
          setPhone(data.phone || '');
          setCompany(data.company || '');
          setRole(data.role || 'user');
          setSourceFrom(data.source_from || '');
          setInterestTags(data.interest_tags || []);
        }
      })
      .catch(() => {});
  }, [user]);

  const toggleTag = (tag: string) => {
    setInterestTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setProfileLoading(true);
    setProfileMsg(null);
    const res = await fetch(`/api/profiles/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, phone, company, role, source_from: sourceFrom, interest_tags: interestTags }),
    });
    const data = await res.json();
    if (data.error) {
      setProfileMsg({ type: 'error', text: '保存失败：' + data.error });
    } else {
      setProfileMsg({ type: 'success', text: '保存成功！' });
    }
    setProfileLoading(false);
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setPwdMsg({ type: 'error', text: '两次密码不一致' }); return; }
    if (newPassword.length < 6) { setPwdMsg({ type: 'error', text: '密码至少6位' }); return; }
    setPwdLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwdMsg(error ? { type: 'error', text: error.message } : { type: 'success', text: '密码修改成功！' });
    setNewPassword(''); setConfirmPassword('');
    setPwdLoading(false);
  };

  const submitBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bizForm.company_name || !bizForm.contact_person || !bizForm.phone) {
      setBizMsg({ type: 'error', text: '请填写必填项（公司名称、联系人、手机）' }); return;
    }
    setBizLoading(true);
    setBizMsg(null);
    const res = await fetch('/api/businesses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...bizForm, submitted_by: user?.id }),
    });
    const data = await res.json();
    if (data.error) {
      setBizMsg({ type: 'error', text: '提交失败：' + data.error });
    } else {
      setBizMsg({ type: 'success', text: '提交成功！我们会尽快审核您的商务信息。' });
      setBizForm({ company_name: '', contact_person: '', phone: '', wechat: '', email: '', province: '', city: '', business_scope: '', description: '' });
    }
    setBizLoading(false);
  };

  if (authLoading) return (
    <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center"><p className="text-body">加载中...</p></div>
  );

  if (!user) return (
    <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-lg text-heading mb-4">请先登录</p>
        <Link href="/login" className="px-6 py-3 bg-[#FF6B35] text-white rounded-full font-semibold hover:bg-[#e8551a] transition">前往登录</Link>
      </div>
    </div>
  );

  const meta = user.user_metadata || {};

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-2xl font-bold">
            {(nickname || meta.nickname || user.email || 'U')[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">{nickname || meta.nickname || '摩友'}</h1>
            <p className="text-sm text-[#9CA3AF]">{user.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['profile', 'password', 'biz'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t as any)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                tab === t ? 'bg-[#FF6B35] text-white' : 'bg-white text-[#6B7280] border border-[#E4E6EF] hover:bg-[#F5F6FA]'
              }`}>
              {t === 'profile' ? '👤 个人信息' : t === 'password' ? '🔑 修改密码' : '🏢 商务入驻'}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {tab === 'profile' && (
          <form onSubmit={saveProfile} className="bg-white rounded-[28px] border border-[#E4E6EF] p-6 sm:p-8 shadow-sm max-w-2xl">
            <h2 className="text-lg font-semibold text-[#1A1A2E] mb-6">编辑个人信息</h2>
            <div className="space-y-4">
              {[
                { label: '昵称', value: nickname, setter: setNickname, placeholder: '您的昵称' },
                { label: '手机', value: phone, setter: setPhone, placeholder: '手机号' },
                { label: '公司/单位（选填）', value: company, setter: setCompany, placeholder: '公司名称' },
                { label: '如何了解到平台（选填）', value: sourceFrom, setter: setSourceFrom, placeholder: '如：朋友推荐/搜索引擎/展会' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">{f.label}</label>
                  <input value={f.value} onChange={(e) => f.setter(e.target.value)} placeholder={f.placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-[#E4E6EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A84FF]" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-2">身份（选填）</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { v: 'user', l: '普通用户' },
                    { v: 'buyer', l: '采购商' },
                    { v: 'seller', l: '供应商/经销商' },
                  ].map((r) => (
                    <button key={r.v} type="button" onClick={() => setRole(r.v)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                        role === r.v ? 'bg-[#FF6B35] text-white border-[#FF6B35]' : 'border-[#E4E6EF] text-body hover:border-[#FF6B35]'
                      }`}>{r.l}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-2">感兴趣的栏目</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button key={cat} type="button" onClick={() => toggleTag(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                        interestTags.includes(cat) ? 'bg-[#FF6B35] text-white border-[#FF6B35]' : 'border-[#E4E6EF] text-body hover:border-[#FF6B35]'
                      }`}>{cat}</button>
                  ))}
                </div>
              </div>
            </div>
            {profileMsg && (
              <div className={`mt-4 px-4 py-3 rounded-xl text-sm ${profileMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                {profileMsg.text}
              </div>
            )}
            <button type="submit" disabled={profileLoading}
              className="mt-6 px-8 py-3 bg-[#FF6B35] hover:bg-[#e8551a] disabled:opacity-50 text-white font-semibold rounded-full transition">
              {profileLoading ? '保存中...' : '💾 保存信息'}
            </button>
          </form>
        )}

        {/* Password Tab */}
        {tab === 'password' && (
          <form onSubmit={changePassword} className="bg-white rounded-[28px] border border-[#E4E6EF] p-6 sm:p-8 shadow-sm max-w-lg">
            <h2 className="text-lg font-semibold text-[#1A1A2E] mb-6">修改密码</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">新密码</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="至少6位"
                  className="w-full px-4 py-3 rounded-xl border border-[#E4E6EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A84FF]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">确认新密码</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="再次输入"
                  className="w-full px-4 py-3 rounded-xl border border-[#E4E6EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A84FF]" />
              </div>
            </div>
            {pwdMsg && (
              <div className={`mt-4 px-4 py-3 rounded-xl text-sm ${pwdMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                {pwdMsg.text}
              </div>
            )}
            <button type="submit" disabled={pwdLoading}
              className="mt-6 px-8 py-3 bg-[#FF6B35] hover:bg-[#e8551a] disabled:opacity-50 text-white font-semibold rounded-full transition">
              {pwdLoading ? '修改中...' : '确认修改'}
            </button>
          </form>
        )}

        {/* Business Registration Tab */}
        {tab === 'biz' && (
          <form onSubmit={submitBusiness} className="bg-white rounded-[28px] border border-[#E4E6EF] p-6 sm:p-8 shadow-sm max-w-2xl">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[#1A1A2E]">商务入驻登记</h2>
              <p className="text-sm text-[#9CA3AF] mt-1">提交公司信息，我们将审核后展示在供应商黄页</p>
            </div>
            <div className="space-y-4">
              {[
                { label: '公司名称 *', key: 'company_name', placeholder: '请填写公司全称' },
                { label: '联系人 *', key: 'contact_person', placeholder: '联系人姓名' },
                { label: '手机 *', key: 'phone', placeholder: '手机号' },
                { label: '微信', key: 'wechat', placeholder: '微信号（选填）' },
                { label: '邮箱', key: 'email', placeholder: '邮箱（选填）' },
                { label: '所在省', key: 'province', placeholder: '如：广东省' },
                { label: '所在市', key: 'city', placeholder: '如：深圳市' },
                { label: '主营业务 *', key: 'business_scope', placeholder: '如：摩托车配件批发 / 维修服务' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">{f.label}</label>
                  <input value={bizForm[f.key as keyof typeof bizForm]} onChange={(e) => setBizForm({ ...bizForm, [f.key]: e.target.value })} placeholder={f.placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-[#E4E6EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A84FF]" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">公司简介</label>
                <textarea value={bizForm.description} onChange={(e) => setBizForm({ ...bizForm, description: e.target.value })} placeholder="公司介绍、产品优势、合作案例等..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#E4E6EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A84FF] resize-none" />
              </div>
            </div>
            {bizMsg && (
              <div className={`mt-4 px-4 py-3 rounded-xl text-sm ${bizMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                {bizMsg.text}
              </div>
            )}
            <button type="submit" disabled={bizLoading}
              className="mt-6 px-8 py-3 bg-[#FF6B35] hover:bg-[#e8551a] disabled:opacity-50 text-white font-semibold rounded-full transition">
              {bizLoading ? '提交中...' : '🏢 提交商务入驻'}
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
