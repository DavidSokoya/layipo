
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
    <div className="flex flex-col gap-8 items-center justify-center h-screen bg-[#F0FFFF] text-center p-8">
        <div className="w-32 h-32 [transform-style:preserve-3d] animate-flip">
            {/* Front of the card */}
            <div className="absolute w-full h-full flex items-center justify-center [backface-visibility:hidden]">
                <Image src="/logos/layipo_lo.png" alt="LAYIPO 25 Logo" width={90} height={24} className="object-contain" />
            </div>
            {/* Back of the card */}
            <div className="absolute w-full h-full flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <Image src="/logos/elevate_lo.png" alt="Elevate Logo" width={32} height={32} className="object-contain" />
            </div>
        </div>
        <div className="max-w-md">
            <p className="text-lg font-semibold text-foreground">Welcome to JCIN Collegiate Conference 2025!</p>
            <p className="text-sm text-muted-foreground mt-1">Your companion app for LAYIPO'25</p>
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
