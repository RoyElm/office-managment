import mongoose from 'mongoose';

// Define the schemas for our data models

// Position Schema (for both employees and rooms)
const PositionSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true }
});

// Employee Schema
const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: PositionSchema, required: true },
  team: { type: String, required: false }
}, { 
  timestamps: true 
});

// Room Schema
const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: PositionSchema, required: true }
}, { 
  timestamps: true 
});

// Office Map Schema
const OfficeMapSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Untitled Map' },
  mapImage: { type: String, required: true }, // Base64 encoded image
  thumbnail: { type: String, required: false }, // Smaller version for previews
  employees: [EmployeeSchema],
  rooms: [RoomSchema]
}, { 
  timestamps: true 
});

// Create models (only if they don't already exist)
export const Employee = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
export const Room = mongoose.models.Room || mongoose.model('Room', RoomSchema);
export const OfficeMap = mongoose.models.OfficeMap || mongoose.model('OfficeMap', OfficeMapSchema);

// Helper function to convert MongoDB document to plain object
export function convertDocToObject<T>(doc: mongoose.Document): T {
  return JSON.parse(JSON.stringify(doc));
}

// Types for TypeScript
export interface IPosition {
  x: number;
  y: number;
}

export interface IEmployee {
  _id?: string;
  name: string;
  position: IPosition;
  team?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRoom {
  _id?: string;
  name: string;
  position: IPosition;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOfficeMap {
  _id?: string;
  name: string;
  mapImage: string;
  thumbnail?: string;
  employees: IEmployee[];
  rooms: IRoom[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Helper function to generate a thumbnail from a base64 image
export function generateThumbnail(base64Image: string, maxSize: number = 300): string {
  // If there's no image or it doesn't start with data:image, return empty
  if (!base64Image || !base64Image.startsWith('data:image')) {
    return '';
  }

  // For actual implementation, we would resize the image here
  // For simplicity, we'll just return the original image
  // In a real implementation, you'd use canvas to resize the image
  return base64Image;
} 