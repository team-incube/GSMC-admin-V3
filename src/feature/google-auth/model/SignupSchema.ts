import z from 'zod';

export const SignupSchema = z.object({
  name: z.string().regex(/^[가-힣]{2,10}$/, '이름은 2~10자의 한글만 입력 가능합니다.'),
  studentNumber: z.string().regex(/^\d{4}$/, '학번은 4자리 숫자여야 합니다.'),
});

export type SignupFormValueType = z.infer<typeof SignupSchema>;
