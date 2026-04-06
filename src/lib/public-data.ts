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

// Fetch published articles with pagination (default 30 per page)
export async function getPublishedArticles(
  category?: string,
  limit = 30,
  page = 1
): Promise<{ articles: PublicArticle[]; total: number; hasMore: boolean }> {
  const offset = (page - 1) * limit;
  let url = `${BASE_URL}/rest/v1/articles?select=*&status=eq.published&order=published_at.desc&limit=${limit}&offset=${offset}`;
  if (category && category !== '全部') {
    url += `&category=eq.${encodeURIComponent(category)}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) return { articles: [], total: 0, hasMore: false };
  const data = await res.json();

  // Also fetch total count for the category
  let countUrl = `${BASE_URL}/rest/v1/articles?select=id&status=eq.published`;
  if (category && category !== '全部') {
    countUrl += `&category=eq.${encodeURIComponent(category)}`;
  }
  const countRes = await fetch(countUrl, { headers });
  const countData = await countRes.json();
  const total = Array.isArray(countData) ? countData.length : 0;

  return {
    articles: data.map(normalizeArticle),
    total,
    hasMore: total > page * limit,
  };
}

// Fetch featured article(s) for banner
export async function getFeaturedArticle(): Promise<PublicArticle | null> {
  const articles = await getFeaturedArticles();
  return articles.length > 0 ? articles[0] : null;
}

// Fetch all featured articles (for banner carousel)
export async function getFeaturedArticles(): Promise<PublicArticle[]> {
  const url = `${BASE_URL}/rest/v1/articles?select=*&status=eq.published&featured=eq.true&order=published_at.desc&limit=5`;
  const res = await fetch(url, { headers });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map(normalizeArticle);
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

// Get total published article count
export async function getArticleCount(): Promise<number> {
  const url = `${BASE_URL}/rest/v1/articles?select=id&status=eq.published`;
  const res = await fetch(url, { headers });
  if (!res.ok) return 0;
  const data = await res.json();
  return Array.isArray(data) ? data.length : 0;
}

// Get total business count
export async function getBusinessCount(): Promise<number> {
  const url = `${BASE_URL}/rest/v1/businesses?select=id`;
  const res = await fetch(url, { headers });
  if (!res.ok) return 0;
  const data = await res.json();
  return Array.isArray(data) ? data.length : 0;
}

// ─── Bike Models ──────────────────────────────────────────────

export interface PublicBrand {
  id: string;
  name: string;
  slug: string;
  country?: string;
}

export interface PublicModel {
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
  is_new_model?: boolean;
  is_hot?: boolean;
  main_image?: string;
  brand_name?: string;
  brand_slug?: string;
}

// Fetch all brands
export async function getPublicBrands(): Promise<PublicBrand[]> {
  const url = `${BASE_URL}/rest/v1/brand_master?select=id,brand_name,slug,country&order=brand_name.asc`;
  const res = await fetch(url, { headers });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((b: any) => ({
    id: b.id,
    name: b.brand_name,
    slug: b.slug || '',
    country: b.country,
  }));
}

// Fetch models with pagination and filters
export async function getPublicModels(
  brandSlug?: string,
  category?: string,
  page = 1,
  limit = 20
): Promise<{ models: PublicModel[]; total: number }> {
  const offset = (page - 1) * limit;
  let url = `${BASE_URL}/rest/v1/bike_model_master?select=*&order=is_new_model.desc,created_at.desc&limit=${limit}&offset=${offset}`;

  const countUrl = `${BASE_URL}/rest/v1/bike_model_master?select=id`;

  const res = await fetch(url, { headers });
  const countRes = await fetch(countUrl, { headers });
  const data = await res.json();
  const countData = await countRes.json();

  return {
    models: Array.isArray(data) ? data : [],
    total: Array.isArray(countData) ? countData.length : 0,
  };
}

// Fetch single model by id
export async function getModelById(id: string): Promise<PublicModel | null> {
  const url = `${BASE_URL}/rest/v1/bike_model_master?select=*&id=eq.${encodeURIComponent(id)}`;
  const res = await fetch(url, { headers });
  if (!res.ok) return null;
  const data = await res.json();
  return data.length > 0 ? data[0] : null;
}
