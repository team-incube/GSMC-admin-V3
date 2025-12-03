'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Filter from '@/shared/asset/svg/Filter';
import QuestionMark from '@/shared/asset/svg/QuestionMark';
import MemberSearchModal from '@/widget/member/ui/MemberSearchModal';
import { getMemberSearch } from '@/feature/member/api/getMemberSearch';
import type { Member, MemberSearchParams } from '@/feature/member/model/types';

export default function MemberView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchParams, setSearchParams] = useState<MemberSearchParams>({
    limit: 20,
    page: 0,
    sortBy: 'ASC',
  });

  const { data } = useQuery({
    queryKey: ['members', searchParams],
    queryFn: () => getMemberSearch(searchParams),
  });

  const members = data?.members || [];
  const totalElements = data?.totalElements || 0;

  const handleSearch = (params: { name?: string; grade?: number; classNumber?: number }) => {
    setSearchParams({
      ...searchParams,
      ...params,
      page: 0,
    });
    setIsModalOpen(false);
  };

  return (
    <>
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

        <div className="bg-main-100 flex h-184.75 w-87.5 flex-col items-center justify-center overflow-hidden rounded-2xl">
          {selectedMember ? (
            <div className="w-full px-10 py-8">
              <h3 className="mb-6 text-2xl font-semibold text-gray-800">{selectedMember.name}</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm text-gray-500">학번</p>
                  <p className="text-lg font-medium">
                    {selectedMember.grade}
                    {selectedMember.classNumber}
                    {String(selectedMember.number).padStart(2, '0')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">이메일</p>
                  <p className="text-lg font-medium">{selectedMember.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">권한</p>
                  <p className="text-lg font-medium">{selectedMember.role}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <QuestionMark />
              <p className="mt-8 text-center text-2xl font-semibold text-gray-600">
                학생을 선택해주세요
              </p>
            </>
          )}
        </div>
      </div>

      <MemberSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={handleSearch}
      />
    </>
  );
}
