'use client';

import { useActionState, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { handleSignup } from '@/feature/google-auth/model/handleSignup';
import { SignupFormType } from '@/feature/google-auth/model/SignupSchema';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { RoleType } from '@/entities/member/model/member';

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(handleSignup, createInitialState<SignupFormType>());
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleType>('HOMEROOM_TEACHER');

  useEffect(() => {
    if (state.message) {
      if (state.status === "success") {
        toast.success(state.message);
        if (selectedRole === 'TEACHER' || selectedRole === 'HOMEROOM_TEACHER') {
          router.push('/teacher-request');
        } else {
          router.push('/');
        }
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router, selectedRole]);

  return (
    <form className="flex flex-col gap-9" action={formAction}>
      <div>
        <Input name="name" label="이름" placeholder="이름을 입력해주세요" />
        <small className="text-error pl-1">{state.fieldErrors?.name}</small>
      </div>

      <div className="flex flex-col gap-3">
        <label className="font-medium">직무 구분</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="requestedRole"
              value="HOMEROOM_TEACHER"
              checked={selectedRole === 'HOMEROOM_TEACHER'}
              onChange={(e) => setSelectedRole(e.target.value as 'HOMEROOM_TEACHER')}
            />
            <span>담임 선생님</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="requestedRole"
              value="TEACHER"
              checked={selectedRole === 'TEACHER'}
              onChange={(e) => setSelectedRole(e.target.value as 'TEACHER')}
            />
            <span>마이스터부 선생님</span>
          </label>
        </div>
        <small className="text-error pl-1">{state.fieldErrors?.requestedRole}</small>
      </div>

      {selectedRole === 'HOMEROOM_TEACHER' && (
        <>
          <div>
            <Input
              name="grade"
              label="학년"
              type="number"
              placeholder="학년을 입력해주세요 (1-3)"
            />
            <small className="text-error pl-1">{state.fieldErrors?.grade}</small>
          </div>
          <div>
            <Input
              name="classNumber"
              label="반"
              type="number"
              placeholder="반을 입력해주세요 (1-4)"
            />
            <small className="text-error pl-1">{state.fieldErrors?.classNumber}</small>
          </div>
        </>
      )}

      <Button type="submit" disabled={isPending}>
        등록하기
      </Button>
    </form>
  );
}
