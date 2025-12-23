import IntroView from '@/view/intro/ui/introView';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={null}>
      <IntroView />
    </Suspense>
  )
}
