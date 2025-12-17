import { getFileById } from '@/feature/member/api/getFile';
import { FILE_SERVER_URL } from '@/shared/config/file';

export function getFileUrl(uri: string): string {
  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    return uri;
  }
  return `${FILE_SERVER_URL}${uri}`;
}

export function openFileInNewWindow(url: string): boolean {
  try {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    return !!newWindow;
  } catch {
    return false;
  }
}

export async function openFileById(fileId: number): Promise<void> {
  const fileData = await getFileById(fileId);
  const fileUrl = getFileUrl(fileData.uri);
  window.open(fileUrl, '_blank', 'noopener,noreferrer');
}
