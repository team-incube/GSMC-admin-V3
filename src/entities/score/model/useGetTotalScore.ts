import { useQuery } from '@tanstack/react-query';
import { getTotalScore } from '../api/getTotalScore';

export const useGetTotalScore = (memberId: number) => {
  return useQuery({
    queryKey: ['totalScore', memberId],
    queryFn: () => getTotalScore(memberId),
    enabled: !!memberId,
  });
};
