import z from 'zod';

export const SignupSchema = z.object({
  name: z.string().regex(/^[가-힣]{2,10}$/, '이름은 2~10자의 한글만 입력 가능합니다.'),
  requestedRole: z.enum(['TEACHER', 'HOMEROOM_TEACHER']),
  grade: z.number().int().min(1, '학년은 1 이상이어야 합니다.').max(3, '학년은 3 이하이어야 합니다.').optional(),
  classNumber: z.number().int().min(1, '반은 1 이상이어야 합니다.').max(4, '반은 4 이하이어야 합니다.').optional(),
}).refine(
  (data) => {
    if (data.requestedRole === 'HOMEROOM_TEACHER' && (!data.grade || !data.classNumber)) {
      return false;
    }
    return true;
  },
  {
    message: '학년과 반을 입력해주세요.',
    path: ['grade', 'classNumber'],
  },
);

export type SignupFormType = z.infer<typeof SignupSchema>;
