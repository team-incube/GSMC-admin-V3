export type RoleType = 'UNAUTHORIZED' | 'STUDENT' | 'TEACHER' | 'HOMEROOM_TEACHER' | 'ROOT';

export interface StudentType {
  id: number;
  name: string;
  email: string;
  grade: number;
  classNumber: number;
  number: number;
  role: RoleType;
}
