import { TotalScoreType } from '@/entities/score/model/score';
import { instance } from '@/shared/lib/instance';

export const getTotalScore = async (memberId: number): Promise<TotalScoreType> => {
  const res = await instance.get(`/scores/total/${memberId}`, {
    params: {
      includeApproveOnly: true,
    },
  });
  return res.data?.data.totalScore ?? 0;
};
