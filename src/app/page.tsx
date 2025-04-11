{/* Force deployment refresh: 2024-07-14T15:00:00.000Z */}
'use client';

import dynamic from 'next/dynamic';

// Use dynamic import to avoid hydration issues with client components
const OfficeMapper = dynamic(() => import('./components/OfficeMapper'), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Version: 1.0.2 - QR Export Feature */}
      <OfficeMapper />
    </>
  );
}
