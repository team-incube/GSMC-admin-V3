'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';

import Image from 'next/image';

import LogoImage from '@/shared/asset/img/logo.png';
import GoogleLogo from '@/shared/asset/svg/GoogleLogo';
import Button from '@/shared/ui/Button';

export default function IntroView() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'student-not-allowed') {
      toast.warning('학생은 어드민 페이지에 접근할 수 없습니다.');
      router.replace('/');
    }
  }, [searchParams, router]);

  const signin = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: "redirect",
    redirect_uri: String(process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI),
  });

  return (
    <div className="flex h-screen flex-col items-center justify-around">
      <div />
      <Image alt="GSMC logo" height={408} src={LogoImage} width={408} />
      <div className="w-full max-w-[600px]">
        <Button onClick={signin} variant="disabled_border">
          <GoogleLogo />
          <span className="ml-6">Google로 시작하기</span>
        </Button>
      </div>
    </div>
  );
}
