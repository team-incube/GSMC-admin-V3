import { instance } from '@/shared/lib/instance';
import { CategoryScoresGroupType, ScoreStatus } from '@/entities/score/model/score';

export interface getScoresByCategoryByIdRequest {
  memberId: number;
  status?: ScoreStatus;
}

export const getScoresByCategoryById = async ({
  memberId,
  status,
}: getScoresByCategoryByIdRequest): Promise<CategoryScoresGroupType[]> => {
  const res = await instance.get(`/scores/by-category/${memberId}`, {
    params: {
      status,
    },
  });
  return res.data.data.categories;
};
