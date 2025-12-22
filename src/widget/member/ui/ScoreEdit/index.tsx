import ChangeButton from '@/shared/ui/ChangeButton';
import { getScoresByCategory } from '@/feature/member/api/getScoresByCategory';
import { Member, ScoreCategoryType } from '@/feature/member/model/types';
import { useQuery } from '@tanstack/react-query';
import Button from '@/shared/ui/Button';

interface ScoreEditProps {
  selectedMember: Member;
  onClose: () => void;
  onOpenVolunteer: () => void;
  onOpenAcademic: () => void;
}

export default function ScoreEdit({
  selectedMember,
  onClose,
  onOpenVolunteer,
  onOpenAcademic,
}: ScoreEditProps) {
  const { data: scoreData } = useQuery({
    queryKey: ['scoresByCategory', selectedMember?.id],
    queryFn: () => getScoresByCategory({ memberId: selectedMember!.id, status: "PENDING" }),
    enabled: !!selectedMember,
  });

  const academicScore =
    scoreData?.categories?.find((c) => c.categoryType === ScoreCategoryType.ACADEMIC_GRADE)
      ?.recognizedScore ?? 0;

  const volunteerScore =
    scoreData?.categories?.find((c) => c.categoryType === ScoreCategoryType.VOLUNTEER)
      ?.recognizedScore ?? 0;

  const SCORE_EDIT = [
    {
      key: ScoreCategoryType.ACADEMIC_GRADE,
      label: '교과성적',
      score: academicScore,
      onClick: onOpenAcademic,
    },
    {
      key: ScoreCategoryType.VOLUNTEER,
      label: '봉사',
      score: volunteerScore,
      onClick: onOpenVolunteer,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="h-[367px] w-[600px] rounded-[20px] bg-white px-[60px] py-[40px]">
        <p className="text-main-700 mb-[12px] text-2xl font-semibold">점수 변경</p>
        <div className="mb-[30px] flex flex-col rounded-xl border border-gray-200">
          {SCORE_EDIT.map((field, index) => (
            <div key={field.key}>
              <div className="flex items-center justify-between px-[20px] py-[24px]">
                <p className="text-lg font-semibold text-gray-600">{field.label}</p>
                <div className="flex flex-row items-center gap-3">
                  <p className="text-lg font-semibold text-gray-600">{field.score} 점</p>
                  <ChangeButton onClick={field.onClick} />
                </div>
              </div>

              {index !== SCORE_EDIT.length - 1 && <hr className="border-gray-200" />}
            </div>
          ))}
        </div>

        <Button
          onClick={onClose}
          variant='border'
          className="border-main-500 text-main-500 font-semibold"
        >
          뒤로가기
        </Button>
      </div>
    </div>
  );
}
