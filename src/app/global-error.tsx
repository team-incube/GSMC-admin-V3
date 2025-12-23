'use client';

import Button from "@/shared/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="flex h-screen flex-col items-center justify-center">
          <h2 className="text-center text-xl font-bold">예기치 않은 오류가 발생했습니다</h2>
          <p className="mt-2 text-gray-600">{error.message}</p>
          <Button variant="active" onClick={reset}>
            다시 시도
          </Button>
        </main>
      </body>
    </html>
  );
}
