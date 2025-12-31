import { instance } from '@/shared/lib/instance';

export interface approveScoreRequest {
  scoreId: number;
}

export const approveScore = async ({ scoreId }: approveScoreRequest): Promise<void> => {
  const response = await instance.patch(`/scores/${scoreId}/approve`);
  return response.data;
};
