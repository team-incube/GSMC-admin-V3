interface ReadOnlyInputProps {
  label: string;
  value: string | number;
}

export default function ReadOnlyInput({ label, value }: ReadOnlyInputProps) {
  return (
    <div className="mb-3">
      <label className="mb-2 block text-base font-medium text-gray-900">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="h-[52px] w-full rounded-lg border border-gray-300 px-4 text-base text-gray-900"
      />
    </div>
  );
}
