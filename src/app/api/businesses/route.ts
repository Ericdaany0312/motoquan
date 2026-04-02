import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || 'approved';

  const { data, error } = await supabaseAdmin
    .from('businesses')
    .select('*')
    .eq('status', status)
    .order('submitted_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from('businesses')
    .insert([{
      company_name: body.company_name,
      contact_person: body.contact_person,
      phone: body.phone,
      wechat: body.wechat,
      email: body.email,
      province: body.province,
      city: body.city,
      business_scope: body.business_scope,
      product_categories: body.product_categories || [],
      description: body.description,
      submitted_by: body.submitted_by || null,
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
