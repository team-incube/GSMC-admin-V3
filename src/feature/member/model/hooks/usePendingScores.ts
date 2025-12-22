import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getPendingScores } from '@/feature/member/api/getPendingScores';
import { pendingScoresQueryKeys } from '@/feature/member/queryKeys/pendingScores';

import { mapPendingScores } from '@/feature/member/model/domain/pendingScore.mapper';
import type { PendingScore } from '@/feature/member/model/domain/pendingScore.type';

export function usePendingScores(memberId: number | null, isOpen: boolean) {
  const [viewedScores, setViewedScores] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!memberId) return;
    const saved = localStorage.getItem(`viewedScores_${memberId}`);
    if (saved) {
      setViewedScores(new Set(JSON.parse(saved)));
    }
  }, [memberId]);

  useEffect(() => {
    if (!memberId) return;
    localStorage.setItem(`viewedScores_${memberId}`, JSON.stringify([...viewedScores]));
  }, [viewedScores, memberId]);

  const query = useQuery({
    queryKey: pendingScoresQueryKeys.byMember(memberId ?? 0),
    queryFn: () => getPendingScores(memberId!),
    enabled: !!memberId && isOpen,
  });

  const scores: PendingScore[] = query.data?.categories
    ? mapPendingScores(query.data.categories)
    : [];

  const isUnread = (scoreId: number) => !viewedScores.has(scoreId);

  const markAsViewed = (scoreId: number) => {
    setViewedScores((prev) => new Set(prev).add(scoreId));
  };

  return {
    ...query,
    scores,
    isUnread,
    markAsViewed,
  };
}
