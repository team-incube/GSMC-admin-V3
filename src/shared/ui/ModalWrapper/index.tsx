export default function ModalWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,17,17,0.20)]">
      <div className="relative z-10 rounded-[20px] bg-white px-10 py-6">{children}</div>
    </div>
  );
}
