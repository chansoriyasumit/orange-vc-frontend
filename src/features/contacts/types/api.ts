/**
 * Contact API Types
 * Type definitions for contact form API requests and responses
 */

export interface CreateContactRequest {
  firstName: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  query?: string;
  recaptchaToken: string;
}

export interface CreateContactResponse {
  data: {
    id: string;
    firstName: string;
    lastName?: string | null;
    email?: string | null;
    mobileNumber?: string | null;
    query?: string | null;
    createdAt: string;
  };
  message: string;
}
