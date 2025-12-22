import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rejectTeacherRequest } from '../api/rejectTeacherRequest';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'sonner';

export const useRejectTeacherRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectTeacherRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teacherRequest'],
      });
      toast.success('선생님 거부에 성공했습니다.');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.status === HttpStatusCode.NotFound) {
          toast.error('존재하지 않는 사용자입니다.');
        } else {
          toast.error('선생님 거부에 실패했습니다.');
        }
      } else {
        toast.error('선생님 거부에 실패했습니다.');
      }
    }
  });
};
