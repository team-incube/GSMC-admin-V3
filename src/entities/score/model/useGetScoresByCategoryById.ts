import { useQuery, skipToken } from '@tanstack/react-query';

import {
  getScoresByCategoryById,
  getScoresByCategoryByIdRequest,
} from '../api/getScoresByCategoryById';

export const useGetScoresByCategoryById = (
  params: Omit<getScoresByCategoryByIdRequest, 'memberId'> & { memberId?: number | null }
) => {
  const { memberId, status } = params;

  return useQuery({
    queryKey: ['score', 'list', 'category', params],
    queryFn: memberId
      ? () => getScoresByCategoryById({ memberId, status })
      : skipToken,
  });
};
