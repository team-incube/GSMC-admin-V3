import { instance } from '@/shared/lib/instance';

export interface rejectScoreRequest {
  scoreId: number;
  rejectionReason: string;
}

export const rejectScore = async ({
  scoreId,
  rejectionReason,
}: rejectScoreRequest): Promise<void> => {
  const response = await instance.patch(`/scores/${scoreId}/reject`, {
    rejectionReason,
  });
  return response.data;
};
