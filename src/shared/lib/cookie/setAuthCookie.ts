import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { COOKIE_CONFIG } from '@/shared/config/cookie';

export async function setAuthCookies(
  accessToken: string,
  refreshToken?: string | null,
  response?: NextResponse
) {
  if (response) {
    response.cookies.set(
      COOKIE_CONFIG.accessToken.name,
      accessToken,
      COOKIE_CONFIG.accessToken.options
    );

    if (refreshToken) {
      response.cookies.set(
        COOKIE_CONFIG.refreshToken.name,
        refreshToken,
        COOKIE_CONFIG.refreshToken.options
      );
    }
    return;
  }

  const cookieStore = await cookies();

  cookieStore.set(
    COOKIE_CONFIG.accessToken.name,
    accessToken,
    COOKIE_CONFIG.accessToken.options
  );

  if (refreshToken) {
    cookieStore.set(
      COOKIE_CONFIG.refreshToken.name,
      refreshToken,
      COOKIE_CONFIG.refreshToken.options
    );
  }
}
