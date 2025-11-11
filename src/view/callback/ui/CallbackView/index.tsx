'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CallbackView() {
  const searchParams = useSearchParams();

  const code = searchParams.get('code');

  useEffect(() => {
    async function run() {
      try {
        if (code) {
          await fetch('/api/auth/google/callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
            credentials: 'include',
          });
        }
      } catch (e) {
        throw e;
      }
    }

    run();
  }, [code]);

  return null;
}
