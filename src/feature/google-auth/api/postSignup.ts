import { instance } from '@/shared/lib/axios';
import { SignupFormValueType } from '../model/SignupSchema';

export const postSignup = async ({ name, studentNumber }: SignupFormValueType) => {
  try {
    const response = await instance.post('/auth/signup', {
      name,
      studentNumber,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
