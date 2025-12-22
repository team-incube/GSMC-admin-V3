'use client';

import { useRouter } from 'next/navigation';

import Button from '@/shared/ui/Button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-6 px-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-3xl font-bold text-main-700">404</h2>
        <p className="text-lg text-gray-600">요청하신 페이지를 찾을 수 없습니다.</p>
        <p className="text-gray-500">존재하지 않는 주소이거나, 요청하신 페이지가 변경/삭제되어 찾을 수 없습니다.</p>
      </div>
      <Button onClick={() => router.push('/member')}>
        메인으로 돌아가기
      </Button>
    </div>
  );
}
