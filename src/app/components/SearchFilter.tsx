'use client';

import { useState, useEffect } from 'react';

interface Employee {
  id: string;
  name: string;
  team?: string;
}

interface SearchFilterProps {
  employees: Employee[];
  onHighlightEmployee: (id: string | null) => void;
}

export default function SearchFilter({
  employees,
  onHighlightEmployee
}: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByTeam, setFilterByTeam] = useState<string | null>(null);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees);
  
  // Get unique team names from employees
  const teamNames = Array.from(new Set(
    employees
      .filter(employee => employee.team)
      .map(employee => employee.team)
  ));

  // Filter employees when search term or team filter changes
  useEffect(() => {
    let result = [...employees];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(emp => 
        emp.name.toLowerCase().includes(term) || 
        (emp.team && emp.team.toLowerCase().includes(term))
      );
    }
    
    // Filter by team
    if (filterByTeam) {
      result = result.filter(emp => emp.team === filterByTeam);
    }
    
    setFilteredEmployees(result);
  }, [searchTerm, filterByTeam, employees]);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Search & Filter</h2>
      
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Search employees or teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={filterByTeam || ''}
            onChange={(e) => setFilterByTeam(e.target.value || null)}
          >
            <option value="">All Teams</option>
            {teamNames.map(team => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2 border">Name</th>
              <th className="text-left p-2 border">Team</th>
              <th className="text-left p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr 
                key={employee.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onHighlightEmployee(employee.id)}
              >
                <td className="p-2 border">{employee.name}</td>
                <td className="p-2 border">
                  {employee.team || 'Not assigned'}
                </td>
                <td className="p-2 border">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onHighlightEmployee(employee.id);
                    }}
                  >
                    Locate
                  </button>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No employees found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 