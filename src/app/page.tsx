'use client';

import dynamic from 'next/dynamic';

// Use dynamic import to avoid hydration issues with client components
const OfficeMapper = dynamic(() => import('./components/OfficeMapper'), { ssr: false });

export default function Home() {
  return (
    <OfficeMapper />
  );
}
