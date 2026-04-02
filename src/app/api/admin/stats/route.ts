import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  // Article stats
  const { count: articleCount } = await supabaseAdmin
    .from('articles')
    .select('id', { count: 'exact', head: true });

  const { count: publishedCount } = await supabaseAdmin
    .from('articles')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'published');

  const { count: draftCount } = await supabaseAdmin
    .from('articles')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'draft');

  const { data: recentArticles } = await supabaseAdmin
    .from('articles')
    .select('title, published_at, status, views')
    .order('created_at', { ascending: false })
    .limit(5);

  return NextResponse.json({
    articles: articleCount ?? 0,
    published: publishedCount ?? 0,
    drafts: draftCount ?? 0,
    recentArticles: recentArticles ?? [],
  });
}
