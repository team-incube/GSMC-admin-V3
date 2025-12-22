import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const baseURL = '/api/proxy';

export const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (typeof window === 'undefined') {
      const { cookies, headers } = await import('next/headers');
      const cookieStore = await cookies();
      const headersStore = await headers();

      const host = headersStore.get('host');
      const protocol = headersStore.get('x-forwarded-proto') || 'http';

      if (host) {
        config.baseURL = `${protocol}://${host}/api/proxy`;
      }

      const cookieHeader = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ');

      if (cookieHeader) {
        config.headers.Cookie = cookieHeader;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
