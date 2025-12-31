import { instance } from '@/shared/lib/instance';

export interface DownloadSheetsScoresParams {
  grade: number;
  classNumber?: number;
}

export const downloadSheetsScores = async ({ grade, classNumber }: DownloadSheetsScoresParams): Promise<Blob> => {
  const response = await instance.get(`/sheets/${classNumber ? 'class-scores' : 'grade-scores'}`, { responseType: 'blob', params: { grade, classNumber } });
  return response.data;
};
