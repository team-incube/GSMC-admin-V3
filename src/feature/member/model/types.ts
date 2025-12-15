export interface Member {
  id: number;
  name: string;
  email: string;
  grade: number;
  classNumber: number;
  number: number;
  role: 'UNAUTHORIZED' | 'STUDENT' | 'TEACHER' | 'ROOT';
}

export interface MemberSearchParams {
  email?: string;
  name?: string;
  role?: 'UNAUTHORIZED' | 'STUDENT' | 'TEACHER' | 'ROOT';
  grade?: number;
  classNumber?: number;
  number?: number;
  limit?: number;
  page?: number;
  sortBy?: 'ASC' | 'DESC';
}

export interface MemberSearchResponse {
  totalPages: number;
  totalElements: number;
  members: Member[];
}

export interface CategoryNames {
  englishName: string;
  koreanName: string;
}

export interface FileInfo {
  id: number;
  memberId: number;
  originalName: string;
  storeName: string;
  uri: string;
}

export interface Evidence {
  evidenceId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  files: FileInfo[];
}

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
