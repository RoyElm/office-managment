'use client';

import { useState, useRef } from 'react';

interface CsvUploaderProps {
  onEmployeesImport: (employees: { firstName: string; lastName: string }[]) => void;
}

export default function CsvUploader({ onEmployeesImport }: CsvUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Reset any previous errors
    setError(null);

    // Check if the file is a CSV
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (e.target?.result) {
          const csvText = e.target.result as string;
          const employees = parseCsv(csvText);
          
          if (employees.length === 0) {
            setError('No valid employees found in the CSV. Please check the format.');
            return;
          }
          
          onEmployeesImport(employees);
        }
      } catch (error) {
        setError('Failed to parse CSV. Please ensure it has "first name" and "last name" columns.');
      }
    };
    
    reader.onerror = () => {
      setError('Failed to read the file. Please try again.');
    };
    
    reader.readAsText(file);
  };

  const parseCsv = (csvText: string): { firstName: string; lastName: string }[] => {
    // Split the CSV into rows
    const rows = csvText.split(/\r?\n/).filter(row => row.trim().length > 0);
    
    if (rows.length < 2) {
      throw new Error('CSV must have at least a header row and one data row');
    }
    
    // Parse header row
    const headers = rows[0].split(',').map(header => header.trim().toLowerCase());
    
    // Find the indices of the first name and last name columns
    const firstNameIndex = headers.findIndex(h => h === 'first name' || h === 'firstname');
    const lastNameIndex = headers.findIndex(h => h === 'last name' || h === 'lastname');
    
    if (firstNameIndex === -1 || lastNameIndex === -1) {
      throw new Error('CSV must have "first name" and "last name" columns');
    }
    
    // Parse employee rows
    const employees: { firstName: string; lastName: string }[] = [];
    
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(',').map(value => value.trim());
      
      if (values.length > Math.max(firstNameIndex, lastNameIndex)) {
        employees.push({
          firstName: values[firstNameIndex],
          lastName: values[lastNameIndex]
        });
      }
    }
    
    return employees;
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full mb-6">
      <h2 className="text-xl font-semibold mb-4">Import Employees from CSV</h2>
      <p className="text-gray-600 mb-4">
        Upload a CSV file with "first name" and "last name" columns to import employees.
      </p>
      
      <div 
        className={`border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-lg p-8 text-center transition-colors`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-gray-500 mb-2">Drag and drop your CSV file here</p>
        <p className="text-gray-400 text-sm">or</p>
        <button 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleBrowseClick}
        >
          Browse Files
        </button>
        <input 
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv"
          onChange={handleFileInput}
        />
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mt-4">
        <h3 className="font-medium mb-2">CSV Format Example:</h3>
        <div className="bg-gray-100 p-3 rounded-md font-mono text-sm overflow-x-auto">
          <pre>first name,last name<br/>John,Doe<br/>Jane,Smith</pre>
        </div>
      </div>
    </div>
  );
} 