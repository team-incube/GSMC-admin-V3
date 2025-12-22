import { instance } from '@/shared/lib/instance';

export const approveScore = async (scoreId: number): Promise<void> => {
  await instance.patch(`/scores/${scoreId}/approve`);
};

export const rejectScore = async (scoreId: number, rejectionReason: string): Promise<void> => {
  await instance.patch(`/scores/${scoreId}/reject`, {
    rejectionReason,
  });
};
