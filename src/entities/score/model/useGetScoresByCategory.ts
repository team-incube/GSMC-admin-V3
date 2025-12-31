import { useQuery } from '@tanstack/react-query';

import { getScoresByCategory, getScoresByCategoryRequest } from '../api/getScoresByCategory';

export const useGetScoresByCategory = (params: getScoresByCategoryRequest) => {
  return useQuery({
    queryKey: ['score', 'list', 'category', params],
    queryFn: () => getScoresByCategory(params),
  });
};
