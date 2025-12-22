import Header from "@/widget/header/ui";

export default function Mainlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <main className="flex w-full max-w-225">{children}</main>
      </div>
    </>
  );
}
