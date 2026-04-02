import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  let query = supabaseAdmin
    .from('businesses')
    .select('*, submitter:profiles(nickname, company)')
    .order('submitted_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, status, reviewer_notes } = body;

  const { data, error } = await supabaseAdmin
    .from('businesses')
    .update({
      status,
      reviewed_at: new Date().toISOString(),
      reviewer_notes,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
