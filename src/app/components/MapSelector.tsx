'use client';

import { useState } from 'react';

interface MapInfo {
  id: string;
  name: string;
  thumbnail: string; // base64 of the map image (compressed)
  created: string;   // ISO date string
}

interface MapSelectorProps {
  maps: MapInfo[];
  currentMapId: string | null;
  onSelectMap: (mapId: string) => void;
  onAddNewMap: () => void;
  onDeleteMap: (mapId: string) => void;
  onRenameMap: (mapId: string, newName: string) => void;
}

export default function MapSelector({
  maps,
  currentMapId,
  onSelectMap,
  onAddNewMap,
  onDeleteMap,
  onRenameMap
}: MapSelectorProps) {
  const [editingMapId, setEditingMapId] = useState<string | null>(null);
  const [newMapName, setNewMapName] = useState('');
  
  const handleRenameMap = (mapId: string) => {
    if (!newMapName.trim()) {
      setEditingMapId(null);
      return;
    }
    
    onRenameMap(mapId, newMapName);
    setEditingMapId(null);
    setNewMapName('');
  };
  
  const startEditing = (mapId: string, currentName: string) => {
    setEditingMapId(mapId);
    setNewMapName(currentName);
  };
  
  const confirmDelete = (mapId: string, mapName: string) => {
    if (confirm(`Are you sure you want to delete "${mapName}"? This action cannot be undone.`)) {
      onDeleteMap(mapId);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Maps</h2>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
          onClick={onAddNewMap}
        >
          Add New Map
        </button>
      </div>
      
      {maps.length === 0 ? (
        <div className="text-center p-6 border border-dashed rounded-lg">
          <p className="text-gray-500 mb-3">You don't have any maps yet</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={onAddNewMap}
          >
            Create Your First Map
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {maps.map(map => (
            <div 
              key={map.id}
              className={`border rounded-lg overflow-hidden ${
                currentMapId === map.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div 
                className="h-32 relative cursor-pointer"
                onClick={() => onSelectMap(map.id)}
              >
                {map.thumbnail ? (
                  <img 
                    src={map.thumbnail} 
                    alt={map.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    No Preview
                  </div>
                )}
                
                {currentMapId === map.id && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
                    Current
                  </div>
                )}
              </div>
              
              <div className="p-3 border-t bg-white">
                {editingMapId === map.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 px-2 py-1 border rounded text-sm"
                      value={newMapName}
                      onChange={(e) => setNewMapName(e.target.value)}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameMap(map.id);
                        if (e.key === 'Escape') setEditingMapId(null);
                      }}
                    />
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleRenameMap(map.id)}
                    >
                      ✓
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setEditingMapId(null)}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{map.name}</h3>
                      <p className="text-xs text-gray-500">
                        {new Date(map.created).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-1">
                      <button
                        className="p-1 text-gray-500 hover:text-blue-500"
                        onClick={() => startEditing(map.id, map.name)}
                        title="Rename"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      {maps.length > 1 && (
                        <button
                          className="p-1 text-gray-500 hover:text-red-500"
                          onClick={() => confirmDelete(map.id, map.name)}
                          title="Delete"
                          disabled={currentMapId === map.id}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 