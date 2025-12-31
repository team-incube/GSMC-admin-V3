import { TotalScoreType } from '@/entities/score/model/score';
import { instance } from '@/shared/lib/instance';

export interface getTotalScoreByIdRequest {
  memberId: number;
  includeApprovedOnly?: boolean;
}

export const getTotalScoreById = async ({
  memberId,
  includeApprovedOnly,
}: getTotalScoreByIdRequest): Promise<TotalScoreType> => {
  const response = await instance.get(`/scores/total/${memberId}`, {
    params: {
      includeApprovedOnly,
    },
  });
  return response.data.data;
};
