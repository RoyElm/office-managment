'use client';

import { useState } from 'react';

interface Team {
  id: string;
  name: string;
  color: string;
}

interface Employee {
  id: string;
  name: string;
  team?: string;
}

interface TeamAssignmentProps {
  employees: Employee[];
  onEmployeeUpdate: (id: string, updates: Partial<Employee>) => void;
}

export default function TeamAssignment({
  employees,
  onEmployeeUpdate
}: TeamAssignmentProps) {
  const [teams, setTeams] = useState<Team[]>([
    { id: 'team-1', name: 'Engineering', color: 'bg-blue-400' },
    { id: 'team-2', name: 'Design', color: 'bg-green-400' },
    { id: 'team-3', name: 'Marketing', color: 'bg-purple-400' },
    { id: 'team-4', name: 'Sales', color: 'bg-yellow-400' },
  ]);
  const [newTeamName, setNewTeamName] = useState('');

  const addTeam = () => {
    if (!newTeamName.trim()) return;
    
    const colors = [
      'bg-blue-400', 'bg-green-400', 'bg-purple-400', 
      'bg-yellow-400', 'bg-red-400', 'bg-indigo-400',
      'bg-pink-400', 'bg-cyan-400', 'bg-emerald-400',
      'bg-orange-400', 'bg-teal-400', 'bg-fuchsia-400'
    ];
    
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: newTeamName,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    
    setTeams([...teams, newTeam]);
    setNewTeamName('');
  };

  const handleAssignTeam = (employeeId: string, teamName: string | null) => {
    onEmployeeUpdate(employeeId, { team: teamName || undefined });
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Team Assignment</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Teams</h3>
        <div className="flex gap-2 flex-wrap mb-3">
          {teams.map(team => (
            <div 
              key={team.id}
              className={`${team.color} px-3 py-1 rounded-full text-sm`}
            >
              {team.name}
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 border rounded-md"
            placeholder="New team name"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={addTeam}
          >
            Add Team
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Employees</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2 border">Name</th>
              <th className="text-left p-2 border">Team</th>
              <th className="text-left p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td className="p-2 border">{employee.name}</td>
                <td className="p-2 border">
                  {employee.team || 'Not assigned'}
                </td>
                <td className="p-2 border">
                  <select
                    className="w-full px-2 py-1 border rounded"
                    value={employee.team || ''}
                    onChange={(e) => handleAssignTeam(employee.id, e.target.value || null)}
                  >
                    <option value="">No Team</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No employees added yet. Add employees on the map first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 