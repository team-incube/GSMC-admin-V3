'use client';

import { useEffect, useState } from 'react';
import Filter from '@/shared/asset/svg/Filter';
import QuestionMark from '@/shared/asset/svg/QuestionMark';
import MemberSearchModal from '@/widget/member/ui/MemberSearchModal';
import ScoreDetailModal from '@/widget/member/ui/ScoreDetailModal';
import PendingScoresModal from '@/widget/member/ui/PendingScoresModal';
import { useGetCurrentMember } from '@/entities/member/model/useGetCurrentMember';
import { useGetMemberSearch } from '@/entities/member/model/useGetMemberSearch';
import { useGetTotalScore } from '@/entities/score/model/useGetTotalScoreById';
import { cn } from '@/shared/lib/cn';
import Button from '@/shared/ui/Button';
import { MemberType } from '@/entities/member/model/member';
import { skipToken } from '@tanstack/react-query';
import { getSearchStudentRequest } from '@/entities/member/api/getMemberSearch';

export default function MemberView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScoreDetailModalOpen, setIsScoreDetailModalOpen] = useState(false);
  const [isPendingScoresModalOpen, setIsPendingScoresModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);
  const [searchParams, setSearchParams] = useState<getSearchStudentRequest | typeof skipToken>(skipToken);
  const { data: currentMember } = useGetCurrentMember();

  const canFetchMembers = !!currentMember;

  useEffect(() => {
    if (currentMember) {
      setSearchParams({
        classNumber: currentMember.classNumber ?? undefined,
        grade: currentMember.grade ?? undefined,
        role: "STUDENT",
        sortBy: "ASC",
      });
    }
  }, [currentMember]);

  const { data: members, isLoading: isMembersLoading } = useGetMemberSearch(
    canFetchMembers ? searchParams : skipToken
  );

  const { data: totalScore = { totalScore: 0 } } = useGetTotalScore({ memberId: selectedMember?.id ?? 0, includeApprovedOnly: true });

  const handleSearch = () => {
    if (!currentMember) return;
    setSearchParams({
      classNumber: currentMember.classNumber ?? undefined,
      grade: currentMember.grade ?? undefined,
      role: "STUDENT",
      sortBy: "ASC",
    });
  };
  return (
    <div className="w-full grid grid-cols-12 mt-12.5 gap-7.5">
      <section className="col-span-7 bg-main-100 flex h-184.75 flex-col overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between px-10 pt-9 pb-6">
          <div className="flex items-baseline gap-1">
            <p className="text-main-700 text-2xl font-semibold">{members?.totalElements}</p>
            <p className="text-base font-semibold text-black">명</p>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="cursor-pointer transition-opacity hover:opacity-70"
            aria-label="학생 검색"
          >
            {currentMember?.role === 'TEACHER' && <Filter />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-10 pb-6">
          {isMembersLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-main-700 text-2xl font-bold animate-pulse">학생 목록을 불러오는 중...</p>
            </div>
          ) : members?.members.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-main-700 text-2xl font-bold">조건에 맞는 학생이 없습니다.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-0">
              {members?.members.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={cn("cursor-pointer rounded-xl px-8 py-6", selectedMember?.id === member.id && "bg-main-50")}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-600 tabular-nums">{member.name}</p>
                    <p className="text-lg font-semibold text-gray-600 tabular-nums">
                      {member.grade}
                      {member.classNumber}
                      {String(member.number).padStart(2, '0')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="col-span-5 bg-main-100 flex h-184.75 flex-col justify-center overflow-hidden rounded-2xl px-[39px] pt-9 pb-[42px]">
        {selectedMember ? (
          <div className="flex h-full flex-col">
            <h2 className="text-main-700 mb-14 text-2xl font-semibold">인적사항</h2>

            <div className="mb-5 w-full px-1">
              <div className="flex flex-col">
                <p className="mb-2 text-lg font-semibold text-gray-600">
                  {selectedMember.name}
                </p>
                <div className="flex w-full items-center justify-between">
                  <p className="font-semibold text-gray-600">
                    {selectedMember.grade}학년 {selectedMember.classNumber}반{' '}
                    {String(selectedMember.number).padStart(2, '0')}번
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-[47px] flex h-[281px] w-[272px] flex-col items-center justify-center rounded-xl bg-white">
              <div className="text-center">
                <span className="text-main-700 text-4xl font-semibold">{totalScore?.totalScore}점</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button
                variant="border"
                onClick={() => setIsScoreDetailModalOpen(true)}
                className="border-main-500 text-main-500 font-semibold"
              >
                영역별 점수 확인
              </Button>
              <Button
                variant="border"
                onClick={() => setIsPendingScoresModalOpen(true)}
                className="border-main-500 text-main-500 font-semibold"
              >
                심사 요청 확인
              </Button>
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
      </section>

      <MemberSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={handleSearch}
      />

      <ScoreDetailModal
        isOpen={isScoreDetailModalOpen}
        onClose={() => setIsScoreDetailModalOpen(false)}
        memberId={selectedMember?.id ?? null}
      />

      {
        selectedMember ? <PendingScoresModal
          isOpen={isPendingScoresModalOpen}
          onClose={() => setIsPendingScoresModalOpen(false)}
          member={selectedMember}
        /> : null
      }
    </div>
  );
}
