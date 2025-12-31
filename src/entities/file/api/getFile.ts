import { instance } from '@/shared/lib/instance';
import { FileType } from '../model/file';

export const getFileById = async (fileId: number): Promise<FileType> => {
  const res = await instance.get(`/files/${fileId}`);
  return res.data?.data;
};
