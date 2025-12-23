import { GoogleOAuthProvider } from '@react-oauth/google';

import type { Metadata } from 'next';
import localFont from 'next/font/local'

import { Toaster } from 'sonner';

import { QueryProvider } from '@/shared/lib/query';

import './globals.css';

const pretendard = localFont({
  src: '../shared/asset/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: 'GSMC_ADMIN',
  description:
    'GSMC_ADMIN 페이지는 마이스터부, 담임 선생님 분들을 위한 통합 관리 페이지입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body>
        <GoogleOAuthProvider clientId={String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)}>
          <QueryProvider>
            {children}
            <Toaster richColors position="top-right" />
          </QueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
