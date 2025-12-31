import { instance } from '@/shared/lib/instance';

import { ScoreType } from '../model/score';

export interface getScoreByIdRequest {
  scoreId: number;
}

export const getScoreById = async ({ scoreId }: getScoreByIdRequest): Promise<ScoreType> => {
  const response = await instance.get(`/scores/${scoreId}`);
  return response.data.data;
};
