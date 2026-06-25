import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const auth = request.cookies.get('crm-auth')?.value;
  if (auth === 'ok') return NextResponse.next();
  const url = request.nextUrl.clone();
  if (url.pathname === '/login') return NextResponse.next();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|upek_logo.jpg).*)'],
};