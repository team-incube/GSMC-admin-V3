import { instance } from '@/shared/lib/axios';
import type { ScoreDetail } from '../model/types';

export const getScoreDetail = async (scoreId: number): Promise<ScoreDetail> => {
  const useMock = false;

  if (useMock) {
    return {
      scoreId,
      categoryNames: {
        englishName: 'CERTIFICATE',
        koreanName: '자격증',
      },
      scoreStatus: 'PENDING',
      activityName: '정보처리기능사',
      scoreValue: 0,
      evidence: {
        evidenceId: 1,
        title: 'Mock 프로젝트',
        content: 'Mock 데이터로 테스트 중입니다. 실제 증빙 내용이 여기에 표시됩니다.',
        createdAt: '2024-12-08T12:00:00',
        updatedAt: '2024-12-08T12:00:00',
        files: [
          {
            id: 1,
            memberId: 1,
            originalName: 'test-image.jpg',
            storeName: 'mock_image.jpg',
            uri: 'https://picsum.photos/800/600',
          },
        ],
      },
      file: {
        id: 2,
        memberId: 1,
        originalName: 'certificate.pdf',
        storeName: 'mock_cert.pdf',
        uri: 'https://picsum.photos/700/500',
      },
    };
  }
  const res = await instance.get(`/scores/${scoreId}`);
  return res.data?.data;
};
