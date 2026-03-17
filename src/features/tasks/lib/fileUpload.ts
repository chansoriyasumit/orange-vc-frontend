/**
 * File Upload Utilities
 * Handles file uploads for tasks
 */

import { API_CONFIG, API_ENDPOINTS } from '@/src/lib/api/config';
import { tokenStorage } from '@/src/lib/api';
import { apiClient } from '@/src/lib/api';

export interface FileUploadProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  uploadedFileId?: string;
  error?: string;
  url?: string;
}

export class FileUploadService {
  /**
   * Upload a single file to the tasks media endpoint
   */
  async uploadFile(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<{ id: string; url: string }> {
    const formData = new FormData();
    formData.append('files', file);

    const token = tokenStorage.getToken();
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = Math.round((e.loaded / e.total) * 100);
          onProgress(progress);
        }
      });

      // Handle completion
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            // Handle both single file and array responses
            const fileData = Array.isArray(response.data) ? response.data[0] : response.data;
            
            if (!fileData || !fileData.id) {
              console.error('Invalid upload response:', response);
              reject(new Error('Invalid upload response: missing file ID'));
              return;
            }
            
            resolve({
              id: fileData.id,
              url: fileData.url || '',
            });
          } catch (error) {
            console.error('Failed to parse upload response:', xhr.responseText, error);
            reject(new Error('Failed to parse upload response'));
          }
        } else {
          const errorText = xhr.responseText || `Upload failed with status ${xhr.status}`;
          console.error('Upload failed:', xhr.status, errorText);
          reject(new Error(`Upload failed with status ${xhr.status}: ${errorText}`));
        }
      });

      // Handle errors
      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload aborted'));
      });

      // Configure and send request
      xhr.open('POST', `${API_CONFIG.BASE_URL}/files/upload/tasks`);
      
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }
      xhr.setRequestHeader('Accept', '*/*');

      xhr.send(formData);
    });
  }

  /**
   * Upload multiple files with progress tracking
   */
  async uploadFiles(
    files: File[],
    onProgressUpdate?: (fileProgresses: FileUploadProgress[]) => void
  ): Promise<Array<{ id: string; url: string }>> {
    const fileProgresses: FileUploadProgress[] = files.map(file => ({
      file,
      progress: 0,
      status: 'pending',
    }));

    const updateProgress = () => {
      if (onProgressUpdate) {
        onProgressUpdate([...fileProgresses]);
      }
    };

    const uploadPromises = files.map(async (file, index) => {
      fileProgresses[index].status = 'uploading';
      updateProgress();

      try {
        const result = await this.uploadFile(file, (progress) => {
          fileProgresses[index].progress = progress;
          updateProgress();
        });

        fileProgresses[index].status = 'success';
        fileProgresses[index].uploadedFileId = result.id;
        fileProgresses[index].url = result.url;
        updateProgress();

        return result;
      } catch (error) {
        fileProgresses[index].status = 'error';
        fileProgresses[index].error = error instanceof Error ? error.message : 'Upload failed';
        updateProgress();
        throw error;
      }
    });

    return Promise.all(uploadPromises);
  }

  /**
   * Validate file before upload
   */
  validateFile(file: File, options?: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
  }): { valid: boolean; error?: string } {
    const maxSize = options?.maxSize || 10 * 1024 * 1024; // 10MB default
    const allowedTypes = options?.allowedTypes || [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`,
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'File type not supported',
      };
    }

    return { valid: true };
  }

  /**
   * Delete a file/media by ID
   */
  async deleteFile(fileId: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.FILES.DELETE(fileId));
  }
}

// Export singleton instance
export const fileUploadService = new FileUploadService();

