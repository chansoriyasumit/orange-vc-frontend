'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { Upload, X, FileIcon, Image as ImageIcon, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/src/lib/utils/utils';
import { useFileUpload } from '../hooks/useFileUpload';
import { useToast } from '@/src/shared/hooks/use-toast';

interface FileWithPreview {
  file: File;
  preview?: string;
  uploadedId?: string;
  uploadedUrl?: string;
}

interface FileUploaderProps {
  onFilesUploaded: (fileIds: string[]) => void;
  onUploadingChange?: (isUploading: boolean) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
}

export function FileUploader({ 
  onFilesUploaded,
  onUploadingChange,
  maxFiles = 5,
  acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [deletingFileIds, setDeletingFileIds] = useState<Set<string>>(new Set());
  const { uploadFiles, fileProgresses, isUploading, error: uploadError, clearProgresses, deleteFile } = useFileUpload();
  const { toast } = useToast();

  // Notify parent when upload state changes
  useEffect(() => {
    onUploadingChange?.(isUploading);
  }, [isUploading, onUploadingChange]);

  // Handle file selection
  const handleFiles = useCallback(async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: FileWithPreview[] = [];
    const filesArray = Array.from(selectedFiles);

    // Check if we exceed max files and add files atomically
    let shouldProceed = false;
    let currentFiles: FileWithPreview[] = [];
    
    setFiles(prev => {
      if (prev.length + filesArray.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files`);
        return prev;
      }
      shouldProceed = true;
      currentFiles = prev;
      return prev;
    });

    if (!shouldProceed) return;

    filesArray.forEach((file) => {
      // Create preview for images
      const fileWithPreview: FileWithPreview = { file };
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          fileWithPreview.preview = reader.result as string;
          setFiles(prev => prev.map(f => 
            f.file === file ? { ...f, preview: fileWithPreview.preview } : f
          ));
        };
        reader.readAsDataURL(file);
      }

      newFiles.push(fileWithPreview);
    });

    // Add new files to state
    setFiles(prev => [...prev, ...newFiles]);

    // Auto-upload files when selected
    const filesToUpload = newFiles.map(f => f.file);
    if (filesToUpload.length > 0) {
      const results = await uploadFiles(filesToUpload);

      if (results) {
        // Update files with uploaded IDs using functional update
        setFiles(prev => {
          let newFileIndex = 0;
          const updated = prev.map((file) => {
            // Check if this is one of the newly added files
            const isNewFile = newFiles.some(nf => nf.file === file.file);
            if (isNewFile && newFileIndex < results.length) {
              const result = results[newFileIndex++];
              return {
                ...file,
                uploadedId: result?.id,
                uploadedUrl: result?.url,
              };
            }
            return file;
          });
          
          // Notify parent with all uploaded file IDs
          const allFileIds = updated
            .filter(f => f.uploadedId)
            .map(f => f.uploadedId!);
          onFilesUploaded(allFileIds);
          
          return updated;
        });
      }
    }
  }, [maxFiles, uploadFiles, onFilesUploaded]);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  }, [handleFiles]);

  // Remove file (for files not yet uploaded)
  const removeFile = useCallback((index: number) => {
    setFiles(prev => {
      const updated = prev.filter((_, i) => i !== index);
      // Notify parent with remaining uploaded file IDs
      const remainingFileIds = updated
        .filter(f => f.uploadedId)
        .map(f => f.uploadedId!);
      onFilesUploaded(remainingFileIds);
      return updated;
    });
  }, [onFilesUploaded]);

  // Delete uploaded file
  const handleDeleteFile = useCallback(async (fileId: string, index: number) => {
    if (!fileId) {
      // If file hasn't been uploaded yet, just remove it
      removeFile(index);
      return;
    }

    setDeletingFileIds(prev => new Set(prev).add(fileId));
    
    try {
      await deleteFile(fileId);
      
      // Remove file from state
      setFiles(prev => {
        const updated = prev.filter((_, i) => i !== index);
        // Notify parent with remaining uploaded file IDs
        const remainingFileIds = updated
          .filter(f => f.uploadedId)
          .map(f => f.uploadedId!);
        onFilesUploaded(remainingFileIds);
        return updated;
      });

      toast({
        title: 'File Deleted',
        description: 'The file has been successfully deleted.',
      });
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: error instanceof Error ? error.message : 'Failed to delete file',
        variant: 'destructive',
      });
    } finally {
      setDeletingFileIds(prev => {
        const next = new Set(prev);
        next.delete(fileId);
        return next;
      });
    }
  }, [deleteFile, onFilesUploaded, removeFile, toast]);

  // Upload all files (for manual upload button)
  const handleUpload = useCallback(async () => {
    if (files.length === 0) return;

    // Filter out already uploaded files
    const filesToUpload = files.filter(f => !f.uploadedId).map(f => f.file);
    
    if (filesToUpload.length === 0) {
      // All files already uploaded, just notify parent with existing IDs
      const fileIds = files.filter(f => f.uploadedId).map(f => f.uploadedId!);
      onFilesUploaded(fileIds);
      return;
    }

    const results = await uploadFiles(filesToUpload);

    if (results) {
      // Update files with uploaded IDs
      let resultIndex = 0;
      const updatedFiles = files.map((file) => {
        if (file.uploadedId) {
          return file; // Already uploaded
        }
        const result = results[resultIndex++];
        return {
          ...file,
          uploadedId: result?.id,
          uploadedUrl: result?.url,
        };
      });
      setFiles(updatedFiles);

      // Notify parent with all file IDs
      const fileIds = updatedFiles
        .filter(f => f.uploadedId)
        .map(f => f.uploadedId!);
      onFilesUploaded(fileIds);
    }
  }, [files, uploadFiles, onFilesUploaded]);

  // Clear all files
  const clearAllFiles = useCallback(() => {
    setFiles([]);
    clearProgresses();
  }, [clearProgresses]);

  // Get file progress
  const getFileProgress = (fileName: string) => {
    const progress = fileProgresses.find(p => p.file.name === fileName);
    return progress;
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const allFilesUploaded = files.length > 0 && files.every(f => f.uploadedId);

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
          isDragging 
            ? "border-tomato bg-tomato/5" 
            : "border-gray-300 hover:border-gray-400",
          isUploading && "opacity-50 pointer-events-none"
        )}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          accept={acceptedFileTypes.join(',')}
          onChange={(e) => handleFiles(e.target.files)}
          disabled={isUploading || files.length >= maxFiles}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-rich-black mb-2">
            Drop files here or click to browse
          </p>
          <p className="text-sm text-rich-black/60">
            Upload up to {maxFiles} files (Images, PDFs, Documents)
          </p>
          <p className="text-xs text-rich-black/50 mt-2">
            Max file size: 10MB
          </p>
        </label>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900">Upload Error</p>
            <p className="text-sm text-red-700">{uploadError}</p>
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-rich-black">
              Selected Files ({files.length}/{maxFiles})
            </p>
            {!isUploading && !allFilesUploaded && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFiles}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {files.map((fileItem, index) => {
              const progress = getFileProgress(fileItem.file.name);
              const isImage = fileItem.file.type.startsWith('image/');

              return (
                <div
                  key={`${fileItem.file.name}-${index}`}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
                >
                  {/* Preview/Icon */}
                  <div className="w-12 h-12 flex-shrink-0 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
                    {isImage && fileItem.preview ? (
                      <img 
                        src={fileItem.preview} 
                        alt={fileItem.file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : isImage ? (
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    ) : (
                      <FileIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-rich-black truncate">
                      {fileItem.file.name}
                    </p>
                    <p className="text-xs text-rich-black/60">
                      {formatFileSize(fileItem.file.size)}
                    </p>

                    {/* Progress Bar */}
                    {progress && progress.status === 'uploading' && (
                      <div className="mt-2">
                        <Progress value={progress.progress} className="h-1" />
                        <p className="text-xs text-rich-black/60 mt-1">
                          Uploading... {progress.progress}%
                        </p>
                      </div>
                    )}

                    {/* Success */}
                    {progress && progress.status === 'success' && (
                      <p className="text-xs text-green-600 mt-1">
                        ✓ Uploaded successfully
                      </p>
                    )}

                    {/* Error */}
                    {progress && progress.status === 'error' && (
                      <p className="text-xs text-red-600 mt-1">
                        ✗ {progress.error}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons Container - Aligned Vertically */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Delete/Remove Button */}
                    {!isUploading && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => fileItem.uploadedId ? handleDeleteFile(fileItem.uploadedId, index) : removeFile(index)}
                        disabled={deletingFileIds.has(fileItem.uploadedId || '')}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        {deletingFileIds.has(fileItem.uploadedId || '') ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    )}

                    {/* Upload Success Indicator */}
                    {fileItem.uploadedId && !deletingFileIds.has(fileItem.uploadedId) && (
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upload Button */}
          {!allFilesUploaded && (
            <Button
              onClick={handleUpload}
              disabled={isUploading || files.length === 0}
              className="w-full bg-tomato hover:bg-tomato-600"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

