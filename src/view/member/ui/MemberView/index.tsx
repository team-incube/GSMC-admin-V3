'use client';

import Filter from '@/shared/asset/svg/Filter';
import { getMembers } from '@/feature/member/api/getMembers';
import { Member } from '@/feature/member/model/member';
import QuestionMark from '@/shared/asset/svg/QuestionMark';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getTotalScore } from '@/feature/member/api/getTotalScore';

export default function MemberView() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const {
    data: members = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers,
  });

  const { data: totalScore = 0, isLoading: scoreLoading } = useQuery({
    queryKey: ['totalScore', selectedMember?.id],
    queryFn: () => getTotalScore(selectedMember!.id),
    enabled: !!selectedMember,
  });

  if (isLoading) {
    return (
      <div className="mt-12.5 flex items-center justify-center">
        <p className="text-lg text-gray-600">로딩중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-12.5 flex items-center justify-center">
        <p className="text-lg text-red-600">데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }
  return (
    <div className="mt-12.5 flex gap-7.5">
      <div className="bg-main-100 flex h-184.75 w-143.25 flex-col overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between px-10 pt-9 pb-6">
          <div className="flex items-baseline gap-1">
            <p className="text-main-700 text-2xl font-semibold">{members.length}</p>
            <p className="text-base font-semibold text-black">명</p>
          </div>
          <Filter />
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-5.5">
          {members.map((member) => (
            <article
              key={member.id}
              onClick={() => setSelectedMember(member)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedMember(member);
                }
              }}
              className="flex cursor-pointer flex-col rounded-xl"
            >
              <div className="flex items-center justify-between px-8 py-6">
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-600">{member.name}</p>
                </div>
                <p className="text-lg font-semibold text-gray-600">
                  {member.grade}
                  {member.classNumber}
                  {String(member.number).padStart(2, '0')}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="bg-main-100 flex h-184.75 w-87.5 flex-col justify-center overflow-hidden rounded-2xl px-[39px] pt-[36px] pb-[42px]">
        {selectedMember ? (
          <div className="flex h-full flex-col">
            <h2 className="text-main-700 mb-[56px] text-2xl font-semibold">인적사항</h2>

            <div className="mb-[20px] w-full px-1">
              <div className="flex flex-col">
                <p className="mb-[8px] text-lg font-semibold text-gray-600">
                  {selectedMember.name}
                </p>
                <div className="flex w-full items-center justify-between">
                  <p className="font-semibold text-gray-600">
                    {selectedMember.grade}학년 {selectedMember.classNumber}반{' '}
                    {String(selectedMember.number).padStart(2, '0')}번
                  </p>
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/sheets/class-scores?grade=${selectedMember.grade}&classNumber=${selectedMember.classNumber}`}
                    download
                    className="text-sm text-black underline underline-offset-3"
                  >
                    엑셀 출력
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-[47px] flex h-[281px] w-[272px] flex-col items-center justify-center rounded-xl bg-white">
              <div className="text-center">
                <span className="text-main-700 text-4xl font-semibold">
                  {scoreLoading ? '로딩중...' : `${totalScore}점`}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-[12px]">
              <button className="border-main-500 text-main-500 h-[52px] w-[272px] rounded-xl border text-lg font-semibold">
                점수 변경
              </button>
              <button className="border-main-500 text-main-500 h-[52px] w-[272px] rounded-xl border text-lg font-semibold">
                부분 점수 확인
              </button>
              <button className="border-main-500 text-main-500 h-[52px] w-[272px] rounded-xl border text-lg font-semibold">
                심사 요청 확인
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <QuestionMark />
            <p className="mt-8 text-center text-2xl font-semibold text-gray-600">
              학생을 선택해주세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
