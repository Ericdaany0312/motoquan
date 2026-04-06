import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: model, error } = await supabaseAdmin
    .from('bike_model_master')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !model) {
    return NextResponse.json({ error: 'Model not found' }, { status: 404 });
  }

  // Get related articles via relation table
  const { data: relations } = await supabaseAdmin
    .from('article_model_relation')
    .select('article:articles(id, title, slug, category, summary, cover_image, published_at, views)')
    .eq('model_id', id)
    .limit(6);

  const articles = relations?.map((r: any) => r.article).filter(Boolean) || [];

  return NextResponse.json({ model, articles });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  delete body.id;
  delete body.created_at;

  const { data, error } = await supabaseAdmin
    .from('bike_model_master')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { error } = await supabaseAdmin
    .from('bike_model_master')
    .update({ is_active: false })
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
