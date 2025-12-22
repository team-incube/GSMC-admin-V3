export const scoreKeys = {
  all: ['score'] as const,

  lists: () => [...scoreKeys.all, 'list'] as const,
  list: (memberId: number) => [...scoreKeys.lists(), { memberId }] as const,
  pending: (memberId: number) => [...scoreKeys.list(memberId), 'pending'] as const,
  byCategory: (memberId: number) => [...scoreKeys.list(memberId), 'byCategory'] as const,
  summary: (memberId: number) => [...scoreKeys.all, 'summary', memberId] as const,
  detail: (scoreId: number) => [...scoreKeys.all, 'detail', scoreId] as const,
};
