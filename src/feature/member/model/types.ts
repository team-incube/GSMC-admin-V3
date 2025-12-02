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
  status: string;
  code: number;
  message: string;
  data: {
    totalPages: number;
    totalElements: number;
    members: Member[];
  };
}
