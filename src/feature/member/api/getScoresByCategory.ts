import { instance } from '@/shared/lib/instance';
import type { ScoreByCategoryResponse } from '../model/types';

export const getScoresByCategory = async (memberId: number): Promise<ScoreByCategoryResponse> => {
  const res = await instance.get(`/scores/by-category/${memberId}`, {
    params: {
      status: 'APPROVED',
    },
  });
  return res.data?.data ?? { categories: [] };
};
