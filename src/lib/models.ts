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
  mapImage: { type: String, required: true }, // Base64 encoded image
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
  mapImage: string;
  employees: IEmployee[];
  rooms: IRoom[];
  createdAt?: Date;
  updatedAt?: Date;
} 