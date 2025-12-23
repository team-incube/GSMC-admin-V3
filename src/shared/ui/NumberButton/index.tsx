import { cn } from "@/shared/lib/cn";

interface NumberButtonProps {
  value: number;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

export default function NumberButton({ value, onClick, isSelected = false, className, ...props }: NumberButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-13 w-23.5 cursor-pointer rounded-xl border px-4.5 py-3 text-lg font-bold',
        isSelected
          ? 'bg-main-500 border-main-500 text-white'
          : 'border-main-500 text-main-500 hover:bg-main-50',
        className
      )}
      {...props}
    >
      {value}
    </button>
  );
}
