interface ChangeButtonProps {
  onClick?: () => void;
}

export default function ChangeButton({ onClick }: ChangeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer border-main-500 text-main-500 h-[34px] w-[56px] rounded-lg border text-lg font-semibold"
    >
      변경
    </button>
  );
}
