import { instance } from '@/shared/lib/axios';

interface Category {
  categoryNames: {
    englishName: string;
  };
  scores?: unknown[];
}

export const getToeicAcademyScore = async (memberId: number) => {
  const res = await instance.get(`/scores/by-category/${memberId}`, {
    params: {
      status: 'APPROVED',
    },
  });

  const categories = res.data?.data?.categories || [];
  const toeicAcademyCategory = categories.find(
    (cat: Category) => cat.categoryNames.englishName === 'TOEIC_ACADEMY',
  );

  return toeicAcademyCategory?.scores?.length > 0;
};
