import File from '@/shared/asset/svg/File';

interface FileViewButtonProps {
  fileId?: number;
  isLoading: boolean;
  label: string;
  fileCount?: number;
  onView: (id: number) => void;
}

export default function FileViewButton({
  fileId,
  isLoading,
  label,
  fileCount,
  onView,
}: FileViewButtonProps) {
  return (
    <div className="mb-11">
      <button
        onClick={() => {
          if (fileId) {
            onView(fileId);
          }
        }}
        disabled={isLoading || !fileId}
        className={`text-main-500 flex h-[52px] w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-300 p-4 text-base font-medium disabled:cursor-not-allowed disabled:opacity-50 ${fileCount ? 'relative' : ''}`}
      >
        <File />
        {isLoading ? '로딩 중...' : fileId ? label : '파일 없음'}
      </button>
    </div>
  );
}
