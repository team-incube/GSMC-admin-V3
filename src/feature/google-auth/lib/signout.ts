'use server';

import { redirect } from 'next/navigation';

import { deleteAuthCookies } from '@/shared/lib/deleteCookie';

export async function signout() {
  await deleteAuthCookies();
  redirect('/');
}
