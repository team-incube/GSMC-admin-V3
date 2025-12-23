'use client';

import Button from "@/shared/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-center text-xl font-bold">문제가 발생했습니다</h2>
      <p className="mt-2 text-gray-600">{error.message}</p>
      <Button variant="active" onClick={reset}>
        다시 시도
      </Button>
    </main>
  );
}
