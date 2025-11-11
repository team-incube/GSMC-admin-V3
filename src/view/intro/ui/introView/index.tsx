'use client';

import Image from 'next/image';
import LogoImage from '@/shared/asset/img/logo.png';
import GoogleLogo from '@/shared/asset/svg/GoogleLogo';
import Button from '@/shared/ui/Button';
import { handleGoogleButton } from '@/feature/google-auth/lib/handleGoogleButton';

export default function IntroView() {
  return (
    <div className="flex h-screen flex-col items-center justify-around">
      <div />
      <Image alt="GSMC logo" height={408} src={LogoImage} width={408} />
      <div className="w-full max-w-[600px]">
        <Button onClick={handleGoogleButton} variant="disabled_border">
          <GoogleLogo />
          <span className="ml-6">Google로 시작하기</span>
        </Button>
      </div>
    </div>
  );
}
