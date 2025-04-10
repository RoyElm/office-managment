'use client';

import { useState, useRef, useEffect } from 'react';
import CsvUploader from './CsvUploader';

interface Employee {
  id: string;
  name: string;
  position: { x: number; y: number };
  team?: string;
}

interface EmployeePlacementProps {
  mapImage: string;
  employees: Employee[];
  onEmployeeAdd: (employee: Employee) => void;
  onEmployeeUpdate: (id: string, updates: Partial<Employee>) => void;
  onEmployeeRemove: (id: string) => void;
  onEmployeesBulkAdd: (employees: Employee[]) => void;
}

export default function EmployeePlacement({
  mapImage,
  employees,
  onEmployeeAdd,
  onEmployeeUpdate,
  onEmployeeRemove,
  onEmployeesBulkAdd
}: EmployeePlacementProps) {
  const [isPlacingEmployee, setIsPlacingEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [showCsvUpload, setShowCsvUpload] = useState(false);
  const [isDraggingEmployee, setIsDraggingEmployee] = useState<string | null>(null);
  const [isPlacingUnlocatedEmployee, setIsPlacingUnlocatedEmployee] = useState<string | null>(null);
  const [unlocatedEmployees, setUnlocatedEmployees] = useState<Employee[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Detect unlocated employees (those with position at 0,0 or positions less than 0.1%)
  useEffect(() => {
    const unlocated = employees.filter(emp => 
      (emp.position.x < 0.1 && emp.position.y < 0.1) || 
      (emp.position.x === 0 && emp.position.y === 0)
    );
    setUnlocatedEmployees(unlocated);
  }, [employees]);

  const handleMapClick = (e: React.MouseEvent) => {
    if ((!isPlacingEmployee && !isPlacingUnlocatedEmployee) || !mapContainerRef.current) return;

    const rect = mapContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (isPlacingUnlocatedEmployee) {
      // Update position of existing unlocated employee
      const employee = employees.find(emp => emp.id === isPlacingUnlocatedEmployee);
      if (employee) {
        onEmployeeUpdate(isPlacingUnlocatedEmployee, { position: { x, y } });
        setIsPlacingUnlocatedEmployee(null);
        setSelectedEmployee(isPlacingUnlocatedEmployee);
      }
    } else {
      // Create new employee
      const newEmployee: Employee = {
        id: `emp-${Date.now()}`,
        name: 'New Employee',
        position: { x, y }
      };

      onEmployeeAdd(newEmployee);
      setIsPlacingEmployee(false);
      setSelectedEmployee(newEmployee.id);
    }
  };

  const handleEmployeeClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEmployee(id);
  };

  const handleNameChange = (id: string, name: string) => {
    onEmployeeUpdate(id, { name });
  };

  const handleTeamChange = (id: string, team: string) => {
    onEmployeeUpdate(id, { team });
  };

  const handleRemoveEmployee = (id: string) => {
    onEmployeeRemove(id);
    setSelectedEmployee(null);
  };

  const handleEmployeeDragStart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingEmployee(id);
    setSelectedEmployee(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingEmployee || !mapContainerRef.current) return;
    
    const rect = mapContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newPosition = {
      x: Math.max(0, Math.min(100, x)), // Ensure position is within 0-100%
      y: Math.max(0, Math.min(100, y))
    };
    
    onEmployeeUpdate(isDraggingEmployee, { position: newPosition });
  };

  const handleMouseUp = () => {
    setIsDraggingEmployee(null);
  };

  const handleUnlocatedEmployeeClick = (id: string) => {
    setIsPlacingUnlocatedEmployee(id);
    setIsPlacingEmployee(false);
  };

  const handleEmployeesImport = (importedEmployees: { firstName: string; lastName: string }[]) => {
    // Create unlocated employees with position 0,0
    const newEmployees: Employee[] = importedEmployees.map((emp, index) => {
      return {
        id: `emp-csv-${Date.now()}-${index}`,
        name: `${emp.firstName} ${emp.lastName}`,
        position: {
          x: 0,
          y: 0
        }
      };
    });
    
    onEmployeesBulkAdd(newEmployees);
    setShowCsvUpload(false);
  };

  // Add event listeners for mouse move and mouse up
  useEffect(() => {
    if (isDraggingEmployee) {
      const handleGlobalMouseUp = () => setIsDraggingEmployee(null);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDraggingEmployee]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className="text-xl font-semibold">Employee Placement</h2>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-md ${
              isPlacingEmployee ? 'bg-green-500' : 'bg-blue-500'
            } text-white`}
            onClick={() => {
              setIsPlacingEmployee(!isPlacingEmployee);
              setIsPlacingUnlocatedEmployee(null);
            }}
          >
            {isPlacingEmployee ? 'Cancel' : 'Add Employee'}
          </button>
          <button
            className="px-4 py-2 rounded-md bg-purple-500 text-white"
            onClick={() => setShowCsvUpload(!showCsvUpload)}
          >
            {showCsvUpload ? 'Cancel Import' : 'Import from CSV'}
          </button>
        </div>
      </div>

      {showCsvUpload && (
        <div className="mb-6 p-5 border rounded-lg bg-gray-50">
          <div className="mb-4">
            <h3 className="font-medium text-lg">Import Employees from CSV</h3>
            <p className="text-gray-600">
              Upload a CSV file with employee names to add them to the map. Employees will need to be placed manually after import.
            </p>
          </div>
          <CsvUploader onEmployeesImport={handleEmployeesImport} />
          <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-200">
            <h4 className="font-medium text-blue-700">What happens after import?</h4>
            <ul className="list-disc list-inside mt-2 text-sm text-blue-700">
              <li>Imported employees will appear in the "Unlocated Employees" list</li>
              <li>Click on an employee name and then click on the map to place them</li>
              <li>Each employee's name will be set to "First Last" from the CSV</li>
              <li>Teams can be assigned after placement</li>
            </ul>
          </div>
        </div>
      )}

      {/* Unlocated Employees Section */}
      {unlocatedEmployees.length > 0 && !showCsvUpload && (
        <div className="mb-6 p-4 border rounded-lg bg-yellow-50">
          <h3 className="font-medium mb-2 text-yellow-800">Unlocated Employees ({unlocatedEmployees.length})</h3>
          <p className="text-sm text-yellow-700 mb-3">
            {isPlacingUnlocatedEmployee 
              ? "Click on the map to place the selected employee" 
              : "Click on an employee's name below, then click on the map to place them"}
          </p>
          <div className="flex flex-wrap gap-2">
            {unlocatedEmployees.map(emp => (
              <button
                key={emp.id}
                className={`px-3 py-1 text-sm rounded-full ${
                  isPlacingUnlocatedEmployee === emp.id
                    ? 'bg-green-500 text-white'
                    : 'bg-white border border-yellow-300 hover:bg-yellow-100'
                }`}
                onClick={() => handleUnlocatedEmployeeClick(emp.id)}
              >
                {emp.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {(isPlacingEmployee || isPlacingUnlocatedEmployee) && !showCsvUpload && (
        <div className="mb-4 p-2 bg-yellow-100 rounded-md">
          <p className="text-sm text-yellow-800">
            {isPlacingUnlocatedEmployee 
              ? `Click on the map to place "${employees.find(e => e.id === isPlacingUnlocatedEmployee)?.name || 'employee'}"` 
              : "Click on the map to place a new employee"}
          </p>
        </div>
      )}

      {!showCsvUpload && (
        <div 
          className="relative border rounded-lg overflow-hidden"
          ref={mapContainerRef}
          onClick={handleMapClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <img 
            src={mapImage} 
            alt="Office Map" 
            className="w-full h-auto"
          />
          
          {employees.filter(emp => emp.position.x > 0.1 || emp.position.y > 0.1).map((employee) => (
            <div
              key={employee.id}
              className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-move ${
                selectedEmployee === employee.id
                  ? 'ring-2 ring-blue-500 bg-blue-100'
                  : employee.team
                  ? getTeamColor(employee.team)
                  : 'bg-gray-400'
              } ${isDraggingEmployee === employee.id ? 'opacity-70' : ''}`}
              style={{
                left: `${employee.position.x}%`,
                top: `${employee.position.y}%`,
              }}
              onClick={(e) => handleEmployeeClick(employee.id, e)}
              onMouseDown={(e) => handleEmployeeDragStart(employee.id, e)}
            >
              {employee.name.substring(0, 2).toUpperCase()}
            </div>
          ))}
        </div>
      )}

      {selectedEmployee && !showCsvUpload && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Employee Details</h3>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={employees.find(e => e.id === selectedEmployee)?.name || ''}
              onChange={(e) => handleNameChange(selectedEmployee, e.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={employees.find(e => e.id === selectedEmployee)?.team || ''}
              onChange={(e) => handleTeamChange(selectedEmployee, e.target.value)}
            />
          </div>
          
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
            onClick={() => handleRemoveEmployee(selectedEmployee)}
          >
            Remove Employee
          </button>
        </div>
      )}
    </div>
  );
}

function getTeamColor(team: string): string {
  // Simple hash function to convert team name to a color class
  const hash = team.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const colors = [
    'bg-blue-400', 'bg-green-400', 'bg-purple-400', 
    'bg-yellow-400', 'bg-red-400', 'bg-indigo-400',
    'bg-pink-400', 'bg-cyan-400', 'bg-emerald-400',
    'bg-orange-400', 'bg-teal-400', 'bg-fuchsia-400'
  ];
  return colors[hash % colors.length];
} 