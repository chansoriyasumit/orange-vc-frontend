/**
 * Razorpay One-Time Order Integration
 * Handles one-time payment orders with Razorpay Standard Checkout
 * Based on: https://razorpay.com/docs/payments/payments/payment-gateway/web-integration/standard/
 */

import { RazorpayPaymentResponse } from '../types';

// Extend Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOrderOptions {
  key: string;
  order_id: string;
  name: string;
  description: string;
  image?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpayPaymentResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

/**
 * Load Razorpay SDK script
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    // Check if already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      resolve(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

/**
 * Initialize Razorpay One-Time Order Payment
 * Opens Razorpay Standard Checkout for one-time payment
 * 
 * @param razorpayKey - Razorpay API key from backend
 * @param orderId - Razorpay order ID (starts with 'order_')
 * @param options - Checkout configuration options
 */
export async function initiateRazorpayOrder(
  razorpayKey: string,
  orderId: string,
  options: {
    name: string;
    description: string;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: {
      [key: string]: string;
    };
    onSuccess: (response: RazorpayPaymentResponse) => void;
    onDismiss?: () => void;
  }
): Promise<void> {
  // Load Razorpay SDK
  const isLoaded = await loadRazorpayScript();
  
  if (!isLoaded) {
    throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
  }

  // Configure Razorpay Order options
  // Ref: https://razorpay.com/docs/payments/payments/payment-gateway/web-integration/standard/
  const razorpayOptions: RazorpayOrderOptions = {
    key: razorpayKey,
    order_id: orderId,
    name: options.name,
    description: options.description,
    image: '/logo/orangevclogo.png',
    prefill: options.prefill,
    notes: options.notes || {
      order_type: 'one_time',
      platform: 'web',
    },
    theme: {
      color: '#FF6347', // Tomato color
    },
    handler: options.onSuccess,
    modal: {
      ondismiss: options.onDismiss,
    },
  };

  // Create and open Razorpay Checkout modal for one-time payment
  const razorpay = new window.Razorpay(razorpayOptions);
  razorpay.open();
}

/**
 * Verify Razorpay order payment signature
 * This should be done on the backend for security
 * Frontend can use this for basic validation before sending to backend
 * 
 * Formula: generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret)
 * 
 * @param paymentId - Razorpay payment ID
 * @param orderId - Razorpay order ID
 * @param signature - Signature returned by Razorpay
 * @returns Object with payment details to send to backend
 */
export function prepareOrderVerification(
  paymentId: string,
  orderId: string,
  signature: string
) {
  return {
    razorpay_payment_id: paymentId,
    razorpay_order_id: orderId,
    razorpay_signature: signature,
  };
}

