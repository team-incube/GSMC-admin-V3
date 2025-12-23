"use client";

import { useRouter } from 'next/navigation';

import { useGetTeacherMyRequest } from '@/feature/teacher-signup/model/useGetTeacherMyRequest';
import Button from '@/shared/ui/Button';
import { formatDate } from '@/shared/lib/formatDate';
import Input from '@/shared/ui/Input';

export default function TeacherRequestView() {
  const { data: requestInfo, isLoading } = useGetTeacherMyRequest();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">요청 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!requestInfo) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-gray-500">대기 중인 요청 정보가 없습니다.</p>
        <Button className="max-w-[200px]" onClick={() => router.push('/')}>
          홈으로 가기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center px-6">
      <div className="flex w-full max-w-[600px] flex-col gap-4">

        <header className="flex flex-col items-center mt-[57.5px]">
          <h1 className="text-main-700 text-titleSmall font-bold">교직원 가입 대기</h1>
          <p className="text-body2 text-gray-500">관리자의 승인을 기다려 주세요.</p>
        </header>

        <div className="flex flex-col gap-6">
          <Input name="name" label="이름" value={requestInfo.name} readOnly />
          <Input name="email" label="이메일" value={requestInfo.email} readOnly />
          <Input name="requestedRole" label="신청 직무" value={requestInfo.requestedRole === 'HOMEROOM_TEACHER' ? '담임 선생님' : '마이스터부 선생님'} readOnly />
          {requestInfo.requestedRole === 'HOMEROOM_TEACHER' && (
            <div className="flex gap-2">
              <Input className='w-full' name="grade" label="학년" value={String(requestInfo.grade ?? '')} readOnly />
              <Input className='w-full' name="classNumber" label="반" value={String(requestInfo.classNumber ?? '')} readOnly />
            </div>
          )}
          <Input name="requestedAt" label="신청 일시" value={formatDate(requestInfo.requestedAt)} readOnly />
        </div>

        <Button variant="border" onClick={() => router.push('/')} >
          홈으로 가기
        </Button>
      </div>
    </div>
  );
}
