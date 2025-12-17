import type { ScoreByCategory } from '@/feature/member/model/types';
import type { PendingScore } from '@/feature/member/model/domain/pendingScore.type';

export function mapPendingScores(categories: ScoreByCategory[]): PendingScore[] {
  return categories.flatMap((category) =>
    category.scores.map((score) => ({
      ...score,
      categoryName: category.categoryNames.koreanName,
    })),
  );
}
