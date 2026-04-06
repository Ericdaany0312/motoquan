import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const brand = searchParams.get('brand');
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  let query = supabaseAdmin
    .from('bike_model_master')
    .select(`*, brand:brand_master(id, name, slug, country)`, { count: 'exact' })
    .eq('is_active', true)
    .order('is_hot', { ascending: false })
    .order('is_new', { ascending: false })
    .order('created_at', { ascending: false });

  if (brand) query = query.eq('brand.slug', brand);
  if (category) query = query.eq('category', category);

  const { data, error, count } = await query.range((page - 1) * limit, page * limit - 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ models: data || [], total: count || 0, page, limit });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabaseAdmin
    .from('bike_model_master')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
