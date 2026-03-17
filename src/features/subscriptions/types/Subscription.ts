/**
 * Core Subscription Types
 */

export type SubscriptionStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'PENDING';
export type PaymentStatus = 'PAID' | 'PENDING' | 'FAILED';

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  hoursUsed: number;
  hoursRemaining: number;
  hours?: number; // Total hours from API
  additionalHours: number;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  validityEndDate?: string; // From API response
  nextBillingDate?: string;
  cancelAt: string | null;
  canceledAt: string | null;
  trialStart: string | null;
  trialEnd: string | null;
  rpSubscriptionId?: string;
  rpCustomerId: string;
  rpOrderId: string | null;
  rpPaymentId: string | null;
  amount?: number; // From API response
  currency?: string; // From API response
  lastPaymentAmount: number | null;
  lastPaymentDate: string | null;
  paymentMethod: string | null;
  autoRenew?: boolean;
  metadata: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  plan?: {
    id: string;
    name: string;
    slug: string;
    price: number;
    currency: string;
    billingCycle?: string;
    hoursPerMonth?: number;
    hours?: number; // From API response
    features?: Array<{
      feature: string;
      description: string;
      included: boolean;
    }>;
  };
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  razorpay?: {
    orderId: string;
    customerId?: string;
    keyId: string;
    shortUrl?: string;
    status: string;
  };
}

export interface RazorpayOrderResponse {
  orderId: string;
  customerId?: string;
  keyId: string;
  shortUrl?: string;
  status: string;
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

