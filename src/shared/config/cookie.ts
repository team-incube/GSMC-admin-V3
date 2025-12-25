export const COOKIE_CONFIG = {
  accessToken: {
    name: 'accessToken',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'lax' as const,
      domain: process.env.NODE_ENV === 'production' ? '.gsmc.io.kr' : undefined,
    },
  },
  refreshToken: {
    name: 'refreshToken',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax' as const,
      domain: process.env.NODE_ENV === 'production' ? '.gsmc.io.kr' : undefined,
    },
  },
};
