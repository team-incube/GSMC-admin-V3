'use client';

import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { useActionState } from 'react';

import { handleSignup } from '@/feature/google-auth/lib/handleSignup';
import { initialState } from '@/feature/google-auth/model/initForm';

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(handleSignup, initialState);

  return (
    <form className="flex flex-col gap-9" action={formAction}>
      <div>
        <Input name="name" label="이름" placeholder="이름을 입력해주세요" />
        <small className="text-error pl-1">{state.nameError}</small>
      </div>
      <div>
        <Input
          label="학번"
          maxLength={4}
          minLength={4}
          placeholder="학번을 입력해주세요"
          type="number"
          name="studentNumber"
        />
        <small className="text-error pl-1">{state.studentNumberError}</small>
      </div>
      <Button type="submit" disabled={isPending}>
        등록하기
      </Button>
    </form>
  );
}
