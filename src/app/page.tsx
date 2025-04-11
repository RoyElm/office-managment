'use client';
{/* Force deployment refresh: 2024-07-14T15:00:00.000Z */}

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import to avoid hydration issues with client components
const OfficeMapper = dynamic(() => import('./components/OfficeMapper'));

// Add GitHub Pages helper message
const GitHubPagesNote = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-2 text-center text-sm">
    Running on GitHub Pages - Using local storage for data. API routes aren't available in static export mode.
  </div>
);

export default function Home() {
  return (
    <>
      {/* Version: 1.0.4 - Fixed GitHub Pages deployment with offline mode */}
      <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
        <OfficeMapper />
      </Suspense>
      
      {/* Only show GitHub Pages note in production */}
      {process.env.NODE_ENV === 'production' && <GitHubPagesNote />}
    </>
  );
}
