import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const limit = parseInt(searchParams.get('limit') || '30');
  const page = parseInt(searchParams.get('page') || '1');
  const offset = (page - 1) * limit;
  const featured = searchParams.get('featured');
  const count = searchParams.get('count') === 'true';

  // 先单独查总数（count: 'exact' 配合筛选条件时不准确）
  let countQuery = supabase.from('articles').select('id', { count: 'exact', head: true });
  if (status && status !== 'all') countQuery = countQuery.eq('status', status);
  if (category && category !== '全部') countQuery = countQuery.eq('category', category);
  const { count: totalCount } = await countQuery;

  // 再取分页数据
  let query = supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit)
    .range(offset, offset + limit - 1);

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  if (category && category !== '全部') {
    query = query.eq('category', category);
  }

  if (featured === 'true') {
    query = query.eq('featured', true).limit(1);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data: data || [],
    total: totalCount ?? 0,
    page,
    limit,
    hasMore: (totalCount ?? 0) > page * limit,
  });
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
      source_id: body.sourceId || null,
      original_url: body.originalUrl || '',
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
