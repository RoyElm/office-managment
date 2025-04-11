// API route for testing MongoDB connection

import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';

export async function GET() {
  try {
    const connection = await dbConnect();
    
    return NextResponse.json({ 
      status: 'Connected to MongoDB!',
      dbName: connection?.db?.databaseName || 'unknown'
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ 
      error: 'Failed to connect to MongoDB',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 