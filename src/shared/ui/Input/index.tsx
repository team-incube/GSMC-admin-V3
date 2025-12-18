interface InputProps {
  label?: string;
}

export default function Input({
  label,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-body1 text-main-700" htmlFor={label}>
        {label}
      </label>
      <input className="rounded-2xl border border-gray-300 p-4" id={label} type="text" {...props} />
    </div>
  );
}
