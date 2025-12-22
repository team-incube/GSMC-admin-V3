import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { RoleType, MemberType } from './entities/member/model/member';
import { AuthTokenType } from './feature/google-auth/model/auth';
import { COOKIE_CONFIG } from './shared/config/cookie';
import { PROTECT_PAGE, PUBLIC_PAGE } from './shared/config/protect-page';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = PROTECT_PAGE.includes(currentPath);
  const isPublicRoute = PUBLIC_PAGE.includes(currentPath);
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let userRole: RoleType | null = null;

  if (accessToken) {
    try {
      const response = await axios.get<{ data: MemberType }>(
        `${BACKEND_URL}/members/my`,
        {
          headers: {
            Cookie: `accessToken=${accessToken}`,
          },
        }
      );
      userRole = response.data.data.role;
    } catch {
      userRole = null;
    }
  }

  if ((!accessToken || !userRole) && refreshToken) {
    try {
      const response = await axios.put<{ data: AuthTokenType }>(
        `${BACKEND_URL}/auth/refresh`,
        {},
        {
          headers: { Cookie: `refreshToken=${refreshToken}` },
          withCredentials: true
        }
      );

      userRole = response?.data.data.role ?? null;

      const setCookie = response.headers['set-cookie'];

      if (setCookie && userRole) {
        const redirectUrl = new URL(request.url);
        const redirect = NextResponse.redirect(redirectUrl);

        const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

        cookies.forEach((cookie) => {
          redirect.headers.append('Set-Cookie', cookie);
        });

        return redirect;
      }
    } catch {
      userRole = null;
    }
  }

  if (isProtectedRoute) {
    if (!userRole) {
      const redirect = NextResponse.redirect(new URL('/', request.url));
      redirect.cookies.delete(COOKIE_CONFIG.accessToken.name);
      redirect.cookies.delete(COOKIE_CONFIG.refreshToken.name);
      return redirect;
    }
    if (userRole === 'UNAUTHORIZED') {
      const redirect = NextResponse.redirect(new URL('/signup', request.url));
      return redirect;
    }
  }

  if (isPublicRoute && userRole && userRole !== 'UNAUTHORIZED') {
    const redirect = NextResponse.redirect(new URL('/member', request.url));
    return redirect;
  }

  const nextResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return nextResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};