import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware Laravel sudah dimatikan karena menggunakan Supabase.
  // Perlindungan dashboard /admin/events bisa dikontrol melalui status Client-Side Auth Supabase.
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
