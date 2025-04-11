'use client';
{/* Force deployment refresh: 2024-07-14T15:00:00.000Z */}

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import to avoid hydration issues with client components
const OfficeMapper = dynamic(() => import('./components/OfficeMapper'));

export default function Home() {
  return (
    <>
      {/* Version: 1.0.2 - QR Export Feature */}
      <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
        <OfficeMapper />
      </Suspense>
    </>
  );
}
