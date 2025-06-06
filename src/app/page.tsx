'use client';
{/* Force deployment refresh: 2024-07-14T15:00:00.000Z */}

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import to avoid hydration issues with client components
const OfficeMapper = dynamic(() => import('./components/OfficeMapper'));

export default function Home() {
  return (
    <>
      {/* Version: 1.0.3 - Fixed Deployment with QR Export Feature */}
      <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
        <div className="fixed top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs z-50 opacity-50 hover:opacity-100">
          v1.0.3
        </div>
        <OfficeMapper />
      </Suspense>
    </>
  );
}
