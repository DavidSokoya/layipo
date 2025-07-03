
'use client';
import * as React from 'react';
import QRCode from 'qrcode';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScanLine, CalendarDays, MapPin, User } from 'lucide-react';
import { PageWrapper } from "@/components/page-wrapper";
import { useUser } from "@/hooks/use-user";
import { Skeleton } from "@/components/ui/skeleton";
import Image from 'next/image';

function BadgeLoader() {
  return (
    <div className="max-w-md mx-auto w-full">
      <div className="mb-8 flex items-center justify-between">
        <Image src="/logos/layipo_lo.png" alt="LAYIPO 25 Logo" width={90} height={24} className="object-contain" />
        <Image src="/logos/elevate_lo.png" alt="Elevate Logo" width={24} height={24} className="object-contain" />
      </div>
      <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground text-center mb-2">My Digital Badge</h1>
      <p className="text-muted-foreground text-center mb-8">
        Present this for session check-ins and networking.
      </p>
      <Card className="w-full shadow-2xl rounded-2xl overflow-hidden bg-muted animate-pulse">
        <CardHeader className="p-4 space-y-2">
           <Skeleton className="h-5 w-2/3 mx-auto" />
           <Skeleton className="h-3 w-1/2 mx-auto" />
        </CardHeader>
        <CardContent className="flex flex-col items-center p-6 gap-4">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="text-center space-y-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>
        </CardContent>
        <CardFooter className="p-4 flex-col gap-2 bg-black/5">
          <Skeleton className="h-[160px] w-[160px] rounded-md" />
          <Skeleton className="h-3 w-32" />
        </CardFooter>
      </Card>
    </div>
  );
}


export default function BadgePage() {
  const { user, isLoading } = useUser();
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string | null>(null);
  
  React.useEffect(() => {
      if (user) {
        const whatsappNumber = user.whatsappNumber.replace(/\+/g, ''); // Remove '+' for the wa.me link
        const prefilledMessage = `Hi ${user.name}! We met at the JCI National Convention. Great connecting with you.`;
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledMessage)}`;
        
        QRCode.toDataURL(whatsappLink, {
          errorCorrectionLevel: 'H',
          margin: 2,
          width: 250, // Set desired width for high quality
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        })
        .then(url => {
          setQrCodeDataUrl(url);
        })
        .catch(err => {
          console.error('Failed to generate QR code', err);
        });
      }
    }, [user]);

  if (isLoading || !user) {
    return (
       <PageWrapper>
        <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16 flex flex-col">
          <BadgeLoader />
        </main>
      </PageWrapper>
    )
  }
  
  const avatarUrl = user.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(user.name)}`;
  
  return (
    <PageWrapper>
      <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16 flex flex-col">
        <div className="max-w-md mx-auto w-full">
           <div className="mb-8 flex items-center justify-between">
              <Image src="/logos/layipo_lo.png" alt="LAYIPO 25 Logo" width={90} height={24} className="object-contain" />
              <Image src="/logos/elevate_lo.png" alt="Elevate Logo" width={24} height={24} className="object-contain" />
            </div>
          <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground text-center mb-2">My Digital Badge</h1>
            <p className="text-muted-foreground text-center mb-8">
              Present this for session check-ins and networking.
            </p>
          <Card className="w-full shadow-2xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-primary-foreground">
            <CardHeader className="p-4 text-center space-y-1">
              <h2 className="text-xl font-bold tracking-tight">JCI Collegiate Conference</h2>
              <div className="flex items-center justify-center gap-2 text-xs text-white/70">
                <CalendarDays className="w-3 h-3" />
                <span>July 2-6, 2025</span>
                <span className="text-white/50 mx-1">|</span>
                <MapPin className="w-3 h-3" />
                <span>Ilaji Resort</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center p-6 gap-4">
              <Avatar className="w-24 h-24 border-4 border-white/10 shadow-lg">
                <AvatarImage src={avatarUrl} alt={user.name} />
                <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-2xl font-bold">{user.name}</h3>
                <p className="text-sm opacity-60 mt-1">{user.localOrganisation.toLowerCase()}</p>
              </div>
            </CardContent>
            <CardFooter className="p-4 flex-col gap-2 bg-black/20 backdrop-blur-sm">
                <div className="bg-white p-1 rounded-md">
                    {qrCodeDataUrl ? (
                        <img 
                            src={qrCodeDataUrl}
                            alt="Contact QR Code"
                            width={160}
                            height={160}
                        />
                    ) : (
                        <Skeleton className="h-[160px] w-[160px] rounded-sm" />
                    )}
                </div>
               <p className="text-xs text-primary-foreground/70 flex items-center gap-1.5 mt-1">
                  <ScanLine className="w-3 h-3"/>
                  <span>Scan to start a WhatsApp chat</span>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </PageWrapper>
  );
}
