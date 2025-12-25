'use server';

import { cookies } from 'next/headers';

import { COOKIE_CONFIG } from '../config/cookie';

export async function deleteAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_CONFIG.accessToken.name, '', {
    ...COOKIE_CONFIG.accessToken.options,
    maxAge: 0,
  });
  cookieStore.set(COOKIE_CONFIG.refreshToken.name, '', {
    ...COOKIE_CONFIG.refreshToken.options,
    maxAge: 0,
  });
}
