import { useEffect, useState } from 'react';

import { FileType } from '@/entities/file/model/file';

interface FileUploaderProps {
  uploadedFiles?: FileType | FileType[];
  isMultiple?: boolean;
  onChange?: (files: { existing: FileType[]; new: File[] }) => void;
}

interface LocalFile {
  id: string;
  name: string;
  file: File;
}

export default function useFileUploaderState({
  uploadedFiles,
  isMultiple,
  onChange,
}: FileUploaderProps) {
  const [existingFiles, setExistingFiles] = useState<FileType[]>([]);
  const [newFiles, setNewFiles] = useState<LocalFile[]>([]);

  useEffect(() => {
    if (!uploadedFiles) {
      setExistingFiles([]);
      return;
    }
    const normalizedFiles = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
    setExistingFiles(normalizedFiles);
  }, [uploadedFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    if (!isMultiple) {
      const file = selectedFiles[0];

      const newExisting: FileType[] = [];
      const newLocal = [
        {
          id: crypto.randomUUID(),
          name: file.name,
          file: file,
        },
      ];
      setExistingFiles(newExisting);
      setNewFiles(newLocal);
      onChange?.({ existing: newExisting, new: [file] });
    } else {
      const fileArray = Array.from(selectedFiles);
      const validLocalFiles: LocalFile[] = fileArray.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        file: file,
      }));
      if (validLocalFiles.length > 0) {
        const updatedNewFiles = [...newFiles, ...validLocalFiles];
        setNewFiles(updatedNewFiles);
        onChange?.({ existing: existingFiles, new: updatedNewFiles.map((f) => f.file) });
      }
    }

    e.target.value = '';
  };

  const handleRemoveFile = (id: number | string) => {
    let newExisting = existingFiles;
    let newLocal = newFiles;

    if (typeof id === 'number') {
      newExisting = existingFiles.filter((file: FileType) => file.id !== id);
      setExistingFiles(newExisting);
    } else {
      newLocal = newFiles.filter((file: LocalFile) => file.id !== id);
      setNewFiles(newLocal);
    }

    onChange?.({ existing: newExisting, new: newLocal.map((f: LocalFile) => f.file) });
  };

  const getButtonText = () => {
    const totalCount = existingFiles.length + newFiles.length;
    if (totalCount === 0) return '첨부된 파일 없음';

    if (!isMultiple) {
      if (newFiles.length > 0) return newFiles[0].name;
      if (existingFiles.length > 0) return existingFiles[0].originalName;
      return '파일 선택됨';
    }

    return `${totalCount}개의 파일 첨부됨`;
  };

  const buttonText = getButtonText();

  const displayFiles: FileType[] = [
    ...existingFiles,
    ...newFiles.map((file: LocalFile) => ({
      id: file.id,
      originalName: file.name,
      storeName: '',
      uri: '',
    })),
  ];

  return {
    existingFiles,
    newFiles,
    displayFiles,
    buttonText,
    handleFileChange,
    handleRemoveFile,
  };
}
