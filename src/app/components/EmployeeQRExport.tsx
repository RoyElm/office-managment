'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface Employee {
  id: string;
  name: string;
  position: { x: number; y: number };
  team?: string;
}

interface EmployeeQRExportProps {
  employees: Employee[];
  baseUrl: string;
  onClose: () => void;
}

export default function EmployeeQRExport({ employees, baseUrl, onClose }: EmployeeQRExportProps) {
  // Create a URL that will open the map and highlight the employee
  const createEmployeeURL = (employeeId: string) => {
    // Remove trailing slash if present
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    // Create URL with employee ID as a query parameter
    return `${cleanBaseUrl}?highlight=${employeeId}`;
  };

  // Print the page when it's loaded
  useEffect(() => {
    const printTimeout = setTimeout(() => {
      window.print();
    }, 500);
    
    return () => clearTimeout(printTimeout);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8 print:hidden">
        <h1 className="text-2xl font-bold">Employee QR Codes</h1>
        <div className="flex gap-4">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Print
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {employees.map((employee) => (
          <div 
            key={employee.id} 
            className="p-6 border rounded-lg flex flex-col items-center page-break-inside-avoid"
          >
            <h2 className="text-2xl font-bold mb-2">{employee.name}</h2>
            {employee.team && (
              <div className="text-gray-600 mb-4">Team: {employee.team}</div>
            )}
            <div className="h-1 w-full bg-gray-300 my-4"></div>
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG
                value={createEmployeeURL(employee.id)}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
              />
            </div>
            <p className="mt-4 text-sm text-gray-500">Scan to view location on office map</p>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: auto;
            margin: 15mm;
          }
          body {
            background-color: white;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
} 