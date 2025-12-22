import { useQuery } from '@tanstack/react-query';

import { getScoreDetail } from '@/feature/member/api/getScoreDetail';
import { getToeicAcademyScore } from '@/feature/member/api/getToeicAcademyScore';
import { scoreKeys } from '@/feature/member/queryKeys/scoreKeys';

import { isToeicCategory, isProjectCategory } from '../constants/category';
import { getFileUrl, openFileInNewWindow } from '@/shared/lib/file';

interface UseScoreReviewParams {
  scoreId: number | null;
  memberId: number | null;
  categoryName: string | null;
  isOpen: boolean;
}

export function useScoreReview({ scoreId, memberId, categoryName, isOpen }: UseScoreReviewParams) {
  const {
    data: scoreDetail,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useQuery({
    queryKey: scoreId ? scoreKeys.detail(scoreId) : [],
    queryFn: () => getScoreDetail(scoreId!),
    enabled: !!scoreId && isOpen,
  });

  const isProject = categoryName ? isProjectCategory(categoryName) : false;
  const isToeic = categoryName ? isToeicCategory(categoryName) : false;

  const {
    data: hasToeicAcademy,
    isLoading: isLoadingToeic,
    error: toeicError,
  } = useQuery({
    queryKey: memberId && isToeic ? ['toeicAcademy', memberId] : [],
    queryFn: () => getToeicAcademyScore(memberId!),
    enabled: !!memberId && isOpen && isToeic,
  });

  const findFileUri = (fileId: number): string | undefined => {
    if (!scoreDetail) return undefined;

    if (isProject && scoreDetail.evidence?.files) {
      return scoreDetail.evidence.files.find((f) => f.id === fileId)?.uri;
    }

    if (scoreDetail.file?.id === fileId) {
      return scoreDetail.file.uri;
    }

    return undefined;
  };

  const handleFileView = (fileId: number) => {
    const uri = findFileUri(fileId);
    if (uri) {
      openFileInNewWindow(getFileUrl(uri));
    }
  };

  return {
    scoreDetail,
    hasToeicAcademy,

    isLoading: isLoadingDetail || isLoadingToeic,
    isLoadingDetail,

    isProjectCategory: isProject,
    isToeicCategory: isToeic,

    handleFileView,

    error: detailError || toeicError,
  };
}
