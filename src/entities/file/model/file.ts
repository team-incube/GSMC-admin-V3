export interface FileType {
  id: number | string;
  memberId?: number;
  originalName: string;
  storeName: string;
  uri: string;
}

export const ALLOWED_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.bmp',
  '.webp',
  '.pdf',
  '.doc',
  '.docx',
  '.csv',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
  '.txt',
  '.hwp',
  '.hwpx',
] as const;

export type AllowedExtension = (typeof ALLOWED_EXTENSIONS)[number];
