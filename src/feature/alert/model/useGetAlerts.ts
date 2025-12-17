import { useQuery } from '@tanstack/react-query';

import { getAlerts } from '../api/getAlerts';

export const useGetAlerts = () => {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: () => getAlerts(),
  });
};
