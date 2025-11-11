import { cn } from '@/shared/lib/cn';

interface ButtonProps {
  children: React.ReactNode;
  variant?: variant;
}

type variant = 'disabled' | 'active' | 'border' | 'disabled_border';

const VARIANT_STYLE = {
  disabled: 'text-gray-500 bg-gray-200',
  active: 'bg-main-500 text-white',
  border: 'border border-main-400 text-main-400',
  disabled_border: 'border border-gray-500 text-gray-500',
};

export default function Button({
  children,
  variant = 'active',
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'text-body1 flex w-full cursor-pointer items-center justify-center rounded-xl py-3',
        VARIANT_STYLE[variant],
      )}
      {...props}
    >
      {children}
    </button>
  );
}
