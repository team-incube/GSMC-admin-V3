"use client"

import { useGetCurrentMember } from "@/entities/member/model/useGetCurrentMember";
import { useDownloadSheetsScores } from "@/entities/member/model/useDownloadSheetsScores";
import { useState } from "react";
import NumberButton from "@/shared/ui/NumberButton";
import Button from "@/shared/ui/Button";
import { toast } from "sonner";
import { cn } from "@/shared/lib/cn";

export default function ExcelView() {
  const { data: currentMember, isLoading: isLoadingCurrentMember } = useGetCurrentMember();
  const { mutate: downloadScores, isPending: isDownloading } = useDownloadSheetsScores();
  const [selectedGrade, setSelectedGrade] = useState<number | null>(currentMember?.role === 'HOMEROOM_TEACHER' ? Number(currentMember.grade) : null);
  const [selectedClass, setSelectedClass] = useState<number | undefined>(currentMember?.role === 'HOMEROOM_TEACHER' ? Number(currentMember.classNumber) : undefined);

  const GRADES = [1, 2, 3];
  const CLASSES = [1, 2, 3, 4];

  const handleSubmit = () => {
    if (selectedGrade === null) {
      toast.warning('학년을 선택해주세요.');
      return;
    }
    downloadScores({ grade: selectedGrade, classNumber: selectedClass });
  }

  const handleReset = () => {
    setSelectedGrade(null);
    setSelectedClass(undefined);
  }

  if (isLoadingCurrentMember) {
    return <>로딩중...</>
  }

  return (
    <div className="w-full mt-12.5 flex justify-center items-center">
      <section className="col-span-7 bg-main-100 p-10 flex h-184.75 flex-col overflow-hidden rounded-2xl">
        <h2 className="text-main-700 mb-3 text-2xl font-bold">엑셀출력</h2>
        <p className="text-sm text-gray-500">※ 담임선생님은 담당하시는 반만 선택 가능합니다.</p>
        <div className="mb-7.5">
          <div className="mt-7.5">
            <p className="text-main-700 mb-3 text-lg font-bold">학년</p>
            <div className="flex gap-5">
              {GRADES.map((grade) => (
                <NumberButton
                  key={grade}
                  value={grade}
                  isSelected={selectedGrade === grade}
                  disabled={currentMember?.role === 'HOMEROOM_TEACHER'}
                  onClick={() => setSelectedGrade(selectedGrade === grade ? null : grade)}
                  className={cn(currentMember?.role === 'HOMEROOM_TEACHER' && "cursor-not-allowed")}
                />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-main-700 mb-3 text-lg font-bold">반(선택)</p>
            <div className="grid grid-cols-3 gap-5">
              {CLASSES.map((classNum) => (
                <NumberButton
                  key={classNum}
                  value={classNum}
                  isSelected={selectedClass === classNum}
                  disabled={currentMember?.role === 'HOMEROOM_TEACHER'}
                  onClick={() => setSelectedClass(selectedClass === classNum ? undefined : classNum)}
                  className={cn(currentMember?.role === 'HOMEROOM_TEACHER' && "cursor-not-allowed")}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <Button
            onClick={handleReset}
            variant="border"
            className={cn("font-semibold", currentMember?.role === 'HOMEROOM_TEACHER' && "cursor-not-allowed")}
            disabled={currentMember?.role === 'HOMEROOM_TEACHER'}
          >
            초기화
          </Button>
          <Button
            onClick={handleSubmit}
            variant="active"
            className={cn("font-semibold", isDownloading && "cursor-not-allowed")}
            disabled={isDownloading}
          >
            {isDownloading ? '다운로드중...' : '다운로드'}
          </Button>
        </div>
      </section>
    </div>
  )
}
