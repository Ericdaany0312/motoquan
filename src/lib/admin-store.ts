'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
  coverImage: string;
  status: 'draft' | 'published';
  featured: boolean;
  author: string;
  publishedAt: string;
  readMinutes: number;
  metrics: { views: string; comments: number };
  sourceId?: string;
  originalUrl?: string;
  reviewNotes?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  count?: number;
}

export interface Source {
  id: string;
  source_name: string;
  source_name_cn: string;
  source_type: string;
  country: string;
  language: string;
  domain: string;
  url: string;
  priority_level: string;
  status: string;
}

// Sources API
export async function getSourcesAPI(): Promise<Source[]> {
  const res = await fetch('/api/sources');
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((s: any) => ({
    id: s.id,
    source_name: s.source_name,
    source_name_cn: s.source_name_cn || s.source_name,
    source_type: s.source_type,
    country: s.country,
    language: s.language,
    domain: s.domain,
    url: s.url,
    priority_level: s.priority_level,
    status: s.status,
  }));
}

// Auth
export function getAuthStatus() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('motoquan_admin_auth') === 'motoquan_logged_in';
}

export function login(email: string, password: string): boolean {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@motoquan.com';
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'motoquan2026';
  if (email === adminEmail && password === adminPassword) {
    localStorage.setItem('motoquan_admin_auth', 'motoquan_logged_in');
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('motoquan_admin_auth');
}

// Categories API
export async function getCategoriesAPI(): Promise<Category[]> {
  const res = await fetch('/api/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  // Normalize snake_case from DB to camelCase
  return data.map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    color: c.color,
    icon: c.icon,
  }));
}

export async function saveCategoryAPI(category: Omit<Category, 'id'>): Promise<Category> {
  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error('Failed to create category');
  const data = await res.json();
  return { id: data.id, name: data.name, slug: data.slug, color: data.color, icon: data.icon };
}

export async function updateCategoryAPI(id: string, updates: Partial<Category>): Promise<Category> {
  const res = await fetch(`/api/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update category');
  const data = await res.json();
  return { id: data.id, name: data.name, slug: data.slug, color: data.color, icon: data.icon };
}

export async function deleteCategoryAPI(id: string): Promise<void> {
  const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete category');
}

// Articles API
export async function getArticlesAPI(): Promise<Article[]> {
  // Fetch all articles including drafts for admin
  const res = await fetch('/api/articles?status=all&limit=100');
  if (!res.ok) throw new Error('Failed to fetch articles');
  const json = await res.json();
  const list = Array.isArray(json) ? json : (json.data || []);
  return list.map((a: any) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category,
    tags: a.tags || [],
    summary: a.summary,
    content: a.content,
    coverImage: a.cover_image || '',
    status: a.status,
    featured: a.featured,
    author: a.author,
    publishedAt: a.published_at,
    readMinutes: a.read_minutes || 5,
    reviewNotes: a.review_notes,
    metrics: { views: a.views || '0', comments: a.comments_count || 0 },
  }));
}

export async function getArticleByIdAPI(id: string): Promise<Article | null> {
  const res = await fetch(`/api/articles/${id}`);
  if (!res.ok) return null;
  const a = await res.json();
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category,
    tags: a.tags || [],
    summary: a.summary,
    content: a.content,
    coverImage: a.cover_image || '',
    status: a.status,
    featured: a.featured,
    author: a.author,
    publishedAt: a.published_at,
    readMinutes: a.read_minutes || 5,
    reviewNotes: a.review_notes,
    metrics: { views: a.views || '0', comments: a.comments_count || 0 },
  };
}

export async function saveArticleAPI(article: Omit<Article, 'id'>): Promise<Article> {
  const res = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article),
  });
  if (!res.ok) throw new Error('Failed to create article');
  const a = await res.json();
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category,
    tags: a.tags || [],
    summary: a.summary,
    content: a.content,
    coverImage: a.cover_image || '',
    status: a.status,
    featured: a.featured,
    author: a.author,
    publishedAt: a.published_at,
    readMinutes: a.read_minutes || 5,
    reviewNotes: a.review_notes,
    metrics: { views: '0', comments: 0 },
  };
}

export async function updateArticleAPI(id: string, updates: Partial<Article>): Promise<Article> {
  const res = await fetch(`/api/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update article');
  const a = await res.json();
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category,
    tags: a.tags || [],
    summary: a.summary,
    content: a.content,
    coverImage: a.cover_image || '',
    status: a.status,
    featured: a.featured,
    author: a.author,
    publishedAt: a.published_at,
    readMinutes: a.read_minutes || 5,
    reviewNotes: a.review_notes,
    metrics: { views: a.views || '0', comments: a.comments_count || 0 },
  };
}

export async function deleteArticleAPI(id: string): Promise<void> {
  const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete article');
}

export async function reviewArticleAPI(
  id: string,
  action: 'approve' | 'reject',
  reviewNotes?: string
): Promise<{ status: 'published' | 'draft'; reviewNotes?: string }> {
  const res = await fetch(`/api/articles/${id}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, reviewNotes }),
  });
  if (!res.ok) throw new Error('Failed to review article');
  return res.json();
}

// Hooks
export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getArticlesAPI();
      setArticles(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { articles, loading, error, refresh };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCategoriesAPI();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { categories, loading, refresh };
}
