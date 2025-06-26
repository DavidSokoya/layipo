import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Pwa } from '@/components/pwa';
import { BottomNavigation } from '@/components/ui/bottom-navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'JCI GO',
  description: 'Your companion app for JCI events.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#4F46E5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased', inter.variable)}>
        <div className="flex flex-col min-h-screen">
          <div className="flex-1 w-full">{children}</div>
          <BottomNavigation />
        </div>
        <Toaster />
        <Pwa />
      </body>
    </html>
  );
}
