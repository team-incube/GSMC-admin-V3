import { instance } from '@/shared/lib/instance';

export interface readAlertByIdRequest {
  lastAlertId: number;
}

export const readAlertById = async ({ lastAlertId }: readAlertByIdRequest) => {
  const response = await instance.patch('/alerts/read', { lastAlertId });
  return response.data;
};
