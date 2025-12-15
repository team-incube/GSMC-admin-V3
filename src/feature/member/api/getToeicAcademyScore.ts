import { instance } from '@/shared/lib/axios';

export const getToeicAcademyScore = async (memberId: number) => {
  const res = await instance.get(`/scores/by-category/${memberId}`, {
    params: {
      status: 'APPROVED',
    },
  });

  const categories = res.data?.data?.categories || [];
  const toeicAcademyCategory = categories.find(
    (cat: any) => cat.categoryNames.englishName === 'TOEIC_ACADEMY',
  );

  return toeicAcademyCategory?.scores?.length > 0;
};
