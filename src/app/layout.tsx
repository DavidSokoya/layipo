import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { CalendarDays, User, Badge as BadgeIcon } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';
import { Pwa } from '@/components/pwa';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'JCI GO',
  description: 'Your companion app for JCI events.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#008080',
};

function Logo() {
  return (
    <div className="flex items-center gap-2" data-testid="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8 text-primary"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5v-9l6 4.5-6 4.5z" />
      </svg>
      <span className="text-lg font-semibold text-primary">JCI GO</span>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased', inter.variable)}>
        <SidebarProvider>
          <Sidebar side="left" collapsible="icon" className="bg-card text-card-foreground">
            <SidebarContent>
              <SidebarHeader>
                <Logo />
              </SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Timetable" variant="ghost" className="text-card-foreground hover:bg-primary/10 data-[active=true]:bg-primary/10">
                    <Link href="/">
                      <CalendarDays />
                      <span>Timetable</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="My Badge" variant="ghost" className="text-card-foreground hover:bg-primary/10 data-[active=true]:bg-primary/10">
                    <Link href="/badge">
                      <BadgeIcon />
                      <span>My Badge</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Profile" variant="ghost" className="text-card-foreground hover:bg-primary/10 data-[active=true]:bg-primary/10">
                    <Link href="/profile">
                      <User />
                      <span>Profile & Rewards</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 bg-background/80 backdrop-blur-sm border-b md:hidden">
              <Logo />
              <SidebarTrigger />
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
        <Pwa />
      </body>
    </html>
  );
}
