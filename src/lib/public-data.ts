// Public-facing data fetching from Supabase (no localStorage, server-friendly)

const BASE_URL = 'https://yplehzgtdgyygywbmldy.supabase.co';
const ANON_KEY = 'sb_publishable_-3ZtoV71OXOu0Nqf3Si8sg_duazdKpA';

const headers = {
  'apikey': ANON_KEY,
  'Authorization': `Bearer ${ANON_KEY}`,
};

export interface PublicArticle {
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

export interface PublicCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
}

export interface CategoryMeta {
  label: string;
  slug: string;
  shortLabel: string;
  icon: string;
  color: string;
  softColor: string;
}

function normalizeArticle(a: any): PublicArticle {
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
    featured: a.featured || false,
    author: a.author,
    publishedAt: a.published_at,
    readMinutes: a.read_minutes || 5,
    metrics: { views: a.views || '0', comments: a.comments_count || 0 },
  };
}

// Fetch all published articles
export async function getPublishedArticles(category?: string, limit = 20): Promise<PublicArticle[]> {
  let url = `${BASE_URL}/rest/v1/articles?select=*&status=eq.published&order=published_at.desc&limit=${limit}`;
  if (category && category !== '全部') {
    url += `&category=eq.${encodeURIComponent(category)}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map(normalizeArticle);
}

// Fetch featured article
export async function getFeaturedArticle(): Promise<PublicArticle | null> {
  const url = `${BASE_URL}/rest/v1/articles?select=*&status=eq.published&featured=eq.true&order=published_at.desc&limit=1`;
  const res = await fetch(url, { headers });
  if (!res.ok) return null;
  const data = await res.json();
  return data.length > 0 ? normalizeArticle(data[0]) : null;
}

// Fetch trending (by views count - stored as text, so we'll just use recent as proxy for now)
export async function getTrendingArticles(limit = 4): Promise<PublicArticle[]> {
  const url = `${BASE_URL}/rest/v1/articles?select=*&status=eq.published&order=views.desc&limit=${limit}`;
  const res = await fetch(url, { headers });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map(normalizeArticle);
}

// Fetch single article by slug
export async function getArticleBySlug(slug: string): Promise<PublicArticle | null> {
  const url = `${BASE_URL}/rest/v1/articles?select=*&slug=eq.${encodeURIComponent(slug)}&status=eq.published`;
  const res = await fetch(url, { headers });
  if (!res.ok) return null;
  const data = await res.json();
  return data.length > 0 ? normalizeArticle(data[0]) : null;
}

// Fetch all categories
export async function getPublicCategories(): Promise<PublicCategory[]> {
  const url = `${BASE_URL}/rest/v1/categories?select=*&order=created_at.asc`;
  const res = await fetch(url, { headers });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    color: c.color,
    icon: c.icon,
  }));
}

// Build CategoryMeta for category tabs from DB categories
export async function getCategoryMetas(): Promise<CategoryMeta[]> {
  const cats = await getPublicCategories();
  return cats.map((c) => ({
    label: c.name,
    slug: c.slug,
    shortLabel: c.name.slice(0, 4),
    icon: 'flash' as const,
    color: c.color,
    softColor: c.color + '20',
  }));
}

export function formatArticleDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}
