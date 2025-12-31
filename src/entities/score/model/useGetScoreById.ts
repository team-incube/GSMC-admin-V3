import { useQuery } from '@tanstack/react-query';

import { getScoreById, getScoreByIdRequest } from '../api/getScoreById';

export const useGetScoreById = (
  { scoreId }: getScoreByIdRequest,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ['score', scoreId],
    queryFn: () => getScoreById({ scoreId }),
    enabled: options?.enabled ?? !!scoreId,
  });
};
