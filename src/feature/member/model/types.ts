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

export interface ScoreItem {
  scoreId: number;
  categoryNames: {
    englishName: string;
    koreanName: string;
  };
  scoreStatus: 'INCOMPLETE' | 'PENDING' | 'APPROVED' | 'REJECTED';
  activityName: string;
  scoreValue: number;
  rejectionReason?: string;
}

export interface ScoreCategory {
  categoryType: 'ACADEMIC' | 'VOLUNTEER' | string;
  categoryNames: {
    englishName: string;
    koreanName: string;
  };
  recognizedScore: number;
  scores: ScoreItem[];
}

export interface ScoresByCategoryResponse {
  categories: ScoreCategory[];
}
