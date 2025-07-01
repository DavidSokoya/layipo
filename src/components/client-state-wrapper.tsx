'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Toaster } from '@/components/ui/toaster';
import { Pwa } from '@/components/pwa';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { Logo } from './ui/logo';

function FullPageLoader() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen bg-background text-center p-8">
      <Logo />
      <div
        className="w-12 h-12 rounded-full animate-spin"
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, hsl(var(--status-red)) 0deg, hsl(var(--status-amber)) 60deg, hsl(var(--status-green)) 120deg, hsl(var(--status-blue)) 180deg, hsl(var(--primary)) 240deg, hsl(var(--accent)) 300deg, hsl(var(--status-red)) 360deg)`
        }}
      />
    </div>
  );
}


export function ClientStateWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    if (user && pathname === '/welcome') {
      router.replace('/');
    }

    if (!user && pathname !== '/welcome') {
      router.replace('/welcome');
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!user && pathname !== '/welcome') {
    return <FullPageLoader />;
  }
  
  const showNav = pathname !== '/welcome';

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 w-full pb-16">{children}</div>
      {showNav && <BottomNavigation />}
      <Toaster />
      <Pwa />
    </div>
  );
}
