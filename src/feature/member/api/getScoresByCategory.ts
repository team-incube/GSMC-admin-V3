import { instance } from '@/shared/lib/axios';
import { ScoresByCategoryResponse } from '../model/types';

export const getScoresByCategory = async (memberId: number): Promise<ScoresByCategoryResponse> => {
  const res = await instance.get(`/scores/by-category/${memberId}`, {
    params: {
      status: 'APPROVED',
    },
  });
  return res.data.data;
};
