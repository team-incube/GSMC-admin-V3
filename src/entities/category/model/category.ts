export const Category = {
  VOLUNTEER: '봉사활동',
  TOPCIT: 'TOPCIT',
  TOEIC: 'TOEIC',
  'READ-A-THON': '독서마라톤',
  'PROJECT-PARTICIPATION': '프로젝트 참여',
  'NEWRROW-SCHOOL': '뉴로우스쿨 참여',
  NCS: '직업기초능력평가',
  JLPT: 'JLPT',
  'TOEIC-ACADEMY': '토익 사관학교',
  'EXTERNAL-ACTIVITY': '외부활동',
  CERTIFICATE: '자격증',
  AWARD: '수상경력',
  'ACADEMIC-GRADE': '교과성적',
} as const;

export type CategoryKey = keyof typeof Category;

export interface CategoryNames {
  englishName: string;
  koreanName: string;
}
