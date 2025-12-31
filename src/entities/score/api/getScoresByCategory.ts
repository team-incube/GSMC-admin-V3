import { instance } from '@/shared/lib/instance';
import { CategoryScoresGroupType, ScoreStatus } from '@/entities/score/model/score';

export interface getScoresByCategoryRequest {
  memberId: number;
  status?: ScoreStatus;
}

export const getScoresByCategory = async ({
  memberId,
  status,
}: getScoresByCategoryRequest): Promise<CategoryScoresGroupType[]> => {
  const res = await instance.get(`/scores/by-category/${memberId}`, {
    params: {
      status,
    },
  });
  return res.data.data.categories;
};
