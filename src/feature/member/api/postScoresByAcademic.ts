import { instance } from '@/shared/lib/axios';

export const postAcademicScore = async (body: { value: string; memberId: number }) => {
  const response = await instance.post('/scores/academic-grade', body);
  return response.data.data;
};
