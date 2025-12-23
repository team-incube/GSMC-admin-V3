import { useMutation } from '@tanstack/react-query';
import { DownloadSheetsScoresParams, downloadSheetsScores } from '../api/downloadSheetsScores';
import { toast } from 'sonner';

export const useDownloadSheetsScores = () => {
  return useMutation({
    mutationFn: (data: DownloadSheetsScoresParams) => downloadSheetsScores(data),
    onSuccess: (data, variables) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${variables.grade}학년_${variables.classNumber ? variables.classNumber + '반' : '전체'}_성적표.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('파일 다운로드가 완료되었습니다.');
    },
    onError: () => {
      toast.error('파일 다운로드에 실패했습니다.');
    },
  });
};