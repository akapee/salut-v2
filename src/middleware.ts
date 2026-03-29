import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Kunci semua jalan yang menuju ke folder /admin (kecuali halaman login itu sendiri)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Periksa apakah pengunjung ini memiliki lencana "auth_token" buatan Laravel Sanctum?
    const hasAuthToken = request.cookies.get('auth_token');

    // Jika ketahuan masuk tanpa token masuk sah, tending langsung ke pintu masuk (Login)
    if (!hasAuthToken) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Jika memilik token atau tidak masuk ke rute /admin, izinkan lewat
  return NextResponse.next();
}

export const config = {
  // Tingkatkan kecepatan Web: Hanya jalankan skrip perisai penjaga ini jika menuju url /admin/*
  matcher: '/admin/:path*',
};
