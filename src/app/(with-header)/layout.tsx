import Header from "@/widget/header/ui";

export default function Mainlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex justify-center px-4">
        <main className="flex w-full max-w-[900px]">{children}</main>
      </div>
    </>
  );
}
