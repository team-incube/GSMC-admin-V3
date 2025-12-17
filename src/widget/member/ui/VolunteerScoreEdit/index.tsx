'use client';

import type { Member } from '@/feature/member/model/types';
import { postVolunteerScore } from '@/feature/member/api/postScoresByVolunteer';
import ScoreEditModal from '@/widget/member/ui/ScoreEditModal';

interface VolunteerScoreProps {
  selectedMember: Member;
  onBack: () => void;
  onSaveSuccess: () => void;
}

export default function VolunteerScoreEdit(props: VolunteerScoreProps) {
  return (
    <ScoreEditModal
      {...props}
      title="봉사 점수 변경"
      label="총 봉사 시간 입력"
      placeholder="교육과정 봉사활동 제외, 총 봉사 시간 입력"
      warningMessage="총 봉사 시간을 입력해주세요."
      mutationFn={postVolunteerScore}
    />
  );
}
