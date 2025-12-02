import { instance } from '@/shared/lib/axios';
import type { MemberSearchParams, MemberSearchResponse } from '@/feature/member/model/types';

export const getMemberSearch = async (
  params: MemberSearchParams,
): Promise<MemberSearchResponse> => {
  const response = await instance.get('/api/3v/members/search', {
    params,
  });
  return response.data;
};
