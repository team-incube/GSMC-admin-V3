import { instance } from '@/shared/lib/instance';

import { SignupFormType } from '../model/SignupSchema';

export const postSignup = async ({ name, requestedRole, grade, classNumber }: SignupFormType) => {
  const response = await instance.post('/auth/teacher-signup', {
    name,
    requestedRole,
    grade,
    classNumber,
  });
  return response.data;
};