'use client';

import { postAcademicScore } from '@/feature/member/api/postScoresByAcademic';
import { useState } from 'react';
import { Member } from '@/feature/member/model/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Delete from '@/shared/asset/svg/Delete';

interface AcademicScoreProps {
  selectedMember: Member;
  onBack: () => void;
  onSuccess: () => void;
}

interface Subject {
  id: number;
  subject: string;
  semester1: string;
  semester2: string;
}

export default function AcademicScoreEdit({
  selectedMember,
  onBack,
  onSuccess,
}: AcademicScoreProps) {
  const queryClient = useQueryClient();

  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, subject: '', semester1: '', semester2: '' },
    { id: 2, subject: '', semester1: '', semester2: '' },
    { id: 3, subject: '', semester1: '', semester2: '' },
  ]);

  const { mutate, isPending } = useMutation({
    mutationFn: postAcademicScore,
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
    const value = subjects[0]?.semester1;

    if (!value) {
      alert('등급을 선택하세요');
      return;
    }

    mutate({
      value,
      memberId: selectedMember.id,
    });
  };

  const addSubject = () => {
    setSubjects((prev) => [...prev, { id: Date.now(), subject: '', semester1: '', semester2: '' }]);
  };

  const removeSubject = (id: number) => {
    if (subjects.length === 1) return;
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const update = (id: number, key: keyof Subject, value: string) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="flex h-[515px] w-[720px] flex-col rounded-[20px] bg-white px-[60px] py-[40px]">
        <p className="text-main-700 text-2xl font-semibold">교과성적 점수 변경</p>

        <div className="mt-6 flex flex-1 flex-col">
          <p className="mb-2">교과 성적 입력</p>

          <div className="w-[600px] rounded-lg border border-gray-400">
            <div className="bg-main-50 grid grid-cols-[184px_184px_184px_48px] text-center">
              <div className="flex h-[46px] items-center justify-center border-r border-gray-400">
                과목명
              </div>
              <div className="flex h-[46px] items-center justify-center border-r border-gray-400">
                1학기
              </div>
              <div className="flex h-[46px] items-center justify-center border-r border-gray-400">
                2학기
              </div>
              <div />
            </div>

            {subjects.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-[184px_184px_184px_48px] border-t border-gray-400"
              >
                <div className="border-r border-gray-400 px-8 py-3">
                  <input
                    className="h-[36px] w-[120px] rounded-xl border border-gray-500 px-3 text-sm placeholder:text-gray-500"
                    placeholder="과목명 입력"
                    value={s.subject}
                    onChange={(e) => update(s.id, 'subject', e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-center border-r border-gray-400">
                  <select
                    className="h-[36px] w-[131px] rounded-lg border px-2 text-sm"
                    value={s.semester1}
                    onChange={(e) => update(s.id, 'semester1', e.target.value)}
                  >
                    <option value="">석차등급 선택</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                <div className="flex items-center justify-center border-r border-gray-400 px-6 py-3">
                  <select
                    className="h-[36px] w-[131px] rounded-lg border px-2 text-sm"
                    value={s.semester2}
                    onChange={(e) => update(s.id, 'semester2', e.target.value)}
                  >
                    <option value="">석차등급 선택</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                <div className="flex items-center justify-center">
                  <button onClick={() => removeSubject(s.id)} disabled={subjects.length === 1}>
                    <Delete />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addSubject}
              className="h-[44px] w-[600px] border-t border-gray-400 text-sm text-gray-500"
            >
              + 과목 추가
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onBack}
            className="border-main-500 text-main-500 h-[56px] w-[294.5px] rounded-xl border text-lg font-semibold"
          >
            뒤로가기
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-main-500 h-[56px] w-[294.5px] rounded-xl text-lg font-semibold text-white"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
