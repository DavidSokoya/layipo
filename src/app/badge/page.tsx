'use client';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScanLine, CalendarDays, MapPin } from 'lucide-react';
import { Logo } from "@/components/ui/logo";
import { PageWrapper } from "@/components/page-wrapper";
import { useUser } from "@/hooks/use-user";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

function BadgeLoader() {
  return (
    <div className="max-w-md mx-auto w-full">
      <div className="mb-8">
        <Logo />
      </div>
      <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground text-center mb-2">My Digital Badge</h1>
      <p className="text-muted-foreground text-center mb-8">
        Present this for session check-ins and networking.
      </p>
      <Card className="w-full shadow-2xl rounded-2xl overflow-hidden bg-gray-200 animate-pulse">
        <CardHeader className="p-6">
           <Skeleton className="h-6 w-3/4 mx-auto" />
        </CardHeader>
        <CardContent className="flex flex-col items-center p-8 gap-6">
          <Skeleton className="w-28 h-28 rounded-full" />
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-32" />
          </div>
        </CardContent>
        <CardFooter className="p-6 flex-col gap-4">
          <Skeleton className="h-40 w-40" />
          <Skeleton className="h-4 w-24" />
        </CardFooter>
      </Card>
    </div>
  );
}


export default function BadgePage() {
  const { user, isLoading } = useUser();

  if (isLoading || !user) {
    return (
       <PageWrapper>
        <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16 flex flex-col">
          <BadgeLoader />
        </main>
      </PageWrapper>
    )
  }
  
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://wa.me/${user.whatsappNumber.replace(/\D/g, '')}`;
  const avatarUrl = user.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(user.name)}`;

  return (
    <PageWrapper>
      <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16 flex flex-col">
        <div className="max-w-md mx-auto w-full">
           <div className="mb-8 flex items-center justify-between">
              <Logo />
            </div>
          <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground text-center mb-2">My Digital Badge</h1>
            <p className="text-muted-foreground text-center mb-8">
              Present this for session check-ins and networking.
            </p>
          <Card className="w-full shadow-2xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-primary-foreground">
            <CardHeader className="p-6 text-center space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">JCI National Convention</h2>
              <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                <CalendarDays className="w-4 h-4" />
                <span>July 2-6, 2025</span>
                <span className="text-white/50">|</span>
                <MapPin className="w-4 h-4" />
                <span>Ilaji Resort</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center p-8 gap-6">
              <Avatar className="w-28 h-28 border-4 border-white/10 shadow-lg">
                <AvatarImage src={avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-3xl font-bold">{user.name}</h3>
                <p className="text-lg opacity-80">{user.role}</p>
                <p className="text-sm opacity-60 mt-1">{user.localOrganisation}</p>
              </div>
            </CardContent>
            <CardFooter className="p-6 flex-col gap-4 bg-black/20 backdrop-blur-sm">
                <div className="bg-white p-2 rounded-lg">
                    <Image 
                        src={qrCodeUrl}
                        alt="WhatsApp QR Code"
                        width={200}
                        height={200}
                        unoptimized // Necessary for external image URLs that are not configured in next.config.js
                    />
                </div>
               <p className="text-xs text-primary-foreground/70 flex items-center gap-2 mt-2">
                  <ScanLine className="w-4 h-4"/>
                  <span>Scan to connect on WhatsApp</span>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </PageWrapper>
  );
}
