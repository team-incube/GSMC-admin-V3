import { instance } from '@/shared/lib/instance';

export const getTotalScore = async (memberId: number) => {
  const res = await instance.get(`/scores/total/${memberId}`, {
    params: {
      includeApproveOnly: true,
    },
  });
  return res.data?.data.totalScore ?? 0;
};
