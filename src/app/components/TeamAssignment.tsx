'use client';

import { useState, useEffect } from 'react';

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

// All available team colors
const TEAM_COLORS = [
  'bg-blue-400', 'bg-green-400', 'bg-purple-400', 
  'bg-yellow-400', 'bg-red-400', 'bg-indigo-400',
  'bg-pink-400', 'bg-cyan-400', 'bg-emerald-400',
  'bg-orange-400', 'bg-teal-400', 'bg-fuchsia-400'
];

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
  const [newTeamColor, setNewTeamColor] = useState(TEAM_COLORS[0]);

  // Extract unique team names from employees to ensure all teams are in the list
  useEffect(() => {
    const employeeTeams = employees
      .map(emp => emp.team)
      .filter((team): team is string => team !== undefined && team !== '');
    
    const uniqueTeamNames = [...new Set(employeeTeams)];
    
    // Check if there are any teams in employee data that aren't in our team list
    const missingTeams = uniqueTeamNames.filter(
      teamName => !teams.some(team => team.name === teamName)
    );
    
    if (missingTeams.length > 0) {
      const newTeams = missingTeams.map(teamName => ({
        id: `team-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: teamName,
        color: TEAM_COLORS[Math.floor(Math.random() * TEAM_COLORS.length)]
      }));
      
      setTeams([...teams, ...newTeams]);
    }
  }, [employees, teams]);

  // Load teams from localStorage if available
  useEffect(() => {
    try {
      const savedTeams = localStorage.getItem('officeMapperTeams');
      if (savedTeams) {
        setTeams(JSON.parse(savedTeams));
      }
    } catch (error) {
      console.error('Error loading teams from localStorage:', error);
    }
  }, []);

  // Save teams to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('officeMapperTeams', JSON.stringify(teams));
    } catch (error) {
      console.error('Error saving teams to localStorage:', error);
    }
  }, [teams]);

  const addTeam = () => {
    if (!newTeamName.trim()) return;
    
    const newTeam: Team = {
      id: `team-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newTeamName,
      color: newTeamColor
    };
    
    setTeams([...teams, newTeam]);
    setNewTeamName('');
  };

  const handleAssignTeam = (employeeId: string, teamName: string | null) => {
    onEmployeeUpdate(employeeId, { team: teamName || undefined });
  };

  const getTeamColor = (teamName: string): string => {
    const team = teams.find(t => t.name === teamName);
    return team ? team.color : 'bg-gray-400';
  };

  const handleRemoveTeam = (teamId: string) => {
    // First remove the team from the list
    const updatedTeams = teams.filter(team => team.id !== teamId);
    setTeams(updatedTeams);
    
    // Get the name of the team being removed
    const teamToRemove = teams.find(team => team.id === teamId);
    if (!teamToRemove) return;
    
    // Update any employees who were assigned to this team
    employees.forEach(employee => {
      if (employee.team === teamToRemove.name) {
        onEmployeeUpdate(employee.id, { team: undefined });
      }
    });
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
              className={`${team.color} px-3 py-1 rounded-full text-sm flex items-center`}
            >
              {team.name}
              <button 
                onClick={() => handleRemoveTeam(team.id)}
                className="ml-2 text-gray-700 hover:text-red-700 focus:outline-none"
                title="Remove team"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            className="flex-1 px-3 py-2 border rounded-md min-w-[200px]"
            placeholder="New team name"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
          
          <select
            className="px-3 py-2 border rounded-md"
            value={newTeamColor}
            onChange={(e) => setNewTeamColor(e.target.value)}
          >
            {TEAM_COLORS.map((color, index) => (
              <option key={color} value={color}>
                Color {index + 1}
              </option>
            ))}
          </select>
          
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
                  {employee.team ? (
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${getTeamColor(employee.team)}`}>
                      {employee.team}
                    </span>
                  ) : (
                    'Not assigned'
                  )}
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