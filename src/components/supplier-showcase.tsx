'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export function SupplierShowcaseLoginCTA() {
  const { user } = useAuth();
  if (user) return null;
  return (
    <Link
      href="/register"
      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition text-sm text-center border border-white/20"
    >
      免费入驻
    </Link>
  );
}
