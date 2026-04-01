import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const limit = parseInt(searchParams.get('limit') || '20');
  const featured = searchParams.get('featured');

  let query = supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  if (featured === 'true') {
    query = query.eq('featured', true).limit(1);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabase
    .from('articles')
    .insert([{
      title: body.title,
      slug: body.slug,
      category: body.category,
      tags: body.tags || [],
      summary: body.summary,
      content: body.content,
      cover_image: body.coverImage || '',
      status: body.status || 'draft',
      featured: body.featured || false,
      author: body.author || '管理员',
      read_minutes: body.readMinutes || 5,
      views: '0',
      comments_count: 0,
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
