"use client";

import { useRouter } from 'next/navigation';

import SignupForm from '@/widget/signup/ui';
import BackArrow from '@/shared/asset/svg/BackArrow';

export default function SignupView() {
  const router = useRouter();

  return (
    <div className="flex justify-center px-6">
      <div className="flex w-full max-w-[600px] flex-col gap-3">
        <header className="w-fit flex items-center mt-[57.5px] mb-[75.5px] cursor-pointer" onClick={() => router.push('/')}>
          <BackArrow />
          <h2 className="text-main-700 text-titleSmall">내 정보 등록</h2>
        </header>
        <SignupForm />
      </div>
    </div>
  );
}
