export const pendingScoresQueryKeys = {
  all: ['pendingScores'] as const,
  byMember: (memberId: number) => [...pendingScoresQueryKeys.all, memberId] as const,
};
