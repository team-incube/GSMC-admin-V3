'use client';

import { useActionState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { handleSignup } from '@/feature/google-auth/model/handleSignup';
import { SignupFormType } from '@/feature/google-auth/model/SignupSchema';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(handleSignup, createInitialState<SignupFormType>());
  const router = useRouter()

  useEffect(() => {
    if (state.message) {
      if (state.status === "success") {
        toast.success(state.message);
        router.push("/")
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <form className="flex flex-col gap-9" action={formAction}>
      <div>
        <Input name="name" label="이름" placeholder="이름을 입력해주세요" />
        <small className="text-error pl-1">{state.fieldErrors?.name}</small>
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
        <small className="text-error pl-1">{state.fieldErrors?.studentNumber}</small>
      </div>
      <Button type="submit" disabled={isPending}>
        등록하기
      </Button>
    </form>
  );
}
