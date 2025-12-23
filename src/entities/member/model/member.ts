export type RoleType = 'UNAUTHORIZED' | 'STUDENT' | 'HOMEROOM_TEACHER' | 'TEACHER' | 'ROOT';

export interface MemberType {
  id: number;
  name: string;
  email: string;
  grade: number | null;
  classNumber: number | null;
  number: number | null;
  role: RoleType;
}

export interface RequestMemberType {
  memberId: number;
  name: string;
  email: string;
  requestedRole: RoleType;
  grade: number | null;
  classNumber: number | null;
  requestedAt: string;
}
