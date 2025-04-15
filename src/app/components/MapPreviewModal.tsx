'use client';

import { useEffect, useRef } from 'react';

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

interface MapPreviewModalProps {
  mapImage: string;
  employees: Employee[];
  rooms: Room[];
  highlightedEmployee: string | null;
  onClose: () => void;
}

export default function MapPreviewModal({
  mapImage,
  employees,
  rooms,
  highlightedEmployee,
  onClose
}: MapPreviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const highlightedRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard events and outside clicks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Scroll to highlighted employee if any
  useEffect(() => {
    if (highlightedEmployee && highlightedRef.current && mapContainerRef.current) {
      // Calculate position relative to container
      const container = mapContainerRef.current;
      const element = highlightedRef.current;
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      // Scroll to the element (centered)
      const scrollX = elementRect.left + elementRect.width / 2 - containerRect.left - containerRect.width / 2;
      const scrollY = elementRect.top + elementRect.height / 2 - containerRect.top - containerRect.height / 2;
      
      // Smooth scroll to position
      container.scrollBy({
        left: scrollX,
        top: scrollY,
        behavior: 'smooth'
      });
    }
  }, [highlightedEmployee]);

  // Get the highlighted employee
  const highlightedEmployeeData = highlightedEmployee 
    ? employees.find(emp => emp.id === highlightedEmployee) 
    : null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Office Map
            {highlightedEmployeeData && (
              <span className="ml-2 text-blue-600">
                → Showing: {highlightedEmployeeData.name}
              </span>
            )}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-auto" ref={mapContainerRef}>
          <div className="relative border rounded-lg overflow-hidden">
            <img 
              src={mapImage} 
              alt="Office Map" 
              className="w-full h-auto"
            />
            
            {/* Display all employees */}
            {employees.map((employee) => {
              const isHighlighted = highlightedEmployee === employee.id;
              return (
                <div
                  key={employee.id}
                  ref={isHighlighted ? highlightedRef : null}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-sm group ${
                    isHighlighted
                      ? 'ring-4 ring-red-500 animate-pulse bg-red-200 z-50 w-12 h-12 font-bold'
                      : employee.team
                      ? `${getTeamColor(employee.team)} w-8 h-8`
                      : 'bg-gray-400 w-8 h-8'
                  }`}
                  style={{
                    left: `${employee.position.x}%`,
                    top: `${employee.position.y}%`,
                  }}
                >
                  {employee.name.substring(0, 1).toUpperCase()}
                  <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded ${isHighlighted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} pointer-events-none transition-opacity z-10`}>
                    {employee.name} {employee.team ? `(${employee.team})` : ''}
                  </div>
                </div>
              );
            })}
            
            {/* Display all rooms */}
            {rooms.map((room) => (
              <div
                key={room.id}
                className="absolute px-2 py-1 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 border border-gray-300 text-sm"
                style={{
                  left: `${room.position.x}%`,
                  top: `${room.position.y}%`,
                }}
              >
                {room.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex gap-4 flex-wrap">
            <div className="text-sm">
              <span className="font-medium">Total Employees:</span> {employees.length}
            </div>
            <div className="text-sm">
              <span className="font-medium">Total Rooms:</span> {rooms.length}
            </div>
            <div className="text-sm">
              <span className="font-medium">Assigned to Teams:</span> {employees.filter(emp => emp.team).length}
            </div>
          </div>
        </div>
      </div>
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