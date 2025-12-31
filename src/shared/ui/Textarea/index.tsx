import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps {
  label?: string;
  description?: string;
}

type Props = TextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ label = '내용', description = '', ...props }: Props) {
  return (
    <div>
      <label className="w-full flex justify-between text-body1 text-main-700" htmlFor={label}>
        <span>{label}</span>
        <span className="ml-2 text-sm text-gray-500">{description}</span>
      </label>
      <textarea
        className="w-full min-h-50 resize-none rounded-2xl border border-gray-300 p-5"
        id={label}
        {...props}
      />
    </div>
  );
}
