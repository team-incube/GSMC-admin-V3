import { useQuery } from '@tanstack/react-query';
import { getTotalScoreById, getTotalScoreByIdRequest } from '../api/getTotalScoreById';

export const useGetTotalScore = ({ memberId, includeApprovedOnly }: getTotalScoreByIdRequest) => {
  return useQuery({
    queryKey: ['totalScore', memberId, includeApprovedOnly],
    queryFn: () => getTotalScoreById({ memberId, includeApprovedOnly }),
    enabled: !!memberId,
  });
};
