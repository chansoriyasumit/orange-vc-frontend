'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Tawk.to Chat Widget Integration
 * 
 * This component loads the Tawk.to chat widget conditionally on dashboard and task pages.
 * In the future, this will replace the mock chat window for real-time communication
 * between users and agents.
 * 
 * Setup Instructions:
 * 1. Sign up at https://www.tawk.to/
 * 2. Get your Property ID and Widget ID from the dashboard
 * 3. Replace TAWK_PROPERTY_ID and TAWK_WIDGET_ID in the environment variables:
 *    - NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
 *    - NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
 * 
 * Features to implement later:
 * - User identification with Tawk_API.setAttributes()
 * - Show/hide widget based on task status
 * - Direct agent assignment integration
 * - Message synchronization with backend
 */

export function TawkToWidget() {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith('/dashboard');

  useEffect(() => {
    // Only load on dashboard/task pages
    if (!isDashboardPage) return;

    // Check if environment variables are set
    const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

    if (!propertyId || !widgetId) {
      console.log('Tawk.to: Environment variables not set. Skipping widget load.');
      console.log('Set NEXT_PUBLIC_TAWK_PROPERTY_ID and NEXT_PUBLIC_TAWK_WIDGET_ID to enable chat.');
      return;
    }

    // Check if already loaded
    if ((window as any).Tawk_API) {
      return;
    }

    // Load Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Initialize Tawk_API before script loads
    (window as any).Tawk_API = (window as any).Tawk_API || {};
    (window as any).Tawk_LoadStart = new Date();

    // Optional: Hide widget by default (can be shown programmatically later)
    (window as any).Tawk_API.onLoad = function() {
      console.log('Tawk.to widget loaded');
      // Uncomment to hide by default:
      // (window as any).Tawk_API.hideWidget();
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      // Note: Tawk.to doesn't provide a clean removal method
      // The widget will persist across navigation
    };
  }, [isDashboardPage]);

  // This component doesn't render anything
  return null;
}

/**
 * Future Integration Plan:
 * 
 * 1. User Identification:
 *    Tawk_API.setAttributes({
 *      name: user.firstName + ' ' + user.lastName,
 *      email: user.email,
 *      hash: 'generated_hash_from_backend'
 *    });
 * 
 * 2. Task-Specific Channels:
 *    - Create separate channels per task
 *    - Auto-assign agent to Tawk conversation when task is assigned
 *    - Sync messages between Tawk and backend database
 * 
 * 3. Conditional Display:
 *    - Hide widget when task status is PENDING
 *    - Show widget when task is IN_PROGRESS
 *    - Optionally show for COMPLETED with support context
 * 
 * 4. Custom Events:
 *    - Notify agent when user sends message
 *    - Update task status from chat
 *    - File sharing integration
 */

