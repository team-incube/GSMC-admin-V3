'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ModalWrapper from '@/shared/ui/ModalWrapper';
import type { ScoreDetail, Member } from '@/feature/member/model/types';
import { approveScore, rejectScore } from '@/feature/member/api/scoreActions';
import { getScoreDetail } from '@/feature/member/api/getScoreDetail';
import File from '@/shared/asset/svg/File';

interface ScoreReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: (ScoreDetail & { categoryName: string }) | null;
  memberId: number | null;
  member: Member | null;
}

export default function ScoreReviewModal({
  isOpen,
  onClose,
  score,
  memberId,
  member,
}: ScoreReviewModalProps) {
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejectMode, setIsRejectMode] = useState(false);
  const queryClient = useQueryClient();

  const { data: scoreDetail } = useQuery({
    queryKey: ['scoreDetail', score?.scoreId],
    queryFn: () => getScoreDetail(score!.scoreId),
    enabled: !!score?.scoreId && isOpen,
  });

  const approveMutation = useMutation({
    mutationFn: (scoreId: number) => approveScore(scoreId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingScores', memberId] });
      queryClient.invalidateQueries({ queryKey: ['scoresByCategory', memberId] });
      queryClient.invalidateQueries({ queryKey: ['totalScore', memberId] });
      alert('승인되었습니다.');
      onClose();
    },
    onError: () => {
      alert('승인에 실패했습니다.');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ scoreId, reason }: { scoreId: number; reason: string }) =>
      rejectScore(scoreId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingScores', memberId] });
      queryClient.invalidateQueries({ queryKey: ['scoresByCategory', memberId] });
      queryClient.invalidateQueries({ queryKey: ['totalScore', memberId] });
      alert('반려되었습니다.');
      setRejectionReason('');
      setIsRejectMode(false);
      onClose();
    },
    onError: () => {
      alert('반려에 실패했습니다.');
    },
  });

  if (!isOpen || !score) return null;

  const handleApprove = () => {
    approveMutation.mutate(score.scoreId);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('반려 사유를 입력해주세요.');
      return;
    }
    rejectMutation.mutate({ scoreId: score.scoreId, reason: rejectionReason });
  };

  const handleCancel = () => {
    setRejectionReason('');
    setIsRejectMode(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60]" onClick={handleCancel}>
      <ModalWrapper className="max-h-[628px] w-[600px] px-25 py-15">
        <div onClick={(e) => e.stopPropagation()}>
          <div className="mb-7 flex flex-col justify-center">
            <h2 className="flex justify-center text-[32px] font-semibold text-gray-900">
              {score.categoryNames.koreanName}
            </h2>
            <p className="flex justify-end text-sm text-gray-400">
              {member
                ? `${member.grade}${member.classNumber}${String(member.number).padStart(2, '0')} ${member.name}`
                : ''}
            </p>
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-base font-medium text-gray-900">
              {score.categoryNames.koreanName}
            </label>
            <input
              type="text"
              value={score.activityName || score.categoryNames.koreanName}
              readOnly
              className="h-[52px] w-full rounded-lg border border-gray-300 px-4 text-base text-gray-900"
            />
          </div>

          <div className="mb-3">
            <button className="text-main-500 flex h-[52px] w-full items-center gap-2 rounded-lg border border-gray-300 p-4 text-base font-medium">
              <File />
              첨부된 파일 보기
            </button>
          </div>

          {isRejectMode && (
            <div className="mb-11">
              <label className="mb-2 block text-base font-medium text-gray-900">반려 사유</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="반려 사유를 입력해주세요"
                className="h-30 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none"
              />
            </div>
          )}

          <div className="flex flex-col gap-3">
            {!isRejectMode ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={approveMutation.isPending || rejectMutation.isPending}
                  className="text-main-500 border-main-500 h-12 w-full cursor-pointer rounded-lg border bg-white text-base font-medium disabled:opacity-50"
                >
                  뒤로가기
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={handleApprove}
                    disabled={approveMutation.isPending}
                    className="bg-main-500 h-12 flex-1 cursor-pointer rounded-lg text-base font-semibold text-white disabled:opacity-50"
                  >
                    {approveMutation.isPending ? '처리 중...' : '통과'}
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
              <div className="flex flex-row gap-3">
                <button
                  onClick={handleCancel}
                  disabled={approveMutation.isPending || rejectMutation.isPending}
                  className="text-main-500 border-main-500 h-12 w-full cursor-pointer rounded-lg border bg-white text-base font-medium disabled:opacity-50"
                >
                  뒤로가기
                </button>
                <button
                  onClick={handleReject}
                  disabled={rejectMutation.isPending}
                  className="bg-main-500 border-main-500 h-12 w-full cursor-pointer rounded-lg text-base font-semibold text-white disabled:opacity-50"
                >
                  {rejectMutation.isPending ? '처리 중...' : '완료'}
                </button>
              </div>
            )}
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}
