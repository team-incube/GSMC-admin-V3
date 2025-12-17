import { instance } from '@/shared/lib/instance';

export const getFileById = async (fileId: number) => {
  const res = await instance.get(`/files/${fileId}`);
  return res.data?.data;
};
