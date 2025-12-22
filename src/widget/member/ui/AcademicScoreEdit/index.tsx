'use client';

import type { Member } from '@/feature/member/model/types';
import { postAcademicScore } from '@/feature/member/api/postScoresByAcademic';
import ScoreEditModal from '@/widget/member/ui/ScoreEditModal';

interface AcademicScoreProps {
  selectedMember: Member;
  onBack: () => void;
  onSaveSuccess: () => void;
}

export default function AcademicScoreEdit(props: AcademicScoreProps) {
  return (
    <ScoreEditModal
      {...props}
      title="교과성적 점수 변경"
      label="교과 성적 입력"
      placeholder="교과 성적 평균 등급 입력"
      warningMessage="교과 성적 평균 등급을 입력해주세요."
      mutationFn={postAcademicScore}
    />
  );
}
