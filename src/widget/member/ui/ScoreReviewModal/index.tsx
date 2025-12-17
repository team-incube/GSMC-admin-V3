'use client';

import { useState } from 'react';

import ModalWrapper from '@/shared/ui/ModalWrapper';
import ReadOnlyInput from '@/shared/ui/ReadOnlyInput';
import FileViewButton from '@/shared/ui/FileViewButton';

import type { ScoreDetail, Member } from '@/feature/member/model/types';
import { useScoreReviewMutation } from '@/feature/member/model/hooks/useScoreReviewMutation';
import { useScoreReview } from '@/feature/member/model/hooks/useScoreReview';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: (ScoreDetail & { categoryName: string }) | null;
  memberId: number | null;
  member: Member | null;
}

export default function ReviewModal({
  isOpen,
  onClose,
  score,
  memberId,
  member,
}: ReviewModalProps) {
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejectMode, setIsRejectMode] = useState(false);

  const {
    scoreDetail,
    hasToeicAcademy,
    isLoading,
    isProjectCategory,
    isToeicCategory,
    handleFileView: handleFileViewInternal,
  } = useScoreReview({
    scoreId: score?.scoreId ?? null,
    memberId,
    categoryName: score?.categoryNames.englishName ?? null,
    isOpen,
  });

  const { approve, reject } = useScoreReviewMutation(memberId);

  if (!isOpen || !score) return null;

  const handleApprove = () => {
    approve.mutate(score.scoreId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleReject = () => {
    reject.mutate(
      { scoreId: score.scoreId, reason: rejectionReason },
      {
        onSuccess: () => {
          setRejectionReason('');
          setIsRejectMode(false);
          onClose();
        },
      },
    );
  };

  const handleCancel = () => {
    setRejectionReason('');
    setIsRejectMode(false);
    onClose();
  };

  const handleFileView = (fileId: number) => {
    handleFileViewInternal(fileId);
  };

  return (
    <div className="fixed inset-0 z-[60]" onClick={handleCancel}>
      <ModalWrapper
        className={`w-[600px] px-25 py-15 ${isRejectMode ? 'max-h-fit' : 'max-h-[700px]'}`}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <div className="mb-7 flex flex-col justify-center">
            <h2 className="flex justify-center text-[32px] font-semibold text-gray-900">
              {score.categoryNames.koreanName}
            </h2>
            <p className="flex justify-end text-sm text-gray-400">
              {member
                ? `${member.grade}${member.classNumber}${String(member.number).padStart(
                    2,
                    '0',
                  )} ${member.name}`
                : ''}
            </p>
          </div>

          {score.categoryNames.englishName === 'PROJECT_PARTICIPATION' ||
          score.categoryNames.englishName === 'PROJECT-PARTICIPATION' ? (
            <>
              <ReadOnlyInput
                label="주제"
                value={scoreDetail?.evidence?.title || score.activityName || ''}
              />

              <div className="mb-3">
                <label className="mb-2 block text-base font-medium text-gray-900">내용</label>
                <div className="max-h-[200px] min-h-[120px] overflow-y-auto rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900">
                  {scoreDetail?.evidence?.content || '내용이 없습니다'}
                </div>
              </div>

              <FileViewButton
                fileId={scoreDetail?.evidence?.files?.[0]?.id}
                isLoading={isLoading}
                label="첨부된 이미지 보기"
                fileCount={scoreDetail?.evidence?.files?.length}
                onView={handleFileView}
              />
            </>
          ) : (
            <>
              <ReadOnlyInput
                label={score.categoryNames.koreanName}
                value={score.activityName || score.scoreValue || ''}
              />

              <FileViewButton
                fileId={scoreDetail?.file?.id}
                isLoading={isLoading}
                label="첨부된 파일 보기"
                onView={handleFileView}
              />

              {isToeicCategory && hasToeicAcademy !== undefined ? (
                <ReadOnlyInput label="토익사관학교" value={hasToeicAcademy ? '참여' : '미참여'} />
              ) : null}
            </>
          )}

          {isRejectMode ? (
            <div className="mb-11">
              <label className="mb-2 block text-base font-medium text-gray-900">반려 사유</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="반려 사유를 입력해주세요"
                className="h-30 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none"
              />
            </div>
          ) : null}

          <div className="flex flex-col gap-3">
            {!isRejectMode ? (
              <>
                <button
                  onClick={handleCancel}
                  className="text-main-500 border-main-500 h-12 w-full cursor-pointer rounded-lg border bg-white text-base font-medium"
                >
                  뒤로가기
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={handleApprove}
                    disabled={approve.isPending}
                    className="bg-main-500 h-12 flex-1 cursor-pointer rounded-lg text-base font-semibold text-white disabled:opacity-50"
                  >
                    {approve.isPending ? '처리 중...' : '통과'}
                  </button>
                  <button
                    onClick={() => setIsRejectMode(true)}
                    className="bg-error h-12 flex-1 cursor-pointer rounded-lg text-base font-semibold text-white"
                  >
                    탈락
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="text-main-500 border-main-500 h-12 w-full cursor-pointer rounded-lg border bg-white text-base font-medium"
                >
                  뒤로가기
                </button>
                <button
                  onClick={handleReject}
                  disabled={reject.isPending}
                  className="bg-main-500 h-12 w-full cursor-pointer rounded-lg text-base font-semibold text-white disabled:opacity-50"
                >
                  {reject.isPending ? '처리 중...' : '완료'}
                </button>
              </div>
            )}
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}
