import { instance } from '@/shared/lib/axios';
import { Member } from '@/feature/member/model/member';

export const getMembers = async (): Promise<Member[]> => {
  const res = await instance.get('/members/search');

  const data = res.data?.data;

  if (Array.isArray(data)) return data;
  return [];
};
