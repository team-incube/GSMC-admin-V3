import { instance } from '@/shared/lib/instance';

export const rejectScore = async (scoreId: number, rejectionReason: string): Promise<void> => {
  const response = await instance.patch(`/scores/${scoreId}/reject`, {
    rejectionReason,
  });
  return response.data;
};
