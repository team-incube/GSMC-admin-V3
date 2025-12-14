import { instance } from '@/shared/lib/axios';

interface PostVolunteerScoreRequest {
  value: string;
  memberId: number;
}

export const postVolunteerScore = async (body: PostVolunteerScoreRequest) => {
  const response = await instance.post('/scores/volunteer', body);
  return response.data.data;
};
