import { NextRequest, NextResponse } from 'next/server';
import { SET_COOKIE, X_CURRENT_PATH, X_IS_LOGIN } from './constants/common';
import { appFetch } from './utils/fetch/app-fetch';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

const REDIRECT_PATH_SET = new Set(['/login', '/signup']);

const nextResponse = (
  request: NextRequest,
  isLogin: boolean,
  cookie: string | null,
) => {
  const path = request.nextUrl.pathname;
  if (isLogin && REDIRECT_PATH_SET.has(path)) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  const nextResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
    headers: {
      [X_CURRENT_PATH]: path,
      [X_IS_LOGIN]: `${isLogin ?? false}`,
    },
  });

  if (cookie) {
    nextResponse.headers.set(SET_COOKIE, cookie);
  }

  return nextResponse;
};

export async function proxy(request: NextRequest) {
  let isLogin = false;
  let cookie = null;

  try {
    const response = await appFetch('/api/auth', { useNative: true });

    isLogin = (await response.json())?.data ?? false;
    cookie = response.headers.get(SET_COOKIE);
  } catch {}

  return nextResponse(request, isLogin, cookie);
}
