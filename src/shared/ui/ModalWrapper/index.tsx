import { cn } from '@/shared/lib/cn';

export default function ModalWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,17,17,0.20)]">
      <div className={cn('relative z-10 rounded-[20px] bg-white px-10 py-6', className)}>
        {children}
      </div>
    </div>
  );
}
