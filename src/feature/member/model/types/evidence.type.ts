import type { FileInfo } from './file.type';

export interface Evidence {
  evidenceId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  files: FileInfo[];
}
