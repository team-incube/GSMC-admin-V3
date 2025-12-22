import { useQuery } from '@tanstack/react-query';
import { getTeacherRequest } from '../api/getTeacherRequest';

export const useGetTeacherRequest = () => {
  return useQuery({
    queryKey: ['teacherRequest'],
    queryFn: getTeacherRequest,
  });
};
