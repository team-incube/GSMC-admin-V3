'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postVolunteerScore } from '@/feature/member/api/postScoresByVolunteer';
import type { Member } from '@/feature/member/model/types';

interface VolunteerScoreProps {
  selectedMember: Member;
  onBack: () => void;
  onSuccess: () => void;
}

export default function VolunteerScore({ selectedMember, onBack, onSuccess }: VolunteerScoreProps) {
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postVolunteerScore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['totalScore', selectedMember.id],
      });
      onSuccess();
    },
    onError: () => {
      alert('유효하지 않은 점수 값입니다.');
    },
  });

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    mutate({
      value,
      memberId: selectedMember.id,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="h-[361px] w-[500px] rounded-[20px] bg-white px-[60px] py-[40px]">
        <p className="text-main-700 mb-[24px] text-2xl font-semibold">봉사 점수 변경</p>

        <div className="mb-[30px] flex flex-col gap-1">
          <p>총 봉사 시간 입력</p>
          <input
            className="h-[56px] w-[380px] rounded-xl border border-gray-300 px-[16px] text-sm font-medium"
            type="number"
            placeholder="교육과정 봉사활동 제외, 총 봉사 시간 입력"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onBack}
            className="border-main-500 text-main-500 h-[52px] w-[380px] rounded-xl border text-lg font-semibold"
          >
            뒤로가기
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-main-500 h-[52px] w-[380px] rounded-xl text-lg font-semibold text-white disabled:opacity-50"
          >
            변경 완료
          </button>
        </div>
      </div>
    </div>
  );
}
