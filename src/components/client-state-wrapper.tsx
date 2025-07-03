
'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Toaster } from '@/components/ui/toaster';
import { Pwa } from '@/components/pwa';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import Image from 'next/image';
import { NotificationManager } from './notification-manager';

function FullPageLoader() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen bg-background text-center p-8">
        <div className="relative w-32 h-32 animate-orbit-cw">
            {/* Logo 1 at 12 o'clock */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="animate-orbit-ccw">
                    <Image src="/logos/layipo_lo.png" alt="LAYIPO 25 Logo" width={90} height={24} className="object-contain" />
                </div>
            </div>
            {/* Logo 2 at 6 o'clock */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="animate-orbit-ccw">
                    <Image src="/logos/elevate_lo.png" alt="Elevate Logo" width={24} height={24} className="object-contain" />
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
      {showNav && (
        <>
            <BottomNavigation />
            <NotificationManager />
        </>
      )}
      <Toaster />
      <Pwa />
    </div>
  );
}
