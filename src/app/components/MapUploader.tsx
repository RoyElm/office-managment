'use client';

import { useState, useRef, useEffect } from 'react';

interface MapUploaderProps {
  onMapUpload: (file: File) => void;
  existingMapImage?: string | null;
}

export default function MapUploader({ onMapUpload, existingMapImage }: MapUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set the preview if we have an existing image
  useEffect(() => {
    if (existingMapImage) {
      setPreview(existingMapImage);
    }
  }, [existingMapImage]);

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
    if (fileInputRef.current) {
      // Reset the value to ensure onChange triggers even if the same file is selected
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleReplaceImage = () => {
    // Only clear the preview, don't clear the actual map data
    // This allows the user to return to the upload interface
    setPreview(null);
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
            <div className="absolute top-2 right-2 flex space-x-2">
              <button 
                className="bg-blue-500 text-white p-2 rounded-full"
                onClick={handleBrowseClick}
                title="Replace with new image"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                  <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                </svg>
              </button>
              <button 
                className="bg-red-500 text-white p-2 rounded-full"
                onClick={handleReplaceImage}
                title="Remove current image"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Map uploaded successfully. You can now place employees on the map.</p>
          <p className="mt-1 text-sm text-gray-500">Need to replace the image? Click the upload button in the top-right corner of the image.</p>
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
            type="button"
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