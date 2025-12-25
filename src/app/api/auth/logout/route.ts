import { NextResponse } from 'next/server';
import { deleteAuthCookies } from '@/shared/lib/deleteCookie';

export async function GET() {
 await deleteAuthCookies();

  return NextResponse.redirect(new URL('/'));
}
