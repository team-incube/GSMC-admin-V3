import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveTeacherRequest } from '../api/approveTeacherRequest';
import { toast } from 'sonner';
import { HttpStatusCode, isAxiosError } from 'axios';

export const useApproveTeacherRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveTeacherRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teacherRequest'],
      });
      toast.success('선생님 승인에 성공했습니다.');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.status === HttpStatusCode.NotFound) {
          toast.error('존재하지 않는 사용자입니다.');
        } else {
          toast.error('선생님 승인에 실패했습니다.');
        }
      } else {
        toast.error('선생님 승인에 실패했습니다.');
      }
    }
  });
};
