import { useQuery } from '@tanstack/react-query';

import { getCurrentMember } from '../api/getCurrentMember';

export const useGetCurrentMember = () => {
  return useQuery({
    queryKey: ['teacher', 'current'],
    queryFn: () => getCurrentMember(),
    staleTime: 60 * 60 * 1000,
  });
};
