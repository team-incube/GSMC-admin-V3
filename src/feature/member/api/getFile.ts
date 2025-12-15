import { instance } from '@/shared/lib/axios';

export const getFileById = async (fileId: number) => {
  const res = await instance.get(`/files/${fileId}`);
  return res.data?.data;
};
