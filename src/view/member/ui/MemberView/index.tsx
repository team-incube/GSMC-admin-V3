import Filter from '@/shared/asset/svg/Filter';
import { getMembers } from '@/feature/member/api/getMembers';
import QuestionMark from '@/shared/asset/svg/QuestionMark';
import { useQuery } from '@tanstack/react-query';

export default function MemberView() {
  const {
    data: members = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers,
  });

  if (isLoading) {
    return (
      <div className="mt-12.5 flex items-center justify-center">
        <p className="text-lg text-gray-600">로딩중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-12.5 flex items-center justify-center">
        <p className="text-lg text-red-600">데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }
  return (
    <div className="mt-12.5 flex gap-7.5">
      <div className="bg-main-100 flex h-184.75 w-143.25 flex-col overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between px-10 pt-9 pb-6">
          <div className="flex items-baseline gap-1">
            <p className="text-main-700 text-2xl font-semibold">216</p>
            <p className="text-base font-semibold text-black">명</p>
          </div>
          <Filter />
        </div>

        <div className="flex flex-1 flex-col gap-0 overflow-y-auto px-5.5">
          <article className="bg-main-100 flex flex-col rounded-xl">
            <div className="flex items-center justify-between rounded-xl px-8 py-6">
              <p className="text-lg font-semibold text-gray-600">모태환</p>
              <p className="text-lg font-semibold text-gray-600">2104</p>
            </div>
          </article>
        </div>
      </div>

      <div className="bg-main-100 flex h-184.75 w-87.5 flex-col items-center justify-center overflow-hidden rounded-2xl">
        <QuestionMark />
        <p className="mt-8 text-center text-2xl font-semibold text-gray-600">학생을 선택해주세요</p>
      </div>
    </div>
  );
}
