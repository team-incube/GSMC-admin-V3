"use client";

import { useRouter } from 'next/navigation';

import Button from '@/shared/ui/Button';
import { useGetTeacherRequest } from '@/feature/teacher-approve/model/useGetTeacherRequest';
import { useApproveTeacherRequest } from '@/feature/teacher-approve/model/useApproveTeacherRequest';
import { useRejectTeacherRequest } from '@/feature/teacher-approve/model/useRejectTeacherRequest';
import { formatDate } from '@/shared/lib/formatDate';

export default function TeacherApproveView() {
  const { data: requestInfo, isLoading } = useGetTeacherRequest();
  const { mutate: approveTeacherRequest } = useApproveTeacherRequest();
  const { mutate: rejectTeacherRequest } = useRejectTeacherRequest();
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
    <div className="flex w-full justify-center p-6">
      <div className="w-full p-4 grid grid-cols-1 gap-4">
        {requestInfo.map((request) => (
          <article key={request.memberId} className='flex flex-col gap-4 border rounded-2xl border-black/20 p-4'>
            <div className='flex justify-between gap-2'>
              <div>
                <p className='text-xl font-bold'>{request.name}</p>
                <p className='text-sm text-black/60'>{request.email}</p>
              </div>
              <div className='text-right'>
                <p className='text-sm text-black/60'>{formatDate(request.requestedAt)}</p>
                <p className='text-sm text-black/60'>{request.requestedRole === "HOMEROOM_TEACHER" ? `${request.grade}학년 ${request.classNumber}반 담임선생님` : "마이스터부 선생님"}</p>
              </div>
            </div>
            <div className='flex gap-2'>
              <Button variant="active" onClick={() => approveTeacherRequest(request.memberId)} >
                승인
              </Button>
              <Button variant="border" onClick={() => rejectTeacherRequest(request.memberId)} >
                거부
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
