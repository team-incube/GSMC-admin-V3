import { instance } from '@/shared/lib/axios';

interface PostAcademicScoreRequest {
  value: string;
  memberId: number;
}

export const postAcademicScore = async (body: PostAcademicScoreRequest) => {
  const response = await instance.post('/scores/academic-grade', body);
  return response.data.data;
};
