import { instance } from '@/shared/lib/instance';
import { MemberType, RoleType } from '../model/member';

export interface getMemberSearchResponse {
  members: MemberType[];
  totalPages: number;
  totalElements: number;
}

export interface getSearchStudentRequest {
  name?: string;
  email?: string;
  grade?: number;
  classNumber?: number;
  number?: number;
  role?: RoleType;
  limit?: number;
  page?: number;
  sortBy?: 'ASC' | 'DESC';
}

export const getMemberSearch = async (
  params: getSearchStudentRequest,
): Promise<getMemberSearchResponse> => {
  const response = await instance.get('members/search', {
    params,
  });
  return response.data.data;
};
