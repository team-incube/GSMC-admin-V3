import { instance } from '@/shared/lib/axios';

export const getTotalScore = async (memberId: number) => {
  const res = await instance.get(`/scores/total/${memberId}`, {
    params: {
      includeApproveOnly: true,
    },
  });
  console.log('총점 API 응답:', res.data);
  return res.data?.data.totalScore ?? 0;
};
