export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import { OfficeMap, convertDocToObject, IOfficeMap } from '../../../lib/models';

// GET handler to retrieve the office map
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get the most recent office map
    const officeMap = await OfficeMap.findOne().sort({ createdAt: -1 });

    if (!officeMap) {
      return NextResponse.json({ message: 'No office map found' }, { status: 404 });
    }

    return NextResponse.json({ data: convertDocToObject<IOfficeMap>(officeMap) });
  } catch (error) {
    console.error('Error getting office map:', error);
    return NextResponse.json({ error: 'Failed to retrieve office map' }, { status: 500 });
  }
}

// POST handler to create or update the office map
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const data = await request.json();
    const { mapImage, employees, rooms } = data;

    if (!mapImage) {
      return NextResponse.json({ error: 'Map image is required' }, { status: 400 });
    }

    // Create a new office map
    const officeMap = await OfficeMap.create({
      mapImage,
      employees: employees || [],
      rooms: rooms || []
    });

    return NextResponse.json({ 
      message: 'Office map created successfully',
      data: convertDocToObject<IOfficeMap>(officeMap)
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating office map:', error);
    return NextResponse.json({ error: 'Failed to create office map' }, { status: 500 });
  }
}

// PUT handler to update an existing office map
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const data = await request.json();
    const { mapImage, employees, rooms } = data;

    // Get the most recent office map
    const officeMap = await OfficeMap.findOne().sort({ createdAt: -1 });

    if (!officeMap) {
      return NextResponse.json({ error: 'No office map found to update' }, { status: 404 });
    }

    // Update the office map
    if (mapImage) officeMap.mapImage = mapImage;
    if (employees) officeMap.employees = employees;
    if (rooms) officeMap.rooms = rooms;

    await officeMap.save();

    return NextResponse.json({ 
      message: 'Office map updated successfully',
      data: convertDocToObject<IOfficeMap>(officeMap)
    });
  } catch (error) {
    console.error('Error updating office map:', error);
    return NextResponse.json({ error: 'Failed to update office map' }, { status: 500 });
  }
} 