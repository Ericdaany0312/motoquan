import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { action, reviewNotes } = await req.json();

  const newStatus = action === 'approve' ? 'published' : 'draft';

  const { data, error } = await supabaseAdmin
    .from('articles')
    .update({
      status: newStatus,
      review_notes: reviewNotes || null,
      published_at: action === 'approve' ? new Date().toISOString() : undefined,
    })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ status: newStatus, reviewNotes: reviewNotes || null });
}
