import { instance } from '@/shared/lib/instance';

import { MemberType } from '../model/member';

export const getCurrentMember = async (): Promise<MemberType> => {
  const response = await instance.get('/members/my');
  return response.data.data;
};
