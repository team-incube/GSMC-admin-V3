'use server';

import { redirect } from 'next/navigation';

import { deleteAuthCookies } from '@/shared/lib/cookie/deleteCookie';

export async function signout() {
  await deleteAuthCookies();
  redirect('/');
}
