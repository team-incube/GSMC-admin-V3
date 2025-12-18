import { instance } from '@/shared/lib/instance';

type AlertStatusType = 'ADD_SCORE' | 'REJECTED' | 'APPROVED';

interface AlertType {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  alertType: AlertStatusType;
  scoreId: number;
}

export const getAlerts = async (): Promise<AlertType[]> => {
  const response = await instance.get('/alerts/my');
  return response.data.data.alerts;
};
