'use client';

import { useState, useRef } from 'react';

interface Room {
  id: string;
  name: string;
  position: { x: number; y: number };
}

interface RoomRenamingProps {
  mapImage: string;
  rooms: Room[];
  onRoomAdd: (room: Room) => void;
  onRoomUpdate: (id: string, updates: Partial<Room>) => void;
  onRoomRemove: (id: string) => void;
}

export default function RoomRenaming({
  mapImage,
  rooms,
  onRoomAdd,
  onRoomUpdate,
  onRoomRemove
}: RoomRenamingProps) {
  const [isPlacingRoom, setIsPlacingRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleMapClick = (e: React.MouseEvent) => {
    if (!isPlacingRoom || !mapContainerRef.current) return;

    const rect = mapContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name: 'New Room',
      position: { x, y }
    };

    onRoomAdd(newRoom);
    setIsPlacingRoom(false);
    setSelectedRoom(newRoom.id);
  };

  const handleRoomClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRoom(id);
  };

  const handleNameChange = (id: string, name: string) => {
    onRoomUpdate(id, { name });
  };

  const handleRemoveRoom = (id: string) => {
    onRoomRemove(id);
    setSelectedRoom(null);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Room Renaming</h2>
        <button
          className={`px-4 py-2 rounded-md ${
            isPlacingRoom ? 'bg-green-500' : 'bg-blue-500'
          } text-white`}
          onClick={() => setIsPlacingRoom(!isPlacingRoom)}
        >
          {isPlacingRoom ? 'Cancel' : 'Add Room Label'}
        </button>
      </div>

      {isPlacingRoom && (
        <div className="mb-4 p-2 bg-yellow-100 rounded-md">
          <p className="text-sm text-yellow-800">
            Click on the map to place a room label
          </p>
        </div>
      )}

      <div 
        className="relative border rounded-lg overflow-hidden"
        ref={mapContainerRef}
        onClick={handleMapClick}
      >
        <img 
          src={mapImage} 
          alt="Office Map" 
          className="w-full h-auto"
        />
        
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`absolute px-2 py-1 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
              selectedRoom === room.id
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-white/80 border border-gray-300'
            }`}
            style={{
              left: `${room.position.x}%`,
              top: `${room.position.y}%`,
            }}
            onClick={(e) => handleRoomClick(room.id, e)}
          >
            {room.name}
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Room Details</h3>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={rooms.find(r => r.id === selectedRoom)?.name || ''}
              onChange={(e) => handleNameChange(selectedRoom, e.target.value)}
            />
          </div>
          
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
            onClick={() => handleRemoveRoom(selectedRoom)}
          >
            Remove Room Label
          </button>
        </div>
      )}
    </div>
  );
} 