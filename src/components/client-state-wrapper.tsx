'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Toaster } from '@/components/ui/toaster';
import { Pwa } from '@/components/pwa';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { Logo } from './ui/logo';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const creed = [
  "That faith in God gives meaning and purpose to human life.",
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
    }, 2000); // A bit slower to allow reading the creed

    return () => clearInterval(interval);
  }, []);
  
  const colors = [
    'bg-status-red',
    'bg-status-amber',
    'bg-status-green',
    'bg-status-blue',
    'bg-primary',
    'bg-accent',
  ];

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen bg-background text-center p-8">
      <Logo />

      <div className="grid grid-cols-3 gap-4">
        {colors.map((color, i) => (
          <motion.div
            key={i}
            className={cn('w-10 h-10 rounded-lg', color)}
            animate={{
              scale: i === index ? 1.2 : 1,
              opacity: i === index ? 1 : 0.5,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        ))}
      </div>
      
      <div className="w-full max-w-md h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
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
