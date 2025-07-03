"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Badge as BadgeIcon, Calendar, ScanLine } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/badge', label: 'My Badge', icon: BadgeIcon },
  { href: '/scan', label: 'Scan', icon: ScanLine },
  { href: '/timetable', label: 'Schedule', icon: Calendar },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNavigation() {
  const pathname = usePathname();
  
  const getIsActive = (href: string) => {
      if (href === '/') {
          return pathname === '/';
      }
      return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t z-50">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = getIsActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
                item.href === '/scan' && 'relative'
              )}
            >
              {item.href === '/scan' ? (
                <div className="absolute -top-5 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg border-4 border-background">
                  <item.icon className="w-6 h-6" />
                </div>
              ) : (
                 <item.icon className="w-5 h-5 mb-1" />
              )}
              <span className={cn("text-xs text-center", item.href === '/scan' ? "absolute bottom-1.5" : "")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
