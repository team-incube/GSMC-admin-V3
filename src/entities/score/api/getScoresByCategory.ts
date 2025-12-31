import { instance } from '@/shared/lib/instance';
import { CategoryScoresGroupType, ScoreStatus } from '@/entities/score/model/score';

export const getScoresByCategory = async ({
  memberId,
  status,
}: {
  memberId: number;
  status?: ScoreStatus;
}): Promise<CategoryScoresGroupType[]> => {
  const res = await instance.get(`/scores/by-category/${memberId}`, {
    params: {
      status,
    },
  });
  return res.data.data.categories;
};
