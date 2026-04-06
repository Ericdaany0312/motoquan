import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  // brand_master has: id, brand_name, country (no slug column)
  const { data, error } = await supabaseAdmin
    .from('brand_master')
    .select('id, brand_name, country')
    .order('brand_name');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({
    brands: (data || []).map((b: any) => ({
      id: b.id,
      brand_name: b.brand_name,
      slug: '',
      country: b.country,
    })),
  });
}
