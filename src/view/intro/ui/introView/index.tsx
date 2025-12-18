'use client';

import { useGoogleLogin } from '@react-oauth/google';

import Image from 'next/image';

import LogoImage from '@/shared/asset/img/logo.png';
import GoogleLogo from '@/shared/asset/svg/GoogleLogo';
import Button from '@/shared/ui/Button';

export default function IntroView() {
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
