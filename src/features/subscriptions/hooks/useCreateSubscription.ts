/**
 * Create Subscription Hook with Razorpay One-Time Order Integration
 * Implements: https://razorpay.com/docs/payments/payments/payment-gateway/web-integration/standard/
 */

import { useState, useCallback } from 'react';
import { CreateSubscriptionData, RazorpayPaymentResponse } from '../types';
import { apiSubscriptionRepository } from '../lib/ApiSubscriptionRepository';
import { initiateRazorpayOrder, prepareOrderVerification } from '../lib/razorpay';

interface UseCreateSubscriptionOptions {
  onSuccess?: (subscriptionId: string) => void;
  onError?: (error: Error) => void;
}

export function useCreateSubscription(options?: UseCreateSubscriptionOptions) {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubscription = useCallback(
    async (
      data: CreateSubscriptionData,
      userInfo: { name: string; email: string; contact?: string }
    ): Promise<boolean> => {
      setIsCreating(true);
      setError(null);

      try {
        // Step 1: Create subscription on backend
        // Backend creates both subscription and Razorpay order for one-time payment
        const subscription = await apiSubscriptionRepository.createSubscription(data);

        // Validate Razorpay data exists
        if (!subscription.razorpay || !subscription.razorpay.orderId || !subscription.razorpay.keyId) {
          throw new Error('Invalid subscription response from server');
        }

        // Step 2: Initiate Razorpay one-time payment
        // This processes a one-time payment for the order
        return new Promise((resolve) => {
          initiateRazorpayOrder(
            subscription.razorpay!.keyId,
            subscription.razorpay!.orderId,
            {
              name: 'OrangeVC',
              description: `${subscription.plan?.name || 'Order'} - One-time payment`,
              prefill: {
                name: userInfo.name,
                email: userInfo.email,
                contact: userInfo.contact,
              },
              notes: {
                subscription_id: subscription.id,
                plan_id: subscription.planId,
                plan_name: subscription.plan?.name || 'N/A',
              },
              onSuccess: (paymentResponse: RazorpayPaymentResponse) => {
                console.log('Payment successful:', paymentResponse);
                
                // Prepare verification data
                const verificationData = prepareOrderVerification(
                  paymentResponse.razorpay_payment_id,
                  paymentResponse.razorpay_order_id,
                  paymentResponse.razorpay_signature
                );
                
                console.log('Payment verification data:', verificationData);
                
                // Payment successful - backend will verify via webhook
                // Subscription is now active
                options?.onSuccess?.(subscription.id);
                setIsCreating(false);
                resolve(true);
              },
              onDismiss: () => {
                // User closed payment modal without completing
                setError('Payment was cancelled. Your order has not been processed.');
                setIsCreating(false);
                resolve(false);
              },
            }
          );
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create subscription';
        setError(errorMessage);
        options?.onError?.(new Error(errorMessage));
        setIsCreating(false);
        return false;
      }
    },
    [options]
  );

  return {
    createSubscription,
    isCreating,
    error,
  };
}

