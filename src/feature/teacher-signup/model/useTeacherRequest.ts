import { useQuery } from '@tanstack/react-query';
import { getTeacherRequest } from '../api/getTeacherRequest';

export const useTeacherRequest = () => {
  return useQuery({
    queryKey: ['teacherRequest'],
    queryFn: getTeacherRequest,
  });
};
