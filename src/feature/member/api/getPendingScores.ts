import { instance } from '@/shared/lib/instance';
import type { PendingScoresResponse } from '../model/types';

export const getPendingScores = async (memberId: number): Promise<PendingScoresResponse> => {
  const res = await instance.get(`/scores/by-category/${memberId}`, {
    params: {
      status: 'PENDING',
    },
  });
  return res.data?.data ?? { categories: [] };
};
