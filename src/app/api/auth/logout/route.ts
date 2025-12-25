import { NextRequest, NextResponse } from 'next/server';
import { deleteAuthCookies } from '@/shared/lib/deleteCookie';

export async function GET(request: NextRequest) {
 await deleteAuthCookies();

  return NextResponse.redirect(new URL('/', request.url));
}
