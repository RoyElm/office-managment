'use client';

import { useState, useRef } from 'react';

interface MapUploaderProps {
  onMapUpload: (file: File) => void;
}

export default function MapUploader({ onMapUpload }: MapUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
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
    // Check if the file is an image (JPG or PNG)
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      alert('Please upload a JPG or PNG image file.');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Pass the file to the parent component
    onMapUpload(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Map Upload</h2>
      <p className="text-gray-600 mb-4">Upload an office map image (JPG, PNG).</p>
      
      {preview ? (
        <div className="mt-4">
          <div className="relative">
            <img 
              src={preview} 
              alt="Office Map Preview" 
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <button 
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
              onClick={() => setPreview(null)}
            >
              ✕
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">Map uploaded successfully. You can now place employees on the map.</p>
        </div>
      ) : (
        <div 
          className={`border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-lg p-12 text-center transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-gray-500 mb-2">Drag and drop your map image here</p>
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
            accept=".jpg,.jpeg,.png"
            onChange={handleFileInput}
          />
        </div>
      )}
    </div>
  );
} 