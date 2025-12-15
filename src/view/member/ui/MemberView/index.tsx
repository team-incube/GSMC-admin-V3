'use client';

import ScoreEdit from '@/widget/member/ui/ScoreEdit';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Filter from '@/shared/asset/svg/Filter';
import QuestionMark from '@/shared/asset/svg/QuestionMark';
import MemberSearchModal from '@/widget/member/ui/MemberSearchModal';
import { getMemberSearch } from '@/feature/member/api/getMemberSearch';
import type { Member, MemberSearchParams } from '@/feature/member/model/types';
import { getTotalScore } from '@/feature/member/api/getTotalScore';
import VolunteerScore from '@/widget/member/ui/VolunteerScoreEdit';
import AcademicScoreEdit from '@/widget/member/ui/AcademicScoreEdit';

export default function MemberView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchParams, setSearchParams] = useState<MemberSearchParams>({
    limit: 20,
    page: 0,
    sortBy: 'ASC',
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['members', searchParams],
    queryFn: () => getMemberSearch(searchParams),
  });

  const members = (data?.members || []).filter((m) => m.role === 'STUDENT');
  const totalElements = data?.totalElements || 0;

  const { data: totalScore = 0 } = useQuery({
    queryKey: ['totalScore', selectedMember?.id],
    queryFn: () => getTotalScore(selectedMember!.id),
    enabled: !!selectedMember,
  });

  const handleSearch = (params: { name?: string; grade?: number; classNumber?: number }) => {
    setSearchParams({
      ...searchParams,
      ...params,
      page: 0,
    });
    setIsModalOpen(false);
  };

  const [isScoreEditOpen, setIsScoreEditOpen] = useState(false);
  const [isVolunteerEditOpen, setIsVolunteerEditOpen] = useState(false);
  const [isAcademicEditOpen, setIsAcademicEditOpen] = useState(false);

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
            <p className="text-main-700 text-2xl font-semibold">{totalElements}</p>
            <p className="text-base font-semibold text-black">명</p>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="cursor-pointer transition-opacity hover:opacity-70"
            aria-label="학생 검색"
          >
            <Filter />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-10 pb-6">
          {members.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-main-700 text-2xl font-bold">조건에 맞는 학생이 없습니다.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-0">
              {members.map((member: Member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="cursor-pointer rounded-xl px-8 py-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-600">{member.name}</p>
                    <p className="text-lg font-semibold text-gray-600">
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
                <span className="text-main-700 text-4xl font-semibold">{`${totalScore}점`}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-[12px]">
              <button
                onClick={() => setIsScoreEditOpen(true)}
                className="border-main-500 text-main-500 h-[52px] w-[272px] rounded-xl border text-lg font-semibold"
              >
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

      <MemberSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={handleSearch}
      />
      {isScoreEditOpen && selectedMember ? (
        <ScoreEdit
          selectedMember={selectedMember}
          onClose={() => setIsScoreEditOpen(false)}
          onOpenVolunteer={() => {
            setIsScoreEditOpen(false);
            setIsVolunteerEditOpen(true);
          }}
          onOpenAcademic={() => {
            setIsScoreEditOpen(false);
            setIsAcademicEditOpen(true);
          }}
        />
      ) : null}

      {isVolunteerEditOpen && selectedMember ? (
        <VolunteerScore
          selectedMember={selectedMember}
          onBack={() => {
            setIsVolunteerEditOpen(false);
            setIsScoreEditOpen(true);
          }}
          onSuccess={() => {
            setIsVolunteerEditOpen(false);
            setIsScoreEditOpen(true);
          }}
        />
      ) : null}
      {isAcademicEditOpen && selectedMember ? (
        <AcademicScoreEdit
          selectedMember={selectedMember}
          onBack={() => {
            setIsAcademicEditOpen(false);
            setIsScoreEditOpen(true);
          }}
          onSuccess={() => {
            setIsAcademicEditOpen(false);
            setIsScoreEditOpen(true);
          }}
        />
      ) : null}
    </div>
  );
}
