import { useMutation } from '@tanstack/react-query';

import { readAlertById } from '../api/readAlertById';

export const useReadAlertById = () => {
  return useMutation({
    mutationKey: ['read', 'alerts', 'last'],
    mutationFn: readAlertById,
  });
};
