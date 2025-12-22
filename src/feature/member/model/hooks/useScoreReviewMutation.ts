import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveScore, rejectScore } from '@/feature/member/api/scoreActions';
import { scoreKeys } from '@/feature/member/queryKeys/scoreKeys';

interface RejectParams {
  scoreId: number;
  reason: string;
}

export function useScoreReviewMutation(memberId: number | null) {
  const queryClient = useQueryClient();

  const invalidateScoreDomain = (scoreId: number) => {
    if (!memberId) return;

    queryClient.invalidateQueries({
      queryKey: scoreKeys.list(memberId),
    });

    queryClient.invalidateQueries({
      queryKey: scoreKeys.summary(memberId),
    });

    queryClient.removeQueries({
      queryKey: scoreKeys.detail(scoreId),
    });
  };

  const approve = useMutation({
    mutationFn: (scoreId: number) => approveScore(scoreId),
    onSuccess: (_, scoreId) => {
      invalidateScoreDomain(scoreId);
    },
  });

  const reject = useMutation({
    mutationFn: ({ scoreId, reason }: RejectParams) => rejectScore(scoreId, reason),
    onSuccess: (_, { scoreId }) => {
      invalidateScoreDomain(scoreId);
    },
  });

  return {
    approve,
    reject,
  };
}
