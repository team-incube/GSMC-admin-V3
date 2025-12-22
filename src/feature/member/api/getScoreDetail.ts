import { instance } from '@/shared/lib/instance';
import type { ScoreDetail } from '../model/types';

export const getScoreDetail = async (scoreId: number): Promise<ScoreDetail> => {
  const res = await instance.get(`/scores/${scoreId}`);
  return res.data?.data;
};
