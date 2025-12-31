import { cn } from "@/shared/lib/cn";
import { useEffect } from "react";

export default function ModalWrapper({ children, className, onClose }: { children: React.ReactNode, className?: string, onClose?: () => void }) {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,17,17,0.20)]" onClick={onClose}>
      <div className={cn(`relative z-10 rounded-[20px] bg-white px-10 py-6`, className)} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
