import type { FileType } from '@/entities/file/model/file';

export interface EvidenceType {
  evidenceId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  files: FileType[];
}
