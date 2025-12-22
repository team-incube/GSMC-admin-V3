import type { CategoryNames } from './category.type';
import type { FileInfo } from './file.type';
import type { Evidence } from './evidence.type';

export interface ScoreDetail {
  scoreId: number;
  categoryNames: CategoryNames;
  scoreStatus: string;
  activityName: string;
  scoreValue: number;
  rejectionReason?: string;
  updatedAt?: string;
  toeicParticipation?: boolean;
  evidence?: Evidence;
  file?: FileInfo;
}

export interface ScoreByCategory {
  categoryType: string;
  categoryNames: CategoryNames;
  recognizedScore: number;
  scores: ScoreDetail[];
}

export interface ScoreByCategoryResponse {
  categories: ScoreByCategory[];
}

export interface PendingScoresResponse {
  categories: ScoreByCategory[];
}
