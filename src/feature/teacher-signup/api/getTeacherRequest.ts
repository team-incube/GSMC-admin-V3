import { instance } from '@/shared/lib/instance';
import { RequestMemberType } from '@/entities/member/model/member';

export const getTeacherRequest = async (): Promise<RequestMemberType> => {
  const response = await instance.get('/auth/teacher-signup/my-request');
  return response.data.data;
};
