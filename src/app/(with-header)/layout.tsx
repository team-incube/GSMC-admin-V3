import Header from '@/shared/ui/header/ui/Header';

export default function Mainlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex justify-center px-4">
        <main className="flex w-full max-w-[600px]">{children}</main>
      </div>
    </>
  );
}
