'use client';

import { FileType } from '@/entities/file/model/file';
import ModalWrapper from '@/shared/ui/ModalWrapper';

interface FileViewerModalProps {
  onClose: () => void;
  fileUrl: FileType;
  englishName: string;
}

export default function FileViewerModal({ onClose, fileUrl, englishName }: FileViewerModalProps) {
  const getFileExtension = (url: string) => {
    try {
      const pathname = new URL(url).pathname;
      const ext = pathname.substring(pathname.lastIndexOf('.'));
      return ext ? ext.toLowerCase() : '';
    } catch {
      return '';
    }
  };

  //확장자 추출
  const ext = getFileExtension(fileUrl.uri);

  const renderViewer = () => {
    // 이미지
    if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(ext!)) {
      return (
        <img src={fileUrl.uri} alt={englishName} className="max-h-120 w-full object-contain" />
      );
    }

    // PDF
    if (ext === '.pdf') {
      return <iframe src={fileUrl.uri} className="h-120 w-full" />;
    }

    // 텍스트 / CSV
    if (['.txt', '.csv'].includes(ext!)) {
      return <iframe src={fileUrl.uri} className="h-120 w-full" />;
    }

    // Office 문서
    if (['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'].includes(ext!)) {
      return (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            fileUrl.uri,
          )}`}
          className="h-120 w-full"
        />
      );
    }

    // HWP / HWPX
    if (['.hwp', '.hwpx'].includes(ext!)) {
      return (
        <div className="flex h-120 flex-col items-center justify-center gap-4">
          <p className="text-gray-500">해당 파일 형식은 미리보기를 지원하지 않습니다.</p>
          <a href={fileUrl.uri} download className="text-main-500 underline">
            파일 다운로드
          </a>
        </div>
      );
    }

    // 그 외
    return <p className="text-gray-500">지원하지 않는 파일 형식입니다.</p>;
  };

  return (
    <ModalWrapper
      className="flex max-h-200 w-full max-w-150 flex-col gap-4 px-25 py-15"
      onClose={onClose}
    >
      {renderViewer()}

      <button
        onClick={onClose}
        className="text-main-500 border-main-500 h-12 w-full cursor-pointer rounded-lg border bg-white text-base font-medium"
      >
        뒤로가기
      </button>
    </ModalWrapper>
  );
}
