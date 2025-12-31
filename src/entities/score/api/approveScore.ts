import { instance } from '@/shared/lib/instance';

export const approveScore = async (scoreId: number): Promise<void> => {
  const response = await instance.patch(`/scores/${scoreId}/approve`);
  return response.data;
};
