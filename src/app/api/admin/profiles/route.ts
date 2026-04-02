import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  // Get profiles with user email via a join
  const { data: profiles, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Try to get auth users emails (may fail if no permission)
  let usersWithEmail = profiles;
  try {
    const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers();
    if (authUsers?.users) {
      const emailMap: Record<string, string> = {};
      for (const u of authUsers.users) {
        emailMap[u.id] = u.email || '';
      }
      usersWithEmail = profiles.map((p: any) => ({
        ...p,
        email: emailMap[p.id] || '',
      }));
    }
  } catch {
    // fallback: just return profiles without email
    usersWithEmail = profiles.map((p: any) => ({ ...p, email: '' }));
  }

  return NextResponse.json(usersWithEmail);
}
