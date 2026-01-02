'use client';


import ModalWrapper from '@/shared/ui/ModalWrapper';

import type { MemberType } from '@/entities/member/model/member';
import { useGetScoresByCategoryById } from '@/entities/score/model/useGetScoresByCategoryById';
import Button from '@/shared/ui/Button';
import { cn } from '@/shared/lib/cn';
import { useEffect, useRef, useState } from 'react';
import ReviewModal from '../ScoreReviewModal';
import { ScoreType } from '@/entities/score/model/score';
import { formatDate } from '@/shared/lib/formatDate';

interface ScoreListModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberType
}

export default function ScoreListModal({
  isOpen,
  onClose,
  member,
}: ScoreListModalProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedScore, setSelectedScore] = useState<ScoreType | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const savedScrollPosition = useRef<number>(0);

  const { data: scores, isLoading, isError } = useGetScoresByCategoryById({ memberId: member.id });

  const saveScrollPosition = () => {
    if (scrollRef.current) {
      savedScrollPosition.current = scrollRef.current.scrollTop;
    }
  };

  useEffect(() => {
    if (!isReviewModalOpen && scrollRef.current) {
      scrollRef.current.scrollTop = savedScrollPosition.current;
    }
  }, [isReviewModalOpen]);

  const handleReviewClick = (score: ScoreType) => {
    saveScrollPosition();
    setSelectedScore(score);
    setIsReviewModalOpen(true);
  };

  const handleReviewBack = () => {
    setIsReviewModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsReviewModalOpen(false);
    setSelectedScore(null);
    onClose();
  };

  return (
    <div>
      {isReviewModalOpen ? (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={handleReviewBack}
          score={selectedScore!}
          member={member}
        />
      ) : (
        isOpen && (
          <ModalWrapper className="flex flex-col gap-4 w-full max-w-150 px-15 py-10" onClose={handleCloseModal}>
            <h2 className="text-main-700 mb-3 text-2xl font-semibold">심사 요청</h2>

            <div ref={scrollRef} className="mb-[30px] max-h-[378px] overflow-y-auto rounded-xl border border-gray-400">
              {isLoading ? (
                <div className="flex justify-center py-8 h-full min-h-100">
                  <p className="text-gray-600">로딩중...</p>
                </div>
              ) : isError ? (
                <div className="flex justify-center py-8">
                  <p className="text-red-600">데이터를 불러오는데 실패했습니다</p>
                </div>
              ) : scores?.length === 0 ? (
                <div className="flex justify-center py-8">
                  <p className="text-gray-600">심사 대기 중인 항목이 없습니다</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {scores?.map((category) => (
                    <div key={category.categoryType} className="w-full flex flex-col">
                      <div className="flex justify-between px-5 py-2 bg-gray-50 text-sm font-bold text-gray-500">
                        <p>{category.categoryNames.koreanName}</p>
                      </div>
                      {category.scores.length === 0 ? (
                        <div className="flex justify-center py-4">
                          <p className="text-gray-600">심사 대기 중인 항목이 없습니다</p>
                        </div>
                      ) : (category.scores.map((score) => (
                        <article
                          key={score.scoreId}
                          className="flex justify-between items-center w-full px-5 py-4 border-b border-gray-100 last:border-none gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className={cn(
                              "w-2 h-2 shrink-0 rounded-full",
                              {
                                "bg-main-500": score.scoreStatus === "APPROVED",
                                "bg-gray-600": score.scoreStatus === "PENDING",
                                "bg-error": score.scoreStatus === "REJECTED"
                              }
                            )} />
                            <p className="text-body2 wrap-break-word overflow-hidden">
                              {score.activityName || score.categoryNames.koreanName}
                            </p>
                          </div>
                          <div>
                            <p className="text-body2 text-black/40 wrap-break-word overflow-hidden">
                              {formatDate(score.updatedAt)}
                            </p>
                          </div>
                          <Button
                            variant="border"
                            className="w-auto px-3 py-0.5 shrink-0"
                            onClick={() => handleReviewClick(score)}
                          >
                            보기
                          </Button>
                        </article>
                      )))}

                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={handleCloseModal}
              variant="border"
              className="text-main-500 border-main-500 font-semibold"
            >
              뒤로가기
            </Button>
          </ModalWrapper>
        )
      )}
    </div>
  );
}