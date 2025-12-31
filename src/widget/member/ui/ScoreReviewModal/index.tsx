'use client';

import ModalWrapper from '@/shared/ui/ModalWrapper';

import type { MemberType } from '@/entities/member/model/member';
import type { ScoreType } from '@/entities/score/model/score';
import Input from '@/shared/ui/Input';
import getStudentCode from '@/shared/lib/getStudentCode';
import FileUploader from '@/shared/ui/FileUploader';
import Textarea from '@/shared/ui/Textarea';
import { useApproveScore } from '@/entities/score/model/useApproveScore';
import { useRejectScore } from '@/entities/score/model/useRejectScore';
import { useState } from 'react';
import { useGetScoreById } from '@/entities/score/model/useGetScoreById';
interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: ScoreType;
  member: MemberType;
}

export default function ReviewModal({
  isOpen,
  onClose,
  score,
  member,
}: ReviewModalProps) {
  const [isRejectMode, setIsRejectMode] = useState(false);
  const { data: scores } = useGetScoreById({ scoreId: score.scoreId });
  const [rejectionReason, setRejectionReason] = useState(scores?.rejectionReason || '');
  const { mutate: approve, isPending: isApproving } = useApproveScore()
  const { mutate: reject, isPending: isRejecting } = useRejectScore()

  const handleApprove = () => {
    approve({ scoreId: score.scoreId }, {
      onSettled: () => {
        onClose()
        setIsRejectMode(false)
      }
    });
  }

  const handleReject = () => {
    reject({ scoreId: score.scoreId, rejectionReason }, {
      onSettled: () => {
        onClose()
        setIsRejectMode(false)
      }
    });
  }

  return (
    isOpen ?
      <ModalWrapper className="w-full flex flex-col gap-4 max-w-150 px-25 py-15" onClose={onClose}>
        <div className="mb-7 flex flex-col justify-center">
          <h2 className="flex justify-center text-[32px] font-semibold text-gray-900">
            {scores?.categoryNames.koreanName}
          </h2>
          <p className="flex justify-end text-sm text-gray-400 tabular-nums">
            {getStudentCode({ grade: member.grade, classNumber: member.classNumber, number: member.number })} {member.name}
          </p>
        </div>

        {scores?.categoryNames.englishName === 'PROJECT_PARTICIPATION' ? (
          <>
            <Input
              label="주제"
              defaultValue={scores?.evidence?.title || scores?.activityName}
              readOnly
            />

            <Textarea
              label='내용'
              defaultValue={scores?.evidence?.content}
              readOnly
            />

            <FileUploader
              label="첨부된 파일"
              uploadedFiles={scores?.file ? [scores?.file] : []}
              readOnly
            />
          </>
        ) : (
          <>
            <Input
              label={scores?.activityName ? "활동명" : "점수"}
              defaultValue={scores?.activityName || scores?.scoreValue}
              readOnly
            />

            <FileUploader
              label="첨부된 파일"
              uploadedFiles={scores?.file ? [scores?.file] : []}
              readOnly
            />
            {
              !isRejectMode && scores?.rejectionReason ? (
                <Textarea
                  label='작성된 반려 사유'
                  defaultValue={scores?.rejectionReason}
                  readOnly
                  disabled
                />
              ) : null
            }
          </>
        )}

        {isRejectMode ? (
          <Textarea
            label='반려 사유'
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="반려 사유를 입력해주세요"
          />
        ) : null}

        <div className="flex flex-col gap-3">
          {!isRejectMode ? (
            <>
              <button
                onClick={() => onClose()}
                className="text-main-500 border-main-500 h-12 w-full cursor-pointer rounded-lg border bg-white text-base font-medium"
              >
                뒤로가기
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="bg-main-500 h-12 flex-1 cursor-pointer rounded-lg text-base font-semibold text-white disabled:opacity-50"
                >
                  {isApproving ? '처리 중...' : '통과'}
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
                onClick={() => setIsRejectMode(false)}
                className="text-main-500 border-main-500 h-12 w-full cursor-pointer rounded-lg border bg-white text-base font-medium"
              >
                뒤로가기
              </button>
              <button
                onClick={handleReject}
                disabled={isRejecting}
                className="bg-main-500 h-12 w-full cursor-pointer rounded-lg text-base font-semibold text-white disabled:opacity-50"
              >
                {isRejecting ? '처리 중...' : '완료'}
              </button>
            </div>
          )}
        </div>
      </ModalWrapper> : null
  );
}
