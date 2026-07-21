import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_TOKEN_COOKIE } from '@/lib/auth/constants';
import { isValidAdminSession, verifySessionToken } from '@/lib/auth/jwt';

async function isAdminAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;

  if (!token) {
    return false;
  }

  try {
    const payload = await verifySessionToken(token);
    return isValidAdminSession(payload);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = await isAdminAuthenticated(request);

  if (pathname.startsWith('/console') && !isAuthenticated) {
    const loginUrl = new URL('/admin-login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === '/admin-login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/console', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/console', '/console/:path*', '/admin-login'],
};
