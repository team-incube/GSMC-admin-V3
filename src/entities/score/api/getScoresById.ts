import { instance } from '@/shared/lib/instance';
import { ScoreType } from '../model/score';

export const getScoreDetail = async (scoreId: number): Promise<ScoreType> => {
  const res = await instance.get(`/scores/${scoreId}`);
  return res.data?.data;
};
