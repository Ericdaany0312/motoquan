import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yplehzgtdgyygywbmldy.supabase.co';
const supabaseAnonKey = 'sb_publishable_-3ZtoV71OXOu0Nqf3Si8sg_duazdKpA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true },
});

// Server-side client (bypasses RLS for admin operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
