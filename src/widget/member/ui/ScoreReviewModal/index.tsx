'use client';

import ModalWrapper from '@/shared/ui/ModalWrapper';

import type { MemberType } from '@/entities/member/model/member';
import type { ScoreType } from '@/entities/score/model/score';
import Input from '@/shared/ui/Input';
import getStudentCode from '@/shared/lib/getStudentCode';
import FileUploader from '@/shared/ui/FileUploader';
import Textarea from '@/shared/ui/Textarea';
import Dropdown from '@/shared/ui/Dropdown';
import { useApproveScore } from '@/entities/score/model/useApproveScore';
import { useRejectScore } from '@/entities/score/model/useRejectScore';
import { useState } from 'react';
import { useGetScoreById } from '@/entities/score/model/useGetScoreById';
import Link from 'next/link';

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
  const { mutate: approve, isPending: isApproving } = useApproveScore();
  const { mutate: reject, isPending: isRejecting } = useRejectScore();

  const handleApprove = () => {
    approve(
      { scoreId: score.scoreId },
      {
        onSettled: () => {
          onClose();
          setIsRejectMode(false);
        },
      }
    );
  };

  const handleReject = () => {
    reject(
      { scoreId: score.scoreId, rejectionReason },
      {
        onSettled: () => {
          onClose();
          setIsRejectMode(false);
        },
      }
    );
  };

  const renderCategoryInputs = () => {
    if (!scores) return null;

    const englishName = scores.categoryNames.englishName;
    const value = scores.activityName || scores.scoreValue?.toString() || '';

    // 1. 자격증 (Certificate)
    if (englishName === 'CERTIFICATE') {
      return (
        <>
          <Input label="자격증 이름" value={value} readOnly disabled />
          <FileUploader
            label="첨부된 자격증 인증서"
            uploadedFiles={scores.file ? [scores.file] : []}
            readOnly
          />
        </>
      );
    }

    // 2. TOPCIT
    if (englishName === 'TOPCIT') {
      return (
        <>
          <Input label="TOPCIT 점수" type="number" value={value} readOnly disabled />
          <FileUploader
            label="첨부된 TOPCIT 인증서"
            uploadedFiles={scores.file ? [scores.file] : []}
            readOnly
          />
        </>
      );
    }

    // 3. TOEIC
    if (englishName === 'TOEIC') {
      return (
        <>
          <Input label="TOEIC 점수" type="number" value={value} readOnly disabled />
          <FileUploader
            label="첨부된 성적표"
            uploadedFiles={scores.file ? [scores.file] : []}
            readOnly
          />
        </>
      );
    }

    // 4. JLPT
    if (englishName === 'JLPT') {
      return (
        <>
          <Dropdown
            label="JLPT 등급"
            options={[
              { label: 'N1', value: '1' },
              { label: 'N2', value: '2' },
              { label: 'N3', value: '3' },
              { label: 'N4', value: '4' },
              { label: 'N5', value: '5' },
            ]}
            value={value}
            onChange={() => { }}
            disabled
          />
          <FileUploader
            label="첨부된 성적증명서"
            uploadedFiles={scores.file ? [scores.file] : []}
            readOnly
          />
        </>
      );
    }

    // 5. TOEIC-ACADEMY (토익 사관학교)
    if (englishName === 'TOEIC-ACADEMY') {
      return (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="toeicAcademy"
            checked={value === 'true'}
            disabled
            className="h-4 w-4 accent-main-500"
          />
          <label htmlFor="toeicAcademy" className="text-sm font-medium">
            토익 사관학교 수료
          </label>
        </div>
      );
    }

    // 6. 독서활동 (Reading)
    if (englishName === 'READ-A-THON') {
      return (
        <>
          <Dropdown
            label="빛고을 독서마라톤"
            options={[
              { label: '거북이', value: '1' },
              { label: '악어', value: '2' },
              { label: '토끼', value: '3' },
              { label: '타조', value: '4' },
              { label: '사자', value: '5' },
              { label: '호랑이', value: '6' },
              { label: '월계관', value: '7' },
            ]}
            value={value}
            onChange={() => { }}
            disabled
          />
          <FileUploader
            label="첨부된 독서마라톤 완주증서"
            uploadedFiles={scores.file ? [scores.file] : []}
            readOnly
          />
        </>
      );
    }

    // 7. 봉사 (Volunteer)
    if (englishName === 'VOLUNTEER') {
      return <Input label="봉사 점수" type="number" value={value} readOnly disabled />;
    }

    // 8. 직업기초 능력평가 (NCS)
    if (englishName === 'NCS') {
      return (
        <>
          <Dropdown
            label="평균 등급"
            options={[
              { label: '1등급', value: '1' },
              { label: '2등급', value: '2' },
              { label: '3등급', value: '3' },
              { label: '4등급', value: '4' },
              { label: '5등급', value: '5' },
            ]}
            value={value}
            onChange={() => { }}
            disabled
          />
          <FileUploader
            label="첨부된 직기초 인증서"
            uploadedFiles={scores.file ? [scores.file] : []}
            readOnly
          />
        </>
      );
    }

    // 9. 수상경력 (Award)
    if (englishName === 'AWARD') {
      return (
        <>
          <Input label="수상경력 제목" value={value} readOnly disabled />
          <FileUploader
            label="첨부된 수상경력 증빙 파일"
            uploadedFiles={scores.file ? [scores.file] : []}
            readOnly
          />
        </>
      );
    }

    // 10. 뉴로우스쿨 참여 (Neuro School)
    if (englishName === 'NEWRROW-SCHOOL') {
      return (
        <>
          <Input type="number" label="회고온도" value={value} readOnly disabled />
          <FileUploader
            label="첨부된 증빙가능한 이미지"
            uploadedFiles={scores.file ? [scores.file] : []}
            readOnly
          />
        </>
      );
    }

    // 11. 교과성적 (Academic Grade)
    if (englishName === 'ACADEMIC-GRADE') {
      return (
        <>
          <Dropdown
            label="교과성적 등급"
            options={[
              { label: '1등급', value: '1' },
              { label: '2등급', value: '2' },
              { label: '3등급', value: '3' },
              { label: '4등급', value: '4' },
              { label: '5등급', value: '5' },
              { label: '6등급', value: '6' },
              { label: '7등급', value: '7' },
              { label: '8등급', value: '8' },
              { label: '9등급', value: '9' },
            ]}
            value={value}
            onChange={() => { }}
            disabled
          />
          <p className="text-xs text-gray-500">
            ※ 2025학년도 1학년: 5등급제 (1등급:9점, 2등급:8점...)
            <br />※ 2026학년도부터: 1,2학년 모두 5등급제
          </p>
        </>
      );
    }

    // 12. 프로젝트 참여 (Project Participation)
    if (englishName === 'PROJECT-PARTICIPATION') {
      return (
        <>
          <Input label="주제" value={scores.evidence?.title || scores.activityName || ''} readOnly disabled />
          <Textarea label="내용" value={scores.evidence?.content || ''} readOnly disabled />
          <FileUploader
            label="첨부된 파일"
            uploadedFiles={scores.file ? [scores.file] : []}
            readOnly
          />
        </>
      );
    }

    // 13. 외부활동 (External Activity)
    if (englishName === 'EXTERNAL-ACTIVITY') {
      return (
        <>
          <Input label="외부활동 제목" value={value} readOnly disabled />
          <FileUploader
            label="첨부된 외부활동 증빙 파일"
            uploadedFiles={scores.file ? [scores.file] : []}
            readOnly
          />
        </>
      );
    }

    // 기본 폼 (fallback)
    return (
      <>
        <Input label={scores.categoryNames.koreanName} value={value} readOnly disabled />
        {scores.file ? <FileUploader
          label="파일 첨부"
          uploadedFiles={[scores.file]}
          readOnly
        /> : null}
      </>
    );
  };

  return isOpen ? (
    <ModalWrapper className="w-full flex flex-col gap-4 max-w-150 max-h-200 px-25 py-15" onClose={onClose}>
      <div className="mb-7 flex flex-col justify-center">
        <h2 className="flex justify-center text-[32px] font-semibold text-gray-900">
          {scores?.categoryNames.koreanName}
        </h2>
        <p className="flex justify-end text-sm text-gray-400 tabular-nums">
          {getStudentCode({
            grade: member.grade,
            classNumber: member.classNumber,
            number: member.number,
          })}{' '}
          {member.name}
        </p>
      </div>

      <div className="flex flex-col h-full overflow-y-auto">
        {renderCategoryInputs()}

        {!isRejectMode && scores?.rejectionReason ? (
          <Textarea label="작성된 반려 사유" value={scores.rejectionReason} readOnly disabled />
        ) : null}

        {isRejectMode ? (
          <Textarea
            label="반려 사유"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="반려 사유를 입력해주세요"
          />
        ) : null}
      </div>

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
    </ModalWrapper>
  ) : null;
}