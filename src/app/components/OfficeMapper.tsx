'use client';

import { useState, useEffect } from 'react';
import MapUploader from './MapUploader';
import EmployeePlacement from './EmployeePlacement';
import RoomRenaming from './RoomRenaming';
import TeamAssignment from './TeamAssignment';
import SearchFilter from './SearchFilter';
import MapPreviewModal from './MapPreviewModal';
import MapSelector from './MapSelector';
import { IEmployee, IRoom, IOfficeMap } from '../../lib/models';
import { useSearchParams } from 'next/navigation';

interface Employee {
  id: string;
  name: string;
  position: { x: number; y: number };
  team?: string;
}

interface Room {
  id: string;
  name: string;
  position: { x: number; y: number };
}

interface MapInfo {
  id: string;
  name: string;
  thumbnail: string;
  created: string;
}

export default function OfficeMapper() {
  const searchParams = useSearchParams();
  const [maps, setMaps] = useState<MapInfo[]>([]);
  const [currentMapId, setCurrentMapId] = useState<string | null>(null);
  const [mapImage, setMapImage] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [highlightedEmployee, setHighlightedEmployee] = useState<string | null>(null);
  const [showFullScreenPreview, setShowFullScreenPreview] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  
  // Check URL parameters for direct highlighting
  useEffect(() => {
    if (searchParams) {
      const highlightId = searchParams.get('highlight');
      if (highlightId) {
        setHighlightedEmployee(highlightId);
        // Show the full screen preview when directly accessing an employee
        setShowFullScreenPreview(true);
      }
      
      // Check if a specific map is requested
      const mapId = searchParams.get('map');
      if (mapId && mapId !== currentMapId) {
        loadSpecificMap(mapId);
      }
    }
  }, [searchParams]);
  
  // Load the list of maps
  const loadMapsList = async () => {
    try {
      if (isOfflineMode) {
        console.log('Using offline mode to load maps');
        // Load maps from localStorage
        try {
          const savedMapsStr = localStorage.getItem('officeMapperMaps');
          if (savedMapsStr) {
            const savedMaps = JSON.parse(savedMapsStr) as MapInfo[];
            setMaps(savedMaps);
            
            // If we have maps but no current map, select the first one
            if (savedMaps.length > 0 && !currentMapId) {
              loadSpecificMap(savedMaps[0].id);
            }
          } else if (!currentMapId) {
            // Initialize with empty data if no maps exist
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Error loading maps from localStorage:', error);
          setIsLoading(false);
        }
        return;
      }
      
      // Load from database
      console.log('Attempting to load maps from database...');
      const response = await fetch('/api/office-map');
      console.log('API response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.data && Array.isArray(result.data)) {
          const mapsList = result.data.map((map: any) => ({
            id: map._id,
            name: map.name || 'Untitled Map',
            thumbnail: map.thumbnail || '',
            created: map.createdAt
          }));
          
          setMaps(mapsList);
          
          // If we have maps but no current map, select the first one
          if (mapsList.length > 0 && !currentMapId) {
            loadSpecificMap(mapsList[0].id);
          } else if (mapsList.length === 0) {
            // No maps exist yet
            setIsLoading(false);
          }
        } else {
          console.error('Invalid data format received for maps list');
          setIsLoading(false);
        }
      } else {
        console.error('Failed to fetch maps list:', response.statusText);
        switchToOfflineMode();
      }
    } catch (error) {
      console.error('Error loading maps list:', error);
      switchToOfflineMode();
    }
  };
  
  // Load specific map data
  const loadSpecificMap = async (mapId: string) => {
    setIsLoading(true);
    
    try {
      if (isOfflineMode) {
        // Load from localStorage
        try {
          const savedMapStr = localStorage.getItem(`officeMapperData_${mapId}`);
          if (savedMapStr) {
            const savedMap = JSON.parse(savedMapStr);
            setMapImage(savedMap.mapImage);
            setEmployees(savedMap.employees || []);
            setRooms(savedMap.rooms || []);
            setCurrentMapId(mapId);
            
            // Set default tab based on whether we have a map
            if (savedMap.mapImage) {
              setActiveTab('employees');
            } else {
              setActiveTab('upload');
            }
          } else {
            // Map not found in localStorage
            showNotification('Map not found in local storage', 'error');
          }
        } catch (localError) {
          console.error('Error loading map from localStorage:', localError);
        }
        
        setIsLoading(false);
        return;
      }
      
      // Load from database
      const response = await fetch(`/api/office-map?id=${mapId}`);
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.data) {
          const mapData = result.data;
          
          setMapImage(mapData.mapImage);
          
          // Convert MongoDB employees to our format
          const dbEmployees = mapData.employees.map((emp: IEmployee) => ({
            id: emp._id || `emp-${Date.now()}-${Math.random()}`,
            name: emp.name,
            position: emp.position,
            team: emp.team
          }));
          setEmployees(dbEmployees);
          
          // Convert MongoDB rooms to our format
          const dbRooms = mapData.rooms.map((room: IRoom) => ({
            id: room._id || `room-${Date.now()}-${Math.random()}`,
            name: room.name,
            position: room.position
          }));
          setRooms(dbRooms);
          
          setCurrentMapId(mapId);
          
          // Switch tab based on loaded data
          if (mapData.mapImage) {
            setActiveTab('employees');
          } else {
            setActiveTab('upload');
          }
        }
      } else if (response.status === 404) {
        showNotification('Map not found', 'error');
      } else {
        switchToOfflineMode();
      }
    } catch (error) {
      console.error('Error loading specific map:', error);
      switchToOfflineMode();
    } finally {
      setIsLoading(false);
    }
  };
  
  // Switch to offline mode and try to load from localStorage
  const switchToOfflineMode = () => {
    console.warn('Switching to offline mode');
    setIsOfflineMode(true);
    
    // Try to load maps from localStorage
    try {
      const savedMapsStr = localStorage.getItem('officeMapperMaps');
      if (savedMapsStr) {
        const savedMaps = JSON.parse(savedMapsStr) as MapInfo[];
        setMaps(savedMaps);
        
        // If current map is set, try to load it
        if (currentMapId) {
          const savedMapStr = localStorage.getItem(`officeMapperData_${currentMapId}`);
          if (savedMapStr) {
            const savedMap = JSON.parse(savedMapStr);
            setMapImage(savedMap.mapImage);
            setEmployees(savedMap.employees || []);
            setRooms(savedMap.rooms || []);
          }
        } else if (savedMaps.length > 0) {
          // If no current map but we have maps, load the first one
          const firstMapId = savedMaps[0].id;
          const savedMapStr = localStorage.getItem(`officeMapperData_${firstMapId}`);
          if (savedMapStr) {
            const savedMap = JSON.parse(savedMapStr);
            setMapImage(savedMap.mapImage);
            setEmployees(savedMap.employees || []);
            setRooms(savedMap.rooms || []);
            setCurrentMapId(firstMapId);
          }
        }
      }
    } catch (localError) {
      console.error('Error loading from localStorage:', localError);
    }
    
    setIsLoading(false);
  };
  
  // Helper function for notifications
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };
  
  // Load initial data 
  useEffect(() => {
    // Load maps list which will then load specific map
    loadMapsList();
  }, []);
  
  // Save all data to the database
  const saveToDatabase = async () => {
    if (!mapImage || !currentMapId) return;
    
    try {
      setIsSaving(true);
      
      // Always save to localStorage as backup
      try {
        // Save map data
        localStorage.setItem(`officeMapperData_${currentMapId}`, JSON.stringify({
          mapImage,
          employees,
          rooms
        }));
        
        // Update thumbnail in maps list
        const updatedMaps = maps.map(map => {
          if (map.id === currentMapId) {
            return { ...map, thumbnail: mapImage };
          }
          return map;
        });
        setMaps(updatedMaps);
        localStorage.setItem('officeMapperMaps', JSON.stringify(updatedMaps));
      } catch (localError) {
        console.error('Error saving to localStorage:', localError);
      }
      
      // Skip MongoDB save if in offline mode
      if (isOfflineMode) {
        setNotification({
          message: 'Data saved locally (offline mode)',
          type: 'success'
        });
        setTimeout(() => setNotification(null), 5000);
        setIsSaving(false);
        return;
      }
      
      // Convert employees to database format
      const dbEmployees = employees.map(emp => ({
        name: emp.name,
        position: emp.position,
        team: emp.team
      }));
      
      // Convert rooms to database format
      const dbRooms = rooms.map(room => ({
        name: room.name,
        position: room.position
      }));
      
      // Update existing map
      const response = await fetch('/api/office-map', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: currentMapId,
          mapImage,
          employees: dbEmployees,
          rooms: dbRooms
        })
      });
      
      if (response.ok) {
        setNotification({
          message: 'Office map saved successfully!',
          type: 'success'
        });
        setTimeout(() => setNotification(null), 5000);
        
        // Refresh the maps list to update thumbnails
        loadMapsList();
      } else if (response.status === 500) {
        // Handle database connection errors
        setIsOfflineMode(true);
        setNotification({
          message: 'Database connection failed. Working in offline mode.',
          type: 'error'
        });
        setTimeout(() => setNotification(null), 5000);
      } else {
        throw new Error('Failed to save office map');
      }
    } catch (error) {
      console.error('Error saving office map:', error);
      setIsOfflineMode(true);
      setNotification({
        message: 'Failed to save to database. Working in offline mode.',
        type: 'error'
      });
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle map upload
  const handleMapUpload = (file: File) => {
    console.log('Map upload triggered with file:', file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        // Always update the map image
        const imageData = e.target.result as string;
        setMapImage(imageData);
        console.log('Map image updated successfully');
        
        // If we don't already have a map (first upload), switch to employees tab
        if (!mapImage) {
          setActiveTab('employees');
        } else {
          // Show confirmation of map replacement
          setNotification({
            message: 'Map successfully replaced!',
            type: 'success'
          });
          setTimeout(() => setNotification(null), 5000);
        }
        
        // Save to database when map is uploaded
        setTimeout(() => saveToDatabase(), 500);
      }
    };
    reader.readAsDataURL(file);
  };

  // Employee management with database save
  const handleEmployeeAdd = (employee: Employee) => {
    const updatedEmployees = [...employees, employee];
    setEmployees(updatedEmployees);
    setTimeout(() => saveToDatabase(), 500);
  };

  const handleEmployeeUpdate = (id: string, updates: Partial<Employee>) => {
    const updatedEmployees = employees.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    );
    setEmployees(updatedEmployees);
    setTimeout(() => saveToDatabase(), 500);
  };

  const handleEmployeeRemove = (id: string) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    setTimeout(() => saveToDatabase(), 500);
  };

  // Room management with database save
  const handleRoomAdd = (room: Room) => {
    const updatedRooms = [...rooms, room];
    setRooms(updatedRooms);
    setTimeout(() => saveToDatabase(), 500);
  };

  const handleRoomUpdate = (id: string, updates: Partial<Room>) => {
    const updatedRooms = rooms.map(room => 
      room.id === id ? { ...room, ...updates } : room
    );
    setRooms(updatedRooms);
    setTimeout(() => saveToDatabase(), 500);
  };

  const handleRoomRemove = (id: string) => {
    const updatedRooms = rooms.filter(room => room.id !== id);
    setRooms(updatedRooms);
    setTimeout(() => saveToDatabase(), 500);
  };

  // Bulk employee addition with database save
  const handleEmployeesBulkAdd = (newEmployees: Employee[]) => {
    const updatedEmployees = [...employees, ...newEmployees];
    setEmployees(updatedEmployees);

    // Automatically switch to the employee placement tab to show the imported employees
    setActiveTab('employees');

    // Show success notification
    setNotification({
      message: `Successfully imported ${newEmployees.length} employees! You can now drag them to their exact positions.`,
      type: 'success'
    });
    
    // Clear notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
    
    // Save to database after import
    setTimeout(() => saveToDatabase(), 500);
  };

  // Clear highlight after 5 seconds (increased from 3 to give more time to see)
  useEffect(() => {
    if (highlightedEmployee) {
      const timer = setTimeout(() => {
        setHighlightedEmployee(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [highlightedEmployee]);

  // Create a new map
  const handleAddNewMap = async () => {
    const mapName = prompt('Enter a name for your new map', 'New Map');
    
    // If user cancelled the prompt
    if (mapName === null) return;
    
    try {
      setIsLoading(true);
      
      if (isOfflineMode) {
        // Create a new map in localStorage
        const newMapId = `map-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const newMap: MapInfo = {
          id: newMapId,
          name: mapName || 'Untitled Map',
          thumbnail: '',
          created: new Date().toISOString()
        };
        
        // Add to maps list
        const updatedMaps = [...maps, newMap];
        setMaps(updatedMaps);
        localStorage.setItem('officeMapperMaps', JSON.stringify(updatedMaps));
        
        // Initialize empty map data
        const newMapData = {
          mapImage: null,
          employees: [],
          rooms: []
        };
        localStorage.setItem(`officeMapperData_${newMapId}`, JSON.stringify(newMapData));
        
        // Select the new map
        setCurrentMapId(newMapId);
        setMapImage(null);
        setEmployees([]);
        setRooms([]);
        setActiveTab('upload');
        
        showNotification('New map created successfully', 'success');
      } else {
        // Create new map in database
        const response = await fetch('/api/office-map', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: mapName || 'Untitled Map',
            mapImage: '',
            employees: [],
            rooms: []
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          
          if (result.data) {
            // Refresh the maps list
            await loadMapsList();
            
            // Select the new map
            setCurrentMapId(result.data._id);
            setMapImage(null);
            setEmployees([]);
            setRooms([]);
            setActiveTab('upload');
            
            showNotification('New map created successfully', 'success');
          }
        } else if (response.status === 500) {
          switchToOfflineMode();
          showNotification('Failed to create map in database, working in offline mode', 'error');
        } else {
          showNotification('Failed to create new map', 'error');
        }
      }
    } catch (error) {
      console.error('Error creating new map:', error);
      switchToOfflineMode();
      showNotification('Error creating new map, switching to offline mode', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete a map
  const handleDeleteMap = async (mapId: string) => {
    try {
      setIsLoading(true);
      
      if (isOfflineMode) {
        // Remove from maps list
        const updatedMaps = maps.filter(map => map.id !== mapId);
        setMaps(updatedMaps);
        localStorage.setItem('officeMapperMaps', JSON.stringify(updatedMaps));
        
        // Remove map data
        localStorage.removeItem(`officeMapperData_${mapId}`);
        
        // If this was the current map, select another one
        if (mapId === currentMapId) {
          if (updatedMaps.length > 0) {
            loadSpecificMap(updatedMaps[0].id);
          } else {
            setCurrentMapId(null);
            setMapImage(null);
            setEmployees([]);
            setRooms([]);
            setActiveTab('upload');
          }

        }
        
        showNotification('Map deleted successfully', 'success');
      } else {
        // Delete map from database
        const response = await fetch('/api/office-map?id=' + mapId, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          // Refresh the maps list
          await loadMapsList();
          
          // If this was the current map, select another one
          if (mapId === currentMapId) {
            if (maps.length > 1) {
              const nextMap = maps.find(map => map.id !== mapId);
              if (nextMap) {
                loadSpecificMap(nextMap.id);
              }
            } else {
              setCurrentMapId(null);
              setMapImage(null);
              setEmployees([]);
              setRooms([]);
              setActiveTab('upload');
            }
          }
          
          showNotification('Map deleted successfully', 'success');
        } else if (response.status === 500) {
          switchToOfflineMode();
          showNotification('Failed to delete map from database, working in offline mode', 'error');
        } else {
          showNotification('Failed to delete map', 'error');
        }
      }
    } catch (error) {
      console.error('Error deleting map:', error);
      switchToOfflineMode();
      showNotification('Error deleting map, switching to offline mode', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Rename a map
  const handleRenameMap = async (mapId: string, newName: string) => {
    try {
      if (isOfflineMode) {
        // Update maps list
        const updatedMaps = maps.map(map => 
          map.id === mapId ? { ...map, name: newName } : map
        );
        setMaps(updatedMaps);
        localStorage.setItem('officeMapperMaps', JSON.stringify(updatedMaps));
        
        showNotification('Map renamed successfully', 'success');
      } else {
        // Update map in database
        const response = await fetch('/api/office-map', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: mapId,
            name: newName
          })
        });
        
        if (response.ok) {
          // Refresh maps list to show the new name
          await loadMapsList();
          showNotification('Map renamed successfully', 'success');
        } else if (response.status === 500) {
          switchToOfflineMode();
          showNotification('Failed to rename map in database, working in offline mode', 'error');
        } else {
          showNotification('Failed to rename map', 'error');
        }
      }
    } catch (error) {
      console.error('Error renaming map:', error);
      switchToOfflineMode();
      showNotification('Error renaming map, switching to offline mode', 'error');
    }
  };
  
  // Change to a different map
  const handleSelectMap = (mapId: string) => {
    if (mapId === currentMapId) return;
    
    // Save current map before switching
    if (currentMapId) {
      saveToDatabase();
    }
    
    // Load the selected map
    loadSpecificMap(mapId);
  };

  return (
    <div className="min-h-screen p-6">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">OfficeMapper</h1>
            <p className="text-gray-600">
              Upload and manage your office seating plans
              {isOfflineMode && ' (Offline Mode)'}
            </p>
          </div>
          
          {currentMapId && mapImage && (
            <button
              onClick={saveToDatabase}
              disabled={isSaving}
              className={`px-4 py-2 rounded-md ${isSaving ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white flex items-center gap-2`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {isOfflineMode ? 'Save Locally' : 'Save Map'}
                </>
              )}
            </button>
          )}
        </div>
        
        {/* Offline Mode Warning */}
        {isOfflineMode && (
          <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded-md text-sm text-yellow-800">
            Working in offline mode. Data is saved only to your browser's local storage.
          </div>
        )}
        
        {/* Notification */}
        {notification && (
          <div className={`mt-4 p-3 rounded-md ${
            notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {notification.message}
          </div>
        )}
      </header>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg text-gray-600">Loading office map data...</p>
          </div>
        </div>
      ) : maps.length === 0 ? (
        <div className="max-w-3xl mx-auto">
          <MapSelector 
            maps={maps}
            currentMapId={currentMapId}
            onSelectMap={handleSelectMap}
            onAddNewMap={handleAddNewMap}
            onDeleteMap={handleDeleteMap}
            onRenameMap={handleRenameMap}
          />
        </div>
      ) : !currentMapId ? (
        <div className="max-w-3xl mx-auto">
          <MapSelector 
            maps={maps}
            currentMapId={currentMapId}
            onSelectMap={handleSelectMap}
            onAddNewMap={handleAddNewMap}
            onDeleteMap={handleDeleteMap}
            onRenameMap={handleRenameMap}
          />
        </div>
      ) : !mapImage ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <MapSelector 
              maps={maps}
              currentMapId={currentMapId}
              onSelectMap={handleSelectMap}
              onAddNewMap={handleAddNewMap}
              onDeleteMap={handleDeleteMap}
              onRenameMap={handleRenameMap}
            />
          </div>
          
          <div className="lg:col-span-3">
            <MapUploader 
              onMapUpload={handleMapUpload} 
              existingMapImage={mapImage} 
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <MapSelector 
              maps={maps}
              currentMapId={currentMapId}
              onSelectMap={handleSelectMap}
              onAddNewMap={handleAddNewMap}
              onDeleteMap={handleDeleteMap}
              onRenameMap={handleRenameMap}
            />
          </div>
          
          <div className="lg:col-span-2">
            <div className="border-b mb-4">
              <nav className="flex flex-wrap space-x-2 space-y-1">
                <button
                  className={`py-2 px-3 rounded-t-md ${
                    activeTab === 'employees'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('employees')}
                >
                  Employee Placement
                </button>
                <button
                  className={`py-2 px-3 rounded-t-md ${
                    activeTab === 'rooms'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('rooms')}
                >
                  Room Renaming
                </button>
                <button
                  className={`py-2 px-3 rounded-t-md ${
                    activeTab === 'teams'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('teams')}
                >
                  Team Assignment
                </button>
                <button
                  className={`py-2 px-3 rounded-t-md ${
                    activeTab === 'search'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('search')}
                >
                  Search & Filter
                </button>
                <button
                  className={`py-2 px-3 rounded-t-md ${
                    activeTab === 'upload'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('upload')}
                >
                  Change Map
                </button>
              </nav>
            </div>
            
            {activeTab === 'employees' && (
              <EmployeePlacement
                mapImage={mapImage}
                employees={employees}
                onEmployeeAdd={handleEmployeeAdd}
                onEmployeeUpdate={handleEmployeeUpdate}
                onEmployeeRemove={handleEmployeeRemove}
                onEmployeesBulkAdd={handleEmployeesBulkAdd}
              />
            )}
            
            {activeTab === 'rooms' && (
              <RoomRenaming
                mapImage={mapImage}
                rooms={rooms}
                onRoomAdd={handleRoomAdd}
                onRoomUpdate={handleRoomUpdate}
                onRoomRemove={handleRoomRemove}
              />
            )}
            
            {activeTab === 'teams' && (
              <TeamAssignment
                employees={employees}
                onEmployeeUpdate={handleEmployeeUpdate}
                onHighlightEmployee={setHighlightedEmployee}
              />
            )}
            
            {activeTab === 'search' && (
              <SearchFilter
                employees={employees}
                onHighlightEmployee={setHighlightedEmployee}
              />
            )}

            {activeTab === 'upload' && (
              <MapUploader 
                onMapUpload={handleMapUpload} 
                existingMapImage={mapImage} 
              />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-4 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div 
                className="relative border rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setShowFullScreenPreview(true)}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/80 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                
                <img 
                  src={mapImage} 
                  alt="Office Map" 
                  className="w-full h-auto"
                />
                
                {/* Display all employees */}
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className={`absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-xs group ${
                      highlightedEmployee === employee.id
                        ? 'ring-4 ring-red-500 animate-pulse bg-red-200 z-50 w-8 h-8 font-bold'
                        : employee.team
                        ? getTeamColor(employee.team)
                        : 'bg-gray-400'
                    }`}
                    style={{
                      left: `${employee.position.x}%`,
                      top: `${employee.position.y}%`,
                    }}
                  >
                    {employee.name.substring(0, 1).toUpperCase()}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                      {employee.name} {employee.team ? `(${employee.team})` : ''}
                    </div>
                  </div>
                ))}
                
                {/* Display all rooms */}
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="absolute px-1 py-0.5 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 border border-gray-300 text-xs"
                    style={{
                      left: `${room.position.x}%`,
                      top: `${room.position.y}%`,
                    }}
                  >
                    {room.name}
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Statistics</h3>
                <ul className="text-sm space-y-1">
                  <li>Total Employees: {employees.length}</li>
                  <li>Total Rooms: {rooms.length}</li>
                  <li>
                    Assigned to Teams: {employees.filter(emp => emp.team).length}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Fullscreen preview modal */}
      {showFullScreenPreview && mapImage && (
        <MapPreviewModal
          mapImage={mapImage}
          employees={employees}
          rooms={rooms}
          highlightedEmployee={highlightedEmployee}
          onClose={() => setShowFullScreenPreview(false)}
        />
      )}
    </div>
  );
}

function getTeamColor(team: string): string {
  // Try to load teams from localStorage
  try {
    const savedTeams = localStorage.getItem('officeMapperTeams');
    if (savedTeams) {
      const teams = JSON.parse(savedTeams);
      const foundTeam = teams.find((t: any) => t.name === team);
      if (foundTeam) {
        return foundTeam.color;
      }
    }
  } catch (error) {
    console.error('Error getting team color from localStorage:', error);
  }

  // Fallback to hash-based color if team not found in localStorage
  const colors = [
    'bg-blue-400', 'bg-green-400', 'bg-purple-400', 
    'bg-yellow-400', 'bg-red-400', 'bg-indigo-400',
    'bg-pink-400', 'bg-cyan-400', 'bg-emerald-400',
    'bg-orange-400', 'bg-teal-400', 'bg-fuchsia-400'
  ];
  
  // Simple hash function to get consistent colors for the same team name
  const hash = team.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return colors[hash % colors.length];
}
