import { instance } from '@/shared/lib/instance';
import type { MemberSearchParams, MemberSearchResponse } from '@/feature/member/model/types';

export const getMemberSearch = async (
  params: MemberSearchParams,
): Promise<MemberSearchResponse> => {
  const response = await instance.get('members/search', {
    params,
  });
  return response.data.data;
};
