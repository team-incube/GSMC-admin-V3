import { instance } from '@/shared/lib/instance';

import { SignupFormType } from '../model/SignupSchema';

export const postSignup = async ({ name, studentNumber }: SignupFormType) => {
  const response = await instance.post('/auth/signup', {
    name,
    studentNumber,
  });
  return response.data;
};
