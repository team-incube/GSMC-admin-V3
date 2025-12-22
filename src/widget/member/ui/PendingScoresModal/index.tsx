'use client';

import { useState } from 'react';

import ModalWrapper from '@/shared/ui/ModalWrapper';
import ScoreReviewModal from '@/widget/member/ui/ScoreReviewModal';

import type { Member } from '@/feature/member/model/types';
import { usePendingScores } from '@/feature/member/model/hooks/usePendingScores';
import type { PendingScore } from '@/feature/member/model/domain/pendingScore.type';
import Button from '@/shared/ui/Button';

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
  const [selectedScore, setSelectedScore] = useState<PendingScore | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const { scores, isLoading, error, isUnread, markAsViewed } = usePendingScores(memberId, isOpen);

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
                ) : scores.length === 0 ? (
                  <div className="flex justify-center py-8">
                    <p className="text-gray-600">심사 대기 중인 항목이 없습니다</p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {scores.map((score) => {
                      const date =
                        score.updatedAt &&
                        new Date(score.updatedAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        });

                      return (
                        <div
                          key={score.scoreId}
                          className="flex items-center justify-between border-b border-gray-400 px-5 py-6"
                        >
                          <div className="flex items-center gap-[12px]">
                            <p className="text-lg font-semibold text-gray-600">
                              {score.categoryName}
                            </p>
                            {score.scoreStatus === 'PENDING' && isUnread(score.scoreId) && (
                              <span className="h-2 w-2 rounded-full bg-red-500" />
                            )}
                          </div>

                          <div className="flex items-center gap-[16px]">
                            {date ? <p className="text-base text-gray-500">{date}</p> : null}
                            <button
                              className="text-main-500 border-main-500 cursor-pointer rounded-lg border px-3 py-1 text-lg leading-[26px] font-semibold"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedScore(score);
                                setIsReviewModalOpen(true);
                                markAsViewed(score.scoreId);
                              }}
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

              <Button
                onClick={onClose}
                variant="border"
                className="text-main-500 border-main-500 font-semibold"
              >
                뒤로가기
              </Button>
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
