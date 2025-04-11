// Remove static export settings for real deployment
export const dynamic = 'force-static';
export const revalidate = false;

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import { OfficeMap, convertDocToObject, IOfficeMap, generateThumbnail } from '../../../lib/models';

// GET handler to retrieve all office maps or a specific one
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Check if a specific map ID is requested
    const url = new URL(request.url);
    const mapId = url.searchParams.get('id');
    
    if (mapId) {
      // Get a specific map
      const officeMap = await OfficeMap.findById(mapId);
      
      if (!officeMap) {
        return NextResponse.json({ message: 'Office map not found' }, { status: 404 });
      }
      
      return NextResponse.json({ data: convertDocToObject<IOfficeMap>(officeMap) });
    } else {
      // Get all maps (only returning minimal data to save bandwidth)
      const officeMaps = await OfficeMap.find({}, {
        name: 1,
        thumbnail: 1,
        createdAt: 1,
        updatedAt: 1
      }).sort({ updatedAt: -1 });
      
      return NextResponse.json({ 
        data: officeMaps.map(map => convertDocToObject(map))
      });
    }
  } catch (error) {
    console.error('Error getting office map(s):', error);
    return NextResponse.json({ error: 'Failed to retrieve office map data' }, { status: 500 });
  }
}

// POST handler to create a new office map
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const data = await request.json();
    const { name, mapImage, employees, rooms } = data;

    if (!mapImage) {
      return NextResponse.json({ error: 'Map image is required' }, { status: 400 });
    }

    // Generate a thumbnail
    const thumbnail = generateThumbnail(mapImage);
    
    // Create a new office map
    const officeMap = await OfficeMap.create({
      name: name || 'Untitled Map',
      mapImage,
      thumbnail,
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
    const { id, name, mapImage, employees, rooms } = data;
    
    if (!id) {
      return NextResponse.json({ error: 'Map ID is required for updates' }, { status: 400 });
    }

    // Find the office map by ID
    const officeMap = await OfficeMap.findById(id);

    if (!officeMap) {
      return NextResponse.json({ error: 'Office map not found' }, { status: 404 });
    }

    // Update fields if provided
    if (name) officeMap.name = name;
    if (mapImage) {
      officeMap.mapImage = mapImage;
      officeMap.thumbnail = generateThumbnail(mapImage);
    }
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

// DELETE handler to remove an office map
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get the map ID from the URL
    const url = new URL(request.url);
    const mapId = url.searchParams.get('id');
    
    if (!mapId) {
      return NextResponse.json({ error: 'Map ID is required' }, { status: 400 });
    }
    
    // Find and delete the map
    const result = await OfficeMap.findByIdAndDelete(mapId);
    
    if (!result) {
      return NextResponse.json({ error: 'Office map not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      message: 'Office map deleted successfully',
      id: mapId
    });
  } catch (error) {
    console.error('Error deleting office map:', error);
    return NextResponse.json({ error: 'Failed to delete office map' }, { status: 500 });
  }
} 