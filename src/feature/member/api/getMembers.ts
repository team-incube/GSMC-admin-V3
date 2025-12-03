import { instance } from '@/shared/lib/axios';
import { Member } from '@/feature/member/model/member';

export const getMembers = async (): Promise<Member[]> => {
  const res = await instance.get('/members/search');
  const members = res.data?.data?.members;

  if (Array.isArray(members)) return members;
  return [];
};
