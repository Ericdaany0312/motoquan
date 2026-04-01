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
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  count?: number;
}

const ARTICLES_KEY = 'motoquan_articles';
const CATEGORIES_KEY = 'motoquan_categories';

const defaultCategories: Category[] = [
  { id: '1', name: '新车发布', slug: 'new-cars', color: '#0A84FF', icon: '🏍️' },
  { id: '2', name: '行业动态', slug: 'industry-news', color: '#FF6B35', icon: '📰' },
  { id: '3', name: '维修教程', slug: 'repair', color: '#34C759', icon: '🔧' },
  { id: '4', name: '配件选购', slug: 'parts', color: '#AF52DE', icon: '⚙️' },
  { id: '5', name: '改装方案', slug: 'mod', color: '#FF9500', icon: '🔥' },
];

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u4e00-\u9fa5]/g, (c) => c.charCodeAt(0).toString(36))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Auth
export function getAuthStatus() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('motoquan_admin_auth') === 'motoquan_logged_in';
}

export function login(email: string, password: string): boolean {
  if (email === 'admin@motoquan.com' && password === 'motoquan2026') {
    localStorage.setItem('motoquan_admin_auth', 'motoquan_logged_in');
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('motoquan_admin_auth');
}

// Categories
export function getCategories(): Category[] {
  if (typeof window === 'undefined') return defaultCategories;
  const stored = localStorage.getItem(CATEGORIES_KEY);
  if (!stored) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
    return defaultCategories;
  }
  return JSON.parse(stored);
}

export function saveCategory(category: Omit<Category, 'id'>): Category {
  const categories = getCategories();
  const newCategory = { ...category, id: generateId() };
  categories.push(newCategory);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  return newCategory;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return null;
  categories[index] = { ...categories[index], ...updates };
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  return categories[index];
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories();
  const filtered = categories.filter((c) => c.id !== id);
  if (filtered.length === categories.length) return false;
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filtered));
  return true;
}

// Articles
export function getArticles(): Article[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(ARTICLES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getArticleById(id: string): Article | null {
  return getArticles().find((a) => a.id === id) || null;
}

export function saveArticle(article: Omit<Article, 'id'>): Article {
  const articles = getArticles();
  const newArticle = { ...article, id: generateId() };
  articles.unshift(newArticle);
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  return newArticle;
}

export function updateArticle(id: string, updates: Partial<Article>): Article | null {
  const articles = getArticles();
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) return null;
  articles[index] = { ...articles[index], ...updates };
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  return articles[index];
}

export function deleteArticle(id: string): boolean {
  const articles = getArticles();
  const filtered = articles.filter((a) => a.id !== id);
  if (filtered.length === articles.length) return false;
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(filtered));
  return true;
}

export function slugExists(slug: string, excludeId?: string): boolean {
  return getArticles().some((a) => a.slug === slug && a.id !== excludeId);
}

// Hooks
export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    setArticles(getArticles());
  }, []);
  const refresh = useCallback(() => setArticles(getArticles()), []);
  return { articles, refresh };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  useEffect(() => {
    setCategories(getCategories());
  }, []);
  const refresh = useCallback(() => setCategories(getCategories()), []);
  return { categories, refresh };
}
