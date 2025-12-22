import { useQuery } from '@tanstack/react-query';
import { getTeacherMyRequest } from '../api/getTeacherMyRequest';

export const useGetTeacherMyRequest = () => {
  return useQuery({
    queryKey: ['teacherMyRequest'],
    queryFn: getTeacherMyRequest,
  });
};
