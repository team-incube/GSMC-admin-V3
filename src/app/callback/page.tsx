import CallbackView from '@/view/callback/ui/CallbackView';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default function CallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackView />
    </Suspense>
  );
}
