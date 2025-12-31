import { useQuery } from '@tanstack/react-query';

import {
  getScoresByCategoryById,
  getScoresByCategoryByIdRequest,
} from '../api/getScoresByCategoryById';

export const useGetScoresByCategoryById = (params: getScoresByCategoryByIdRequest) => {
  return useQuery({
    queryKey: ['score', 'list', 'category', params],
    queryFn: () => getScoresByCategoryById(params),
  });
};
