export interface Member {
  id: number;
  name: string;
  email: string;
  grade: number;
  classNumber: 3;
  number: number;
  role: 'UNAUTHORIZED' | 'STUDENT' | 'TEACHER' | 'ROOT';
}
