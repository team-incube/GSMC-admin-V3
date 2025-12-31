import { useMutation } from '@tanstack/react-query';
import { approveScore } from '../api/approveScore';
import { toast } from 'sonner';

export const useApproveScore = () => {
  return useMutation({
    mutationFn: approveScore,
    onSuccess: () => {
      toast.success('점수가 승인되었습니다');
    },
    onError: () => {
      toast.error('점수 승인에 실패했습니다');
    },
  });
};
