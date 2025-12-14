import ChangeButton from '@/shared/ui/ChangeButton';
import { getScoresByCategory } from '@/feature/member/api/getScoresByCategory';
import { Member } from '@/feature/member/model/types';
import { useQuery } from '@tanstack/react-query';

interface ScoreEditProps {
  selectedMember: Member;
  onClose: () => void;
  onOpenVolunteer: () => void;
}

export default function ScoreEdit({ selectedMember, onClose, onOpenVolunteer }: ScoreEditProps) {
  const { data: scoreData } = useQuery({
    queryKey: ['scoresByCategory', selectedMember?.id],
    queryFn: () => getScoresByCategory(selectedMember!.id),
    enabled: !!selectedMember,
  });

  const academicScore =
    scoreData?.categories?.find((c) => c.categoryNames?.englishName === 'ACADEMIC_GRADE')
      ?.recognizedScore ?? 0;

  const volunteerScore =
    scoreData?.categories?.find((c) => c.categoryNames?.englishName === 'VOLUNTEER')
      ?.recognizedScore ?? 0;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="h-[367px] w-[600px] rounded-[20px] bg-white px-[60px] py-[40px]">
        <p className="text-main-700 mb-[12px] text-2xl font-semibold">점수 변경</p>
        <div className="mb-[30px] flex flex-col rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-[20px] py-[24px]">
            <p className="text-lg font-semibold text-gray-600">교과성적</p>
            <div className="flex flex-row items-center gap-3">
              <p className="text-lg font-semibold text-gray-600">{academicScore} 점</p>
              <ChangeButton />
            </div>
          </div>
          <hr className="border-gray-200" />
          <div className="flex items-center justify-between px-[20px] py-[24px]">
            <p className="text-lg font-semibold text-gray-600">봉사</p>
            <div className="flex flex-row items-center gap-3">
              <p className="text-lg font-semibold text-gray-600">{volunteerScore} 점</p>
              <ChangeButton onClick={onOpenVolunteer} />
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="border-main-500 text-main-500 h-[52px] w-[480px] rounded-xl border text-lg font-semibold"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}
