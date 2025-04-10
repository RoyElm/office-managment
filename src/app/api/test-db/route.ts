// Setting dynamic export for static site generation
export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;

import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';

export async function GET() {
  // When building for static export, this code doesn't actually run server-side
  // It's just used to generate the API routes structure
  // For a real static site, you would implement client-side API calls
  return NextResponse.json({ 
    status: 'This is a static API response',
    note: 'For GitHub Pages deployment, server-side functionality is not available'
  });
} 