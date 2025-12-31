'use client';

import { useQuery } from '@tanstack/react-query';
import ModalWrapper from '@/shared/ui/ModalWrapper';
import { getScoresByCategory } from '@/entities/score/api/getScoresByCategory';

interface ScoreDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: number | null;
}

export default function ScoreDetailModal({ isOpen, onClose, memberId }: ScoreDetailModalProps) {
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ['scoresByCategory', memberId],
    queryFn: () => getScoresByCategory({ memberId: memberId! }),
    enabled: !!memberId && isOpen,
  });

  return (
    isOpen ?
      <ModalWrapper className="w-full max-w-150 px-15 py-10" onClose={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <h2 className="text-main-700 mb-3 text-2xl font-semibold">영역별 점수</h2>

          <div className="bg-main-100 mb-[30px] flex flex-col rounded-xl max-h-150 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <p className="text-gray-600">로딩중...</p>
              </div>
            ) : isError ? (
              <div className="flex justify-center py-8">
                <p className="text-red-600">데이터를 불러오는데 실패했습니다</p>
              </div>
            ) : categories?.length === 0 ? (
              <div className="flex justify-center py-8">
                <p className="text-gray-600">점수 데이터가 없습니다</p>
              </div>
            ) : (
              categories?.map((category) => (
                <div key={category.categoryType} className="flex items-center justify-between px-6 py-4">
                  <p className="text-lg font-semibold text-gray-600">
                    {category.categoryNames.koreanName}
                  </p>
                  <p className="text-lg font-semibold text-gray-600">{category.recognizedScore}</p>
                </div>
              ))
            )}
          </div>

          <button
            onClick={onClose}
            className="text-main-500 border-main-500 h-13 w-full cursor-pointer rounded-xl border bg-white text-lg font-semibold transition-colors"
          >
            뒤로가기
          </button>
        </div>
      </ModalWrapper> : null
  );
}
