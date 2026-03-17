/**
 * API Contact Repository
 * Handles contact form submissions to the backend API
 */

import { apiClient } from '@/src/lib/api';
import { API_ENDPOINTS } from '@/src/lib/api/config';
import { CreateContactRequest, CreateContactResponse } from '../types';

export class ApiContactRepository {
  /**
   * Submit contact form
   */
  async createContact(data: CreateContactRequest): Promise<CreateContactResponse> {
    const response = await apiClient.post<CreateContactResponse>(
      API_ENDPOINTS.CONTACTS.CREATE,
      data,
      { skipAuth: true } // Contact form doesn't require authentication
    );
    return response;
  }
}

// Export singleton instance
export const apiContactRepository = new ApiContactRepository();

