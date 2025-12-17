export const CATEGORY_TYPES = {
  PROJECT_PARTICIPATION: 'PROJECT_PARTICIPATION',
  PROJECT_PARTICIPATION_ALT: 'PROJECT-PARTICIPATION',
  TOEIC: 'TOEIC',
  JLPT: 'JLPT',
} as const;

export function isProjectCategory(categoryName: string): boolean {
  return (
    categoryName === CATEGORY_TYPES.PROJECT_PARTICIPATION ||
    categoryName === CATEGORY_TYPES.PROJECT_PARTICIPATION_ALT
  );
}

export function isToeicCategory(categoryName: string): boolean {
  return categoryName === CATEGORY_TYPES.TOEIC;
}
