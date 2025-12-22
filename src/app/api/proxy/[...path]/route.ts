import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

async function proxyRequest(request: NextRequest, method: string) {
  try {
    const url = new URL(request.url);
    const pathWithoutProxy = url.pathname.replace('/api/proxy', '');
    const backendUrl = `${BACKEND_URL}${pathWithoutProxy}${url.search}`;

    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .filter((cookie) => cookie.name === 'accessToken' || cookie.name === 'refreshToken')
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ');

    const headers: HeadersInit = {};
    const contentType = request.headers.get('content-type');
    if (contentType) {
      headers['Content-Type'] = contentType;
    }
    if (cookieHeader) {
      headers.Cookie = cookieHeader;
    }

    let body: BodyInit | undefined;
    if (method !== 'GET' && method !== 'HEAD') {
      const contentType = request.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        body = await request.text();
      } else if (contentType?.includes('multipart/form-data')) {
        body = await request.arrayBuffer();
      } else {
        body = await request.text();
      }
    }

    // console.log('Proxying to:', backendUrl);

    const response = await fetch(backendUrl, {
      method,
      headers,
      body,
      signal: AbortSignal.timeout(30000),
    });

    if (response.status === 204) {
      return NextResponse.json(null, { status: 200 });
    }

    const responseContentType = response.headers.get('content-type');
    if (responseContentType?.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data, {
        status: response.status,
      });
    } else {
      const text = await response.text();
      return new NextResponse(text, {
        status: response.status,
        headers: {
          'Content-Type': responseContentType || 'text/plain',
        },
      });
    }
  } catch (error) {
    // console.error('Proxy error:', error);
    return NextResponse.json(
      {
        error: 'Proxy request failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  return proxyRequest(request, 'GET');
}

export async function POST(request: NextRequest) {
  return proxyRequest(request, 'POST');
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request, 'PUT');
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request, 'PATCH');
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request, 'DELETE');
}
