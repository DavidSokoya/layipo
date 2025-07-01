
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
      {/* Container to create the 3D perspective for the flip */}
      <div style={{ perspective: '1000px' }}>
        {/* The tile that will perform the flip animation */}
        <div
          className="relative w-36 h-10 animate-flip"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Face: Contains the logo */}
          <div
            className="absolute w-full h-full flex items-center justify-center"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <Logo />
          </div>

          {/* Back Face: Also contains the logo */}
          <div
            className="absolute w-full h-full flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <Logo />
          </div>
        </div>
      </div>
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
