'use client';

import ScoreEdit from '@/widget/member/ui/ScoreEdit';
import { useEffect, useState } from 'react';
import Filter from '@/shared/asset/svg/Filter';
import QuestionMark from '@/shared/asset/svg/QuestionMark';
import MemberSearchModal from '@/widget/member/ui/MemberSearchModal';
import ScoreDetailModal from '@/widget/member/ui/ScoreDetailModal';
import PendingScoresModal from '@/widget/member/ui/PendingScoresModal';
import type { Member, MemberSearchParams } from '@/feature/member/model/types';
import VolunteerScore from '@/widget/member/ui/VolunteerScoreEdit';
import AcademicScoreEdit from '@/widget/member/ui/AcademicScoreEdit';
import { useGetCurrentMember } from '@/entities/member/model/useGetCurrentMember';
import { useGetMemberSearch } from '@/feature/member/model/hooks/useGetMemberSearch';
import { useGetTotalScore } from '@/feature/member/model/hooks/useGetTotalScore';
import { cn } from '@/shared/lib/cn';
import Button from '@/shared/ui/Button';

export default function MemberView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScoreDetailModalOpen, setIsScoreDetailModalOpen] = useState(false);
  const [isPendingScoresModalOpen, setIsPendingScoresModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [openModal, setOpenModal] = useState<'score' | 'volunteer' | 'academic' | null>(null);

  const { data: currentMember } = useGetCurrentMember();

  useEffect(() => {
    if (currentMember) {
      setSearchParams({
        limit: 20,
        page: 0,
        sortBy: 'ASC',
        role: 'STUDENT',
        grade: currentMember.grade ? currentMember.grade : undefined,
        classNumber: currentMember.classNumber ? currentMember.classNumber : undefined,
      });
    }
  }, [currentMember])

  const [searchParams, setSearchParams] = useState<MemberSearchParams>({
    limit: 20,
    page: 0,
    sortBy: 'ASC',
    role: 'STUDENT',
    grade: currentMember?.grade ? currentMember.grade : undefined,
    classNumber: currentMember?.classNumber ? currentMember.classNumber : undefined,
  });

  const { data: members } = useGetMemberSearch(searchParams);
  const { data: totalScore = { totalScore: 0 } } = useGetTotalScore(selectedMember?.id ?? 0);

  const handleSearch = (params: { name?: string; grade?: number; classNumber?: number }) => {
    setSearchParams({
      ...searchParams,
      ...params,
      page: 0,
    });
    setIsModalOpen(false);
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
          {members?.members.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-main-700 text-2xl font-bold">조건에 맞는 학생이 없습니다.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-0">
              {members?.members.map((member: Member) => (
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

      <section className="col-span-5 bg-main-100 flex h-184.75 flex-col justify-center overflow-hidden rounded-2xl px-[39px] pt-[36px] pb-[42px]">
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
                </div>
              </div>
            </div>

            <div className="mb-[47px] flex h-[281px] w-[272px] flex-col items-center justify-center rounded-xl bg-white">
              <div className="text-center">
                <span className="text-main-700 text-4xl font-semibold">{totalScore?.totalScore}점</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-[12px]">
              <Button
                variant="border"
                onClick={() => setOpenModal('score')}
                className='border-main-500 text-main-500 font-semibold'
              >
                점수 변경
              </Button>
              <Button
                variant="border"
                onClick={() => setIsScoreDetailModalOpen(true)}
                className="border-main-500 text-main-500 font-semibold"
              >
                부분 점수 확인
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

      <PendingScoresModal
        isOpen={isPendingScoresModalOpen}
        onClose={() => setIsPendingScoresModalOpen(false)}
        memberId={selectedMember?.id ?? null}
        member={selectedMember}
      />

      {openModal === 'score' && selectedMember ? (
        <ScoreEdit
          selectedMember={selectedMember}
          onClose={() => setOpenModal(null)}
          onOpenVolunteer={() => setOpenModal('volunteer')}
          onOpenAcademic={() => setOpenModal('academic')}
        />
      ) : null}

      {openModal === 'volunteer' && selectedMember ? (
        <VolunteerScore
          selectedMember={selectedMember}
          onBack={() => setOpenModal('score')}
          onSaveSuccess={() => setOpenModal('score')}
        />
      ) : null}

      {openModal === 'academic' && selectedMember ? (
        <AcademicScoreEdit
          selectedMember={selectedMember}
          onBack={() => setOpenModal('score')}
          onSaveSuccess={() => setOpenModal('score')}
        />
      ) : null}
    </div>
  );
}
