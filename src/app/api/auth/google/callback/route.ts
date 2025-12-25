import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';

import { AuthTokenType } from '@/feature/google-auth/model/auth';

export async function POST(request: NextRequest) {
  try {
    // 요청 바디에서 authorization code 추출
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
    }

    console.log("google/callback:", {
      code: code,
      redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    });

    // 백엔드 API 호출 - 디코딩된 code 전송
    const response = await axios.post<{ data: AuthTokenType }>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth`,
      {
        code: code,
        redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
      },
    );

    // 역할 추출
    const { role } = response.data.data;

    if (!role) {
      return NextResponse.json({ error: '역할을 받지 못했습니다' }, { status: 500 });
    }

    const nextResponse = NextResponse.json({ success: true, role }, { status: 200 });

    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
      cookies.forEach((cookie) => {
        nextResponse.headers.append('Set-Cookie', cookie);
      });
    }

    return nextResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Google Auth Error Detail:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.response?.data,
        config: {
          url: error.config?.url,
          data: error.config?.data,
        }
      });
      return NextResponse.json(
        {
          error: 'Authentication failed',
          details: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 },
      );
    }
    console.error('Unknown Auth Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
