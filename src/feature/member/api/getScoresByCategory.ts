import { instance } from '@/shared/lib/instance';
import type { ScoreByCategoryResponse } from '../model/types';
import { ScoreStatus } from '@/entities/score/model/score';

export const getScoresByCategory = async ({ memberId, status }: { memberId: number; status?: ScoreStatus }): Promise<ScoreByCategoryResponse> => {
  const res = await instance.get(`/scores/by-category/${memberId}`, {
    params: {
      status,
    },
  });
  return res.data?.data ?? { categories: [] };
};
