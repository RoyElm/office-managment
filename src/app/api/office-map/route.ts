// Commenting out dynamic export for static site generation
// export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import { OfficeMap, convertDocToObject, IOfficeMap } from '../../../lib/models';

// Dummy data for static build
const dummyOfficeMap = {
  _id: 'static-id',
  mapImage: 'static-map-url',
  employees: [],
  rooms: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// GET handler to retrieve the office map
export async function GET(request: NextRequest) {
  // For static export, return dummy data
  return NextResponse.json({ 
    data: dummyOfficeMap,
    note: 'This is static data. For GitHub Pages deployment, server-side functionality is not available.'
  });
}

// POST handler to create or update the office map
export async function POST(request: NextRequest) {
  // For static export, return a static response
  return NextResponse.json({ 
    message: 'Static response - cannot create office map in static build',
    note: 'For GitHub Pages deployment, server-side functionality is not available.'
  }, { status: 200 });
}

// PUT handler to update an existing office map
export async function PUT(request: NextRequest) {
  // For static export, return a static response
  return NextResponse.json({ 
    message: 'Static response - cannot update office map in static build',
    note: 'For GitHub Pages deployment, server-side functionality is not available.'
  }, { status: 200 });
} 