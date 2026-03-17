/**
 * Contact API Types
 * Type definitions for contact form API requests and responses
 */

export interface CreateContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  query: string;
  recaptchaToken: string;
}

export interface CreateContactResponse {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    query: string;
    createdAt: string;
  };
  message: string;
}

