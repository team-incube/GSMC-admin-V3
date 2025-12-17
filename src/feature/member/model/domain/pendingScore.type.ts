import type { ScoreDetail } from '../types';

export type PendingScore = ScoreDetail & {
  categoryName: string;
};
