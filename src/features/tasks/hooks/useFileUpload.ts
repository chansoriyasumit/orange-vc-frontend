/**
 * File Upload Hook
 */

import { useState, useCallback } from 'react';
import { fileUploadService, FileUploadProgress } from '../lib/fileUpload';

export function useFileUpload() {
  const [fileProgresses, setFileProgresses] = useState<FileUploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFiles = useCallback(async (files: File[]): Promise<Array<{ id: string; url: string }> | null> => {
    setIsUploading(true);
    setError(null);

    // Validate all files first
    for (const file of files) {
      const validation = fileUploadService.validateFile(file);
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        setIsUploading(false);
        return null;
      }
    }

    try {
      const results = await fileUploadService.uploadFiles(files, (progresses) => {
        setFileProgresses(progresses);
      });
      
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const clearProgresses = useCallback(() => {
    setFileProgresses([]);
    setError(null);
  }, []);

  const deleteFile = useCallback(async (fileId: string): Promise<void> => {
    try {
      await fileUploadService.deleteFile(fileId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete file';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  return {
    uploadFiles,
    fileProgresses,
    isUploading,
    error,
    clearProgresses,
    deleteFile,
  };
}

