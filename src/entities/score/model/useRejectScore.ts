import { useMutation } from '@tanstack/react-query';
import { rejectScore } from '../api/rejectScore';
import { toast } from 'sonner';

export const useRejectScore = () => {
  return useMutation({
    mutationFn: rejectScore,
    onSuccess: () => {
      toast.success('점수가 거부되었습니다');
    },
    onError: () => {
      toast.error('점수 거부에 실패했습니다');
    },
  });
};
