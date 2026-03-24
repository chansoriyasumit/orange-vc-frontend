import './globals.css';
import type { Metadata } from 'next';
import { Manrope, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import { AuthProvider } from '@/src/features/auth/lib/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { TawkToWidget } from '@/src/features/tasks/components/TawkToWidget';
import { FloatingSocialBar } from '@/components/layout/FloatingSocialBar';

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'OrangeVC - Hire Verified Professionals Online',
  description: 'Access a curated network of verified professionals for contract-based work. From virtual assistants to customer support, find the right talent.',
  verification: {
    google: 'B-fNbaUrG2OMyxmooRYrd9scxbK6uiIGGwb3veGcgDU',
  },
  icons: {
    icon: [
      { url: '/logo/orangevclogo.png', type: 'image/png' },
      { url: '/logo/orangevclogo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo/orangevclogo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo/orangevclogo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo/orangevclogo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${dmSans.variable} font-body`}>
        {/* Google tag (gtag.js) - Analytics & Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B58S9083QQ"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17889897242"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Google Analytics
            gtag('config', 'G-B58S9083QQ');
            
            // Google Ads Conversion Tracking
            gtag('config', 'AW-17889897242');
          `}
        </Script>
        <AuthProvider>
          {children}
          <FloatingSocialBar />
          <Toaster />
          <TawkToWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
