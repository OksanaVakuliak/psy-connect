import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  if (request.cookies.has('accessToken')) {
    return NextResponse.next();
  }

  const home = new URL('/', request.url);
  home.searchParams.set('auth', 'login');

  return NextResponse.redirect(home);
}

export const config = {
  matcher: '/favorites',
};
