import { instance } from '@/shared/lib/instance';

export interface rejectScoreReequest {
  scoreId: number;
  rejectionReason: string;
}

export const rejectScore = async ({
  scoreId,
  rejectionReason,
}: rejectScoreReequest): Promise<void> => {
  const response = await instance.patch(`/scores/${scoreId}/reject`, {
    rejectionReason,
  });
  return response.data;
};
