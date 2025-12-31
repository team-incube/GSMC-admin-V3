import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { FileType } from '@/entities/file/model/file';
import Close from '@/shared/asset/svg/Close';
import File from '@/shared/asset/svg/File';
import LeftArrow from '@/shared/asset/svg/LeftArrow';
import RightArrow from '@/shared/asset/svg/RightArrow';
interface FileListProps {
  files: FileType[] | [];
  onRemove?: (fileId: number | string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
  const [showArrows, setShowArrows] = useState({ left: false, right: false });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const updateArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowArrows({
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth - 1
      });
    }
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [files]);

  if (files.length === 0) return null;

  const imageFiles = files.filter(file =>
    file.originalName.match(/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i) && file.uri
  );
  const otherFiles = files.filter(file =>
    !file.originalName.match(/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i) || !file.uri
  );

  const getFileExtension = (filename: string) => {
    const ext = filename.split('.').pop()?.toUpperCase();
    return ext || '';
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const newPosition = direction === 'left'
      ? Math.max(0, container.scrollLeft - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + scrollAmount);

    container.scrollTo({ left: newPosition, behavior: 'smooth' });
  };

  const handleScrollEvent = () => {
    updateArrows();
  };

  return (
    <div className="mt-3">
      <h3 className="text-sm font-semibold mb-2">첨부 파일 목록</h3>

      {imageFiles.length > 0 && (
        <div className="relative mb-4">
          {showArrows.left ? <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg cursor-pointer"
            type="button"
          >
            <span className="flex items-center justify-center">
              <LeftArrow width={20} height={20} />
            </span>
          </button> : null}

          <div
            ref={scrollContainerRef}
            onScroll={handleScrollEvent}
            className="flex gap-2 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {imageFiles.map((file) => (
              <div key={file.id} className="relative shrink-0 group" style={{ width: '120px' }}>
                <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                  <Image
                    src={file.uri}
                    alt={file.originalName}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
                {onRemove ? <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(file.id);
                  }}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <span className="flex items-center justify-center">
                    <Close width={20} height={20} />
                  </span>
                </button> : null}
                <p className="text-xs text-gray-600 mt-1 truncate">{file.originalName}</p>
              </div>
            ))}
          </div>

          {showArrows.right ? <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg cursor-pointer"
            type="button"
          >
            <span className="flex items-center justify-center">
              <RightArrow width={20} height={20} />
            </span>
          </button> : null}
        </div>
      )}

      {otherFiles.length > 0 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {otherFiles.map((file) => (
            <div key={file.id} className="relative shrink-0 group" style={{ width: '120px' }}>
              <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {getFileExtension(file.originalName)}
                </div>
                <File
                  width={48}
                  height={48}
                  className="opacity-50"
                />
              </div>
              {onRemove ? <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(file.id);
                }}
                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="flex items-center justify-center">
                  <Close width={20} height={20} />
                </span>
              </button> : null}
              <Link href={file.uri || '#'} className="text-sm text-gray-600 mt-1 line-clamp-1 truncate block">
                {file.originalName}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;