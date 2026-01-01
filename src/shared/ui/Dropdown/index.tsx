import { useState } from 'react';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  options: string[] | DropdownOption[];
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
  disabled?: boolean;
}

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  className,
  name,
  disabled = false
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const normalizedOptions: DropdownOption[] = options.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option
  );

  const displayLabel = normalizedOptions.find((opt) => opt.value === value)?.label || value;

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    if (!disabled && onChange) {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className ?? ''}`}>
      {label ? (
        <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
      ) : null}
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-200 rounded-lg text-left text-sm ${disabled
            ? 'cursor-not-allowed opacity-60 bg-gray-50'
            : 'cursor-pointer'
          }`}
      >
        <span>{displayLabel}</span>
        <span className="text-gray-400">▼</span>
      </button>
      {isOpen && !disabled ? (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {normalizedOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className="w-full px-4 py-3 text-left text-sm cursor-pointer hover:bg-gray-50"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;