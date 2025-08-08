'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Check, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onUploadComplete: (result: any) => void;
  onUploadError: (error: string) => void;
  category?: 'image' | 'video' | 'document' | 'general';
  maxSize?: number; // in MB
  allowedTypes?: string[];
  multiple?: boolean;
  className?: string;
}

interface UploadProgress {
  filename: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export default function FileUpload({
  onUploadComplete,
  onUploadError,
  category = 'general',
  maxSize = 100,
  allowedTypes = [],
  multiple = false,
  className = '',
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newProgress: UploadProgress[] = Array.from(files).map(file => ({
      filename: file.name,
      progress: 0,
      status: 'uploading',
    }));

    setUploadProgress(newProgress);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
          setUploadProgress(prev => 
            prev.map((p, index) => 
              index === i 
                ? { ...p, status: 'error', error: `File too large (max ${maxSize}MB)` }
                : p
            )
          );
          continue;
        }

        // Validate file type
        if (allowedTypes.length > 0) {
          const extension = file.name.split('.').pop()?.toLowerCase();
          if (!extension || !allowedTypes.includes(extension)) {
            setUploadProgress(prev => 
              prev.map((p, index) => 
                index === i 
                  ? { ...p, status: 'error', error: `Invalid file type` }
                  : p
              )
            );
            continue;
          }
        }

        // Upload file
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setUploadProgress(prev => 
            prev.map((p, index) => 
              index === i 
                ? { ...p, progress: 100, status: 'success' }
                : p
            )
          );
          onUploadComplete(result.data);
        } else {
          const error = await response.json();
          setUploadProgress(prev => 
            prev.map((p, index) => 
              index === i 
                ? { ...p, status: 'error', error: error.error }
                : p
            )
          );
          onUploadError(error.error);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError('Upload failed');
    } finally {
      setIsUploading(false);
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeProgress = (index: number) => {
    setUploadProgress(prev => prev.filter((_, i) => i !== index));
  };

  const getFileTypeIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return '🖼️';
    } else if (['mp4', 'mov', 'avi', 'webm'].includes(extension || '')) {
      return '🎥';
    } else if (['pdf', 'doc', 'docx', 'ppt', 'pptx'].includes(extension || '')) {
      return '📄';
    }
    return '📎';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          multiple={multiple}
          accept={allowedTypes.map(type => `.${type}`).join(',')}
          className="hidden"
          disabled={isUploading}
        />
        <div className="space-y-2">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="text-sm text-gray-600">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50"
            >
              Click to upload
            </button>
            {' '}or drag and drop
          </div>
          <p className="text-xs text-gray-500">
            {allowedTypes.length > 0 
              ? `Allowed types: ${allowedTypes.join(', ')}`
              : 'All file types supported'
            } • Max size: {maxSize}MB
          </p>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Upload Progress</h4>
          {uploadProgress.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getFileTypeIcon(item.filename)}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.filename}
                  </p>
                  {item.error && (
                    <p className="text-xs text-red-600">{item.error}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {item.status === 'uploading' && (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                )}
                {item.status === 'success' && (
                  <Check className="w-4 h-4 text-green-500" />
                )}
                {item.status === 'error' && (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
                <button
                  onClick={() => removeProgress(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 