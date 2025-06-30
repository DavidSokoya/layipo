import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ClientStateWrapper } from '@/components/client-state-wrapper';
import { UserProvider } from '@/hooks/use-user';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'JCI GO',
  description: 'Your companion app for JCI events.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#008080',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased', inter.variable)}>
        <UserProvider>
          <ClientStateWrapper>{children}</ClientStateWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
