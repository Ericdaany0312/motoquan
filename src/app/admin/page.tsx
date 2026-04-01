'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getArticlesAPI, getCategoriesAPI } from '@/lib/admin-store';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ articles: 0, categories: 0, published: 0, drafts: 0 });

  useEffect(() => {
    async function load() {
      const [articles, categories] = await Promise.all([getArticlesAPI(), getCategoriesAPI()]);
      setStats({
        articles: articles.length,
        categories: categories.length,
        published: articles.filter((a) => a.status === 'published').length,
        drafts: articles.filter((a) => a.status === 'draft').length,
      });
    }
    load();
  }, []);

  const cards = [
    { label: '文章总数', value: stats.articles, icon: '📝', color: 'bg-blue-50 text-blue-600', href: '/admin/articles' },
    { label: '已发布', value: stats.published, icon: '✅', color: 'bg-green-50 text-green-600', href: '/admin/articles' },
    { label: '草稿', value: stats.drafts, icon: '📋', color: 'bg-orange-50 text-orange-600', href: '/admin/articles' },
    { label: '分类数', value: stats.categories, icon: '🏷️', color: 'bg-purple-50 text-purple-600', href: '/admin/categories' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading">数据看板</h1>
        <p className="text-body mt-1">概览平台内容运营状态</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="block">
            <div className={`${card.color} rounded-2xl p-5 hover:opacity-90 transition`}>
              <div className="text-2xl mb-3">{card.icon}</div>
              <div className="text-3xl font-bold mb-1">{card.value}</div>
              <div className="text-sm opacity-80">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-bold text-heading mb-4">快捷操作</h2>
          <div className="space-y-3">
            <Link
              href="/admin/articles/new"
              className="flex items-center gap-3 p-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition"
            >
              <span className="text-xl">✏️</span>
              <div>
                <div className="font-medium">写新文章</div>
                <div className="text-sm opacity-80">创建一篇新的资讯内容</div>
              </div>
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center gap-3 p-4 bg-secondarySoft text-secondary border border-secondary/20 rounded-xl hover:opacity-80 transition"
            >
              <span className="text-xl">🏷️</span>
              <div>
                <div className="font-medium">管理分类</div>
                <div className="text-sm opacity-80">添加或编辑内容分类</div>
              </div>
            </Link>
            <Link
              href="/admin/articles"
              className="flex items-center gap-3 p-4 bg-gray-50 text-heading border border-line rounded-xl hover:bg-gray-100 transition"
            >
              <span className="text-xl">📋</span>
              <div>
                <div className="font-medium">文章列表</div>
                <div className="text-sm text-body">查看所有已发布和草稿</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-bold text-heading mb-4">平台信息</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-line">
              <span className="text-body text-sm">平台名称</span>
              <span className="font-medium text-heading">摩托圈 motoquan.com</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-line">
              <span className="text-body text-sm">版本</span>
              <span className="font-medium text-heading">v1.0.0 MVP</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-line">
              <span className="text-body text-sm">技术栈</span>
              <span className="font-medium text-heading">Next.js 14 + localStorage</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-body text-sm">数据存储</span>
              <span className="font-medium text-heading">浏览器本地 (开发版)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
