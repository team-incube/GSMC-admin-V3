import { skipToken, useQuery } from '@tanstack/react-query';
import { getMemberSearch, getSearchStudentRequest } from '../api/getMemberSearch';

export const useGetMemberSearch = (searchParams: getSearchStudentRequest | typeof skipToken) => {
  return useQuery({
    queryKey: ['members', searchParams],
    queryFn: searchParams === skipToken ? skipToken : () => getMemberSearch(searchParams),
  });
};
