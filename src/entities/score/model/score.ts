import { CategoryKey, CategoryNames } from '@/entities/category/model/category';
import { EvidenceType } from '@/entities/evidence/model/evidence';
import { FileType } from '@/entities/file/model/file';

export type ScoreStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ScoreType {
  scoreId: number;
  categoryNames: CategoryNames;
  scoreStatus: ScoreStatus;
  activityName: string;
  evidence: EvidenceType | null;
  file: FileType | null;
  scoreValue: number;
  rejectionReason: string | null;
}

export interface TotalScoreType {
  totalScore: string;
}

export interface CategoryScoresGroupType {
  categoryType: CategoryKey;
  categoryNames: CategoryNames;
  recognizedScore: number;
  scores: ScoreType[];
}
