import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Routes anyone can visit without logging in
const PUBLIC_ROUTES = ['/','/home', '/services', '/technicians', '/payment/success', '/payment/cancel'];

// The login/register pages themselves
const AUTH_ROUTES = ['/auth/login', '/auth/register'];

// This runs on the server, before any page loads. It reads the cookies that
// were set in lib/auth-store.ts at login time, and decides whether the
// visitor is allowed to see the page they're asking for.
//
// Note: our backend issues a single JWT (no refresh token), so this stays
// simple — just "is there a token" and "does the role match this section".
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('fixitnow_token')?.value;
  const role = request.cookies.get('fixitnow_role')?.value;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route);

  // Already logged in and trying to open the login/register page?
  // Send them straight to their dashboard instead.
  if (token && isAuthRoute) {
    const dashboard =
      role === 'admin'
        ? '/dashboard/admin'
        : role === 'technician'
        ? '/dashboard/technician'
        : '/dashboard/customer';
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  // Not logged in and trying to open anything that isn't public? Send to login.
  if (!token && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Logged in, but the role doesn't match this dashboard section
  if (pathname.startsWith('/dashboard/customer') && role !== 'customer') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (pathname.startsWith('/dashboard/technician') && role !== 'technician') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Run on every route except API calls, static files, and images —
// this way public pages, auth pages, and dashboard pages are all covered
// by the single set of rules above.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
