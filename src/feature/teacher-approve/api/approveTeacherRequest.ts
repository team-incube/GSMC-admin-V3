import { instance } from "@/shared/lib/instance";

export const approveTeacherRequest = async (memberId: number) => {
  const response = await instance.patch(`/auth/teacher-signup/${memberId}/approve`);
  return response.data;
}