'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface Employee {
  id: string;
  name: string;
  position: { x: number; y: number };
  team?: string;
}

interface EmployeeQRCodeProps {
  employee: Employee;
  baseUrl: string;
}

export default function EmployeeQRCode({ employee, baseUrl }: EmployeeQRCodeProps) {
  const [showQRCode, setShowQRCode] = useState(false);
  
  // Create a URL that will open the map and highlight the employee
  const createEmployeeURL = () => {
    // Remove trailing slash if present
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    
    // Get the current map ID from URL
    const url = new URL(window.location.href);
    const currentMapId = url.searchParams.get('map');
    
    // Create URL with employee ID and map ID as query parameters
    let employeeUrl = `${cleanBaseUrl}?highlight=${employee.id}`;
    
    // Add map ID if available
    if (currentMapId) {
      employeeUrl += `&map=${currentMapId}`;
    }
    
    return employeeUrl;
  };
  
  // URL for the QR code
  const employeeUrl = createEmployeeURL();

  return (
    <div className="relative inline-block">
      <button
        className="px-3 py-1 bg-purple-500 text-white rounded-md text-sm hover:bg-purple-600 transition-colors"
        onClick={() => setShowQRCode(!showQRCode)}
      >
        {showQRCode ? 'Hide QR' : 'Show QR'}
      </button>
      
      {showQRCode && (
        <div className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-white rounded-lg shadow-xl border">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">{employee.name}'s Location</h3>
            <div className="bg-white p-2 rounded-lg">
              <QRCodeSVG
                value={employeeUrl}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">Scan to view location</p>
            <div className="mt-2 flex gap-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs"
                onClick={() => {
                  navigator.clipboard.writeText(employeeUrl);
                  alert('URL copied to clipboard!');
                }}
              >
                Copy Link
              </button>
              <button
                className="px-3 py-1 bg-gray-500 text-white rounded-md text-xs"
                onClick={() => setShowQRCode(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 