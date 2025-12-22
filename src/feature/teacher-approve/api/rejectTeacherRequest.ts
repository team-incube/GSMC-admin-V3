import { instance } from "@/shared/lib/instance";

export const rejectTeacherRequest = async (memberId: number) => {
  const response = await instance.patch(`/auth/teacher-signup/${memberId}/reject`);
  return response.data;
}