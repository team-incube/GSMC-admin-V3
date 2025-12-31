'use client';

import React, { useEffect, useRef } from 'react';

import { AllowedExtension, FileType } from '@/entities/file/model/file';
import Chain from '@/shared/asset/svg/Chain';
import useFileUploaderState from '@/shared/model/useHandlingFileUploader';
import FileList from '@/shared/ui/FileList';

interface FileUploaderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | "accept"> {
  label: string;
  uploadedFiles?: FileType | FileType[];
  isMultiple?: boolean;
  accept?: AllowedExtension | AllowedExtension[];
  onChange?: (files: { existing: FileType[], new: File[] }) => void;
}

interface NewFileInputProps {
  file: File;
}

const NewFileInput = ({ file }: NewFileInputProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current && file) {
      const dt = new DataTransfer();
      dt.items.add(file);
      ref.current.files = dt.files;
    }
  }, [file]);

  return (
    <input
      ref={ref}
      type="file"
      name="newFiles"
      className="hidden"
      readOnly
    />
  );
};

export default function FileUploader({
  label,
  uploadedFiles,
  isMultiple = false,
  accept,
  onChange,
  ...props
}: FileUploaderProps) {
  const {
    existingFiles,
    newFiles,
    displayFiles,
    buttonText,
    handleFileChange,
    handleRemoveFile,
  } = useFileUploaderState({ uploadedFiles, isMultiple, onChange });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="flex flex-col gap-1">
        <label className="text-body1 text-main-700">{label}</label>

        <div
          role="button"
          tabIndex={0}
          className="focus:ring-main-500 flex cursor-not-allowed items-center gap-2 rounded-xl border border-gray-300 p-3 hover:border-gray-300 focus:outline-none"
        >
          <span className="text-gray-400">
            <Chain />
          </span>
          <span
            className="max-w-[220px] truncate text-sm text-gray-400"
            title={buttonText}
          >
            {buttonText}
          </span>

          <input
            ref={inputRef}
            type="file"
            accept={Array.isArray(accept) ? accept.join(',') : accept}
            className="hidden"
            multiple={isMultiple}
            onChange={handleFileChange}
            readOnly
            {...props}
          />
        </div>
      </div>

      <hr className="mt-6 mb-8" />

      <FileList files={displayFiles} onRemove={handleRemoveFile} />

      <div className="hidden">
        {existingFiles.map((file) => (
          <input
            key={`existing-${file.id}`}
            value={file.id}
            name="existingFileIds"
            type="hidden"
            readOnly
          />
        ))}

        {newFiles.map((localFile) => (
          <NewFileInput
            key={localFile.id}
            file={localFile.file}
          />
        ))}
      </div>
    </div>
  );
}