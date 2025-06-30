
'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Toaster } from '@/components/ui/toaster';
import { Pwa } from '@/components/pwa';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { Logo } from './ui/logo';
import { AnimatePresence, motion } from 'framer-motion';

const creed = [
  "we believe That faith in God gives meaning and purpose to human life.",
  "That the brotherhood of man transcends the sovereignty of nations.",
  "That economic justice can best be won by free men through free enterprise.",
  "That government should be of laws rather than of men.",
  "That earth’s great treasure lies in human personality.",
  "And that service to humanity is the best work of life."
];

function FullPageLoader() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % creed.length);
    }, 400); 

    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen bg-background text-center p-8">
      <Logo />

      <div
        className="w-12 h-12 rounded-full animate-spin"
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, hsl(var(--status-red)) 0deg, hsl(var(--status-amber)) 60deg, hsl(var(--status-green)) 120deg, hsl(var(--status-blue)) 180deg, hsl(var(--primary)) 240deg, hsl(var(--accent)) 300deg, hsl(var(--status-red)) 360deg)`
        }}
      />
      
      <div className="w-full max-w-md h-12 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="text-foreground text-lg font-semibold text-center"
          >
            {creed[index]}
          </motion.p>
        </AnimatePresence>
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
