'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ModalWrapper from '@/shared/ui/ModalWrapper';
import ScoreReviewModal from '@/widget/member/ui/ScoreReviewModal';
import type { ScoreByCategory, ScoreDetail, Member } from '@/feature/member/model/types';
import { getPendingScores } from '@/feature/member/api/getPendingScores';

interface PendingScoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: number | null;
  member: Member | null;
}

export default function PendingScoresModal({
  isOpen,
  onClose,
  memberId,
  member,
}: PendingScoresModalProps) {
  const [selectedScore, setSelectedScore] = useState<
    (ScoreDetail & { categoryName: string }) | null
  >(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [viewedScores, setViewedScores] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window !== 'undefined' && memberId) {
      const saved = localStorage.getItem(`viewedScores_${memberId}`);
      if (saved) {
        setViewedScores(new Set(JSON.parse(saved)));
      }
    }
  }, [memberId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && memberId && viewedScores.size > 0) {
      localStorage.setItem(`viewedScores_${memberId}`, JSON.stringify(Array.from(viewedScores)));
    }
  }, [viewedScores, memberId]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['pendingScores', memberId],
    queryFn: () => getPendingScores(memberId!),
    enabled: !!memberId && isOpen,
  });

  const allPendingScores: (ScoreDetail & { categoryName: string })[] = [];

  data?.categories.forEach((category: ScoreByCategory) => {
    category.scores.forEach((score: ScoreDetail) => {
      allPendingScores.push({
        ...score,
        categoryName: category.categoryNames.koreanName,
      });
    });
  });

  if (!isOpen) return null;

  return (
    <>
      {!isReviewModalOpen && (
        <div className="fixed inset-0 z-50" onClick={onClose}>
          <ModalWrapper className="w-[600px] px-15 py-10">
            <div onClick={(e) => e.stopPropagation()}>
              <h2 className="text-main-700 mb-3 text-2xl font-semibold">심사 요청</h2>

              <div className="mb-[30px] max-h-[378px] overflow-y-auto rounded-xl border border-gray-400">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <p className="text-gray-600">로딩중...</p>
                  </div>
                ) : error ? (
                  <div className="flex justify-center py-8">
                    <p className="text-red-600">데이터를 불러오는데 실패했습니다</p>
                  </div>
                ) : allPendingScores.length === 0 ? (
                  <div className="flex justify-center py-8">
                    <p className="text-gray-600">심사 대기 중인 항목이 없습니다</p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {allPendingScores.map((score, index) => {
                      const getDateString = () => {
                        if (score.updatedAt) {
                          return new Date(score.updatedAt).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          });
                        }
                      };

                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b border-gray-400 px-5 py-6"
                        >
                          <div className="flex items-center gap-[12px]">
                            <p className="text-lg font-semibold text-gray-600">
                              {score.categoryName}
                            </p>
                            {score.scoreStatus === 'PENDING' &&
                              !viewedScores.has(score.scoreId) && (
                                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                              )}
                          </div>
                          <div className="flex items-center gap-[16px]">
                            {score.updatedAt && (
                              <p className="text-base text-gray-500">{getDateString()}</p>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedScore(score);
                                setIsReviewModalOpen(true);
                                setViewedScores((prev) => new Set(prev).add(score.scoreId));
                              }}
                              className="text-main-500 border-main-500 cursor-pointer rounded-lg border px-3 py-1 text-lg leading-[26px] font-semibold"
                            >
                              보기
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-main-500 border-main-500 h-[52px] w-full cursor-pointer rounded-xl border bg-white text-lg font-semibold transition-colors"
              >
                뒤로가기
              </button>
            </div>
          </ModalWrapper>
        </div>
      )}

      <ScoreReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedScore(null);
        }}
        score={selectedScore}
        memberId={memberId}
        member={member}
      />
    </>
  );
}
