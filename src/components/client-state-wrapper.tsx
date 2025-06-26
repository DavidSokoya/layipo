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
        <div className="flex flex-col gap-4 items-center justify-center h-screen bg-background">
            <Logo />
            <div className="flex items-center gap-2 text-muted-foreground">
                 <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Loading your experience...</span>
            </div>
        </div>
    );
}

export function ClientStateWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    // If loading is finished, and we don't have a user,
    // and we are not already on the welcome page, redirect.
    if (!isLoading && !user && pathname !== '/welcome') {
      router.replace('/welcome');
    }
  }, [user, isLoading, pathname, router]);

  // While checking for the user, show a loader.
  if (isLoading) {
    return <FullPageLoader />;
  }

  // If there's no user and we are not on the welcome page yet,
  // the redirect is in flight. Show a loader to prevent flicker.
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
