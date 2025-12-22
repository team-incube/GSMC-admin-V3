'use server';

import { HttpStatusCode, isAxiosError } from 'axios';
import z from 'zod';

import { ActionState } from '@/shared/model/actionState';

import { postSignup } from '../api/postSignup';
import { SignupFormType, SignupSchema } from './SignupSchema';

export async function handleSignup(
  _prevState: ActionState<SignupFormType>,
  formData: FormData,
): Promise<ActionState<SignupFormType>> {
  const requestedRole = formData.get('requestedRole') as 'TEACHER' | 'HOMEROOM_TEACHER';
  const gradeValue = formData.get('grade');
  const classNumberValue = formData.get('classNumber');

  const currentData: SignupFormType = {
    name: String(formData.get('name') ?? '').trim(),
    requestedRole,
    ...(gradeValue && { grade: Number(gradeValue) }),
    ...(classNumberValue && { classNumber: Number(classNumberValue) }),
  };

  const result = SignupSchema.safeParse(currentData);

  if (!result.success) {
    return {
      status: 'error',
      message: '입력값을 확인해주세요.',
      fieldErrors: z.flattenError(result.error).fieldErrors,
      data: currentData,
    };
  }

  try {
    await postSignup(result.data);

    return {
      status: 'success',
      message: '회원가입에 성공했습니다. 관리자의 승인을 기다려주세요.',
      fieldErrors: null,
      data: null,
    };
  } catch (error) {
    let errorMessage = '회원가입에 실패했습니다.';

    if (isAxiosError(error)) {
      const status = error.response?.status;

      if (status === HttpStatusCode.NotFound) {
        errorMessage = '존재하지 않는 사용자입니다.';
      }
    }

    return {
      status: 'error',
      message: errorMessage,
      fieldErrors: null,
      data: currentData,
    };
  }
}
