'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import axios, { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'sonner';

export default function CallbackView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  useEffect(() => {

    const run = async () => {
      try {
        const response = await axios.post('/api/auth/google/callback', { code });

        if (response.data.role === 'UNAUTHORIZED') {

          try {
            const requestInfo = await axios.get('/api/proxy/auth/teacher-signup/my-request');
            if (requestInfo.data) {
              toast.success('교직원 승인 대기 중입니다.');
              router.push('/teacher-request');
              return;
            }
          } catch (error) {
            if (isAxiosError(error)) {
              if (error.response?.status === 404) {
                toast.success('환영합니다! 회원가입을 완료해주세요.');
                router.push('/signup');
              } else {
                toast.error('가입 정보를 확인하는 중 오류가 발생했습니다.');
                router.push('/');
              }
            }
          }
        } else {
          toast.success('로그인 성공');
          router.push('/member');
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === HttpStatusCode.Forbidden) {
            toast.error("학교 계정으로 로그인해주세요.");
          } else {
            toast.error(error.response?.data?.message || '로그인에 실패했습니다. 다시 시도해주세요.');
          }
        } else {
          toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
        }
        router.push('/');
      }
    };

    if (error) {
      toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
      router.push('/');
      return;
    }

    if (code) {
      run();
    }
  }, [router, code, error]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-gray-600">로그인 진행 중...</p>
      </div>
    </div>
  );
}
