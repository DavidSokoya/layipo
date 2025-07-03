
'use client';

import * as React from 'react';
import jsQR from 'jsqr';
import { useUser } from '@/hooks/use-user';
import type { PublicUserProfile } from '@/lib/types';
import { PageWrapper } from '@/components/page-wrapper';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, ZapOff, User, CheckCircle, Users } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import Link from 'next/link';

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

function ScannedUserCard({ user }: { user: PublicUserProfile }) {
    const avatarUrl = user.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(user.name)}`;
    const message = encodeURIComponent(`Hi ${user.name}! We met at the JCIN Collegiate Conference 2025`);
    const whatsappLink = `https://wa.me/${user.whatsappNumber.replace(/\+/g, '')}?text=${message}`;

    return (
         <Card className="bg-gradient-to-br from-card to-muted/30 border-primary/20 mt-6 shadow-lg">
            <CardContent className="p-4 flex items-center justify-between gap-4">
                 <div className="flex items-center gap-4 overflow-hidden">
                    <Avatar className="w-16 h-16 border-2 border-primary/20">
                        <AvatarImage src={avatarUrl} alt={user.name} />
                        <AvatarFallback><User className="w-8 h-8" /></AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                        <p className="font-bold text-lg truncate">{user.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{user.localOrganisation.toUpperCase()}</p>
                    </div>
                </div>
                 <Button asChild size="icon" className="shrink-0 bg-green-500 hover:bg-green-600 rounded-full h-12 w-12">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <WhatsappIcon className="w-6 h-6 fill-white" />
                        <span className="sr-only">Chat on WhatsApp</span>
                    </a>
                </Button>
            </CardContent>
        </Card>
    );
}

export default function ScanPage() {
  const { addConnection } = useUser();
  const { toast } = useToast();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [lastScannedUser, setLastScannedUser] = React.useState<PublicUserProfile | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean>(true);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleScan = React.useCallback(async (data: string) => {
    if (data && !isProcessing) {
      setIsProcessing(true);
      try {
        const parsedData: PublicUserProfile = JSON.parse(data);
        if (parsedData.name && parsedData.localOrganisation && parsedData.whatsappNumber) {
          await addConnection(parsedData);
          setLastScannedUser(parsedData);
        } else {
           toast({
            variant: 'destructive',
            title: 'Invalid QR Code',
            description: 'This QR code does not contain valid user data.',
          });
        }
      } catch (error) {
        console.error("Failed to parse QR code data", error);
        toast({
            variant: 'destructive',
            title: 'Invalid QR Code',
            description: 'This does not seem to be a valid JCI GO badge.',
        });
      } finally {
        // Only set processing to false if we didn't successfully scan a user
        if (!lastScannedUser) {
          setTimeout(() => setIsProcessing(false), 2000); // Add a small delay to prevent rapid re-scans
        }
      }
    }
  }, [addConnection, toast, isProcessing, lastScannedUser]);

  React.useEffect(() => {
    if (lastScannedUser) {
      return;
    }

    let stream: MediaStream | null = null;
    let animationFrameId: number;

    const tick = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (code) {
            handleScan(code.data);
          }
        }
      }
      if (!lastScannedUser && !isProcessing) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          animationFrameId = requestAnimationFrame(tick);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
            variant: 'destructive',
            title: 'Camera Error',
            description: 'Could not start video source. Please ensure camera permissions are enabled.',
        });
      }
    };

    startCamera();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [lastScannedUser, handleScan, toast, isProcessing]);

  const resetScanner = () => {
    setLastScannedUser(null);
    setIsProcessing(false);
  }

  return (
    <PageWrapper>
      <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
        <div className="max-w-xl mx-auto">
            <PageHeader />
            {lastScannedUser ? (
                 <motion.div 
                    key="success-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <CheckCircle className="w-16 h-16 text-status-green mx-auto mb-4" />
                    <h1 className="text-2xl font-bold font-headline tracking-tight text-foreground sm:text-3xl">Connection Made!</h1>
                    <p className="text-lg text-muted-foreground">You are now connected with {lastScannedUser.name.split(' ')[0]}.</p>
                    <ScannedUserCard user={lastScannedUser} />
                    <div className="mt-8 space-y-3">
                        <Button onClick={resetScanner} size="lg" className="w-full">
                            <Camera className="mr-2" /> Scan Another Badge
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full">
                            <Link href="/profile">
                               <Users className="mr-2" /> View My Connections
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                    key="scanner-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <header className="text-center mb-8">
                        <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">Scan to Connect</h1>
                        <p className="text-lg text-muted-foreground">Align the QR code within the frame to connect.</p>
                    </header>
                    
                     <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted shadow-lg border">
                        <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                        <div className="absolute inset-0 z-10" aria-hidden="true">
                             <div className="absolute inset-0 bg-black/50"></div>
                             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%]">
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white/80 rounded-tl-lg transition-all duration-300"></div>
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white/80 rounded-tr-lg transition-all duration-300"></div>
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white/80 rounded-bl-lg transition-all duration-300"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white/80 rounded-br-lg transition-all duration-300"></div>
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/70 shadow-[0_0_10px_theme(colors.primary)] animate-scan"></div>
                            </div>
                        </div>
                    </div>

                    <canvas ref={canvasRef} className="hidden" />

                    {!hasCameraPermission && (
                        <Alert variant="destructive" className="mt-6">
                            <ZapOff className="h-4 w-4" />
                            <AlertTitle>Camera Access Denied</AlertTitle>
                            <AlertDescription>
                                Please enable camera permissions in your browser settings to use the scanner.
                            </AlertDescription>
                        </Alert>
                    )}
                </motion.div>
            )}
        </div>
      </main>
    </PageWrapper>
  );
}
