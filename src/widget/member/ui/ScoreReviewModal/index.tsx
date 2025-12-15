'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ModalWrapper from '@/shared/ui/ModalWrapper';
import ReadOnlyInput from '@/shared/ui/ReadOnlyInput';
import FileViewButton from '@/shared/ui/FileViewButton';
import type { ScoreDetail, Member } from '@/feature/member/model/types';
import { approveScore, rejectScore } from '@/feature/member/api/scoreActions';
import { getScoreDetail } from '@/feature/member/api/getScoreDetail';
import { getToeicAcademyScore } from '@/feature/member/api/getToeicAcademyScore';

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

  const { data: scoreDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: ['scoreDetail', score?.scoreId],
    queryFn: () => getScoreDetail(score!.scoreId),
    enabled: !!score?.scoreId && isOpen,
  });

  const isToeicCategory =
    score?.categoryNames.englishName === 'TOEIC' ||
    score?.categoryNames.englishName === 'TOEFL' ||
    score?.categoryNames.englishName === 'OPIC' ||
    score?.categoryNames.englishName === 'JLPT' ||
    score?.categoryNames.englishName === 'HSK';

  const { data: hasToeicAcademy } = useQuery({
    queryKey: ['toeicAcademy', memberId],
    queryFn: () => getToeicAcademyScore(memberId!),
    enabled: !!memberId && isOpen && isToeicCategory,
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

  const handleFileView = (fileId: number) => {
    try {
      const file =
        scoreDetail?.file?.id === fileId
          ? scoreDetail.file
          : scoreDetail?.evidence?.files?.find((f) => f.id === fileId);

      if (!file?.uri) {
        alert('파일 정보를 찾을 수 없습니다.');
        return;
      }

      let fileUrl: string;
      if (file.uri.startsWith('http')) {
        fileUrl = file.uri;
      } else {
        fileUrl = `http://gsmsv-1.yujun.kr:28644${file.uri}`;
      }

      const newWindow = window.open(fileUrl, '_blank');

      if (!newWindow) {
        alert('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
      }
    } catch {
      alert('파일을 열 수 없습니다.');
    }
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
                ? `${member.grade}${member.classNumber}${String(member.number).padStart(2, '0')} ${member.name}`
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
                isLoading={isLoadingDetail}
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
                isLoading={isLoadingDetail}
                label="첨부된 파일 보기"
                onView={handleFileView}
              />

              {score.categoryNames.englishName === 'TOEIC' && hasToeicAcademy !== undefined && (
                <ReadOnlyInput label="토익사관학교" value={hasToeicAcademy ? '참여' : '미참여'} />
              )}
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
