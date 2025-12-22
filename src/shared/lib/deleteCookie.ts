import { cookies } from 'next/headers';

export async function deleteAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}
