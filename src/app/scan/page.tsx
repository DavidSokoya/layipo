
'use client';

import * as React from 'react';
import jsQR from 'jsqr';
import { useUser } from '@/hooks/use-user';
import type { PublicUserProfile } from '@/lib/types';
import { PageWrapper } from '@/components/page-wrapper';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Camera, ZapOff } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

export default function ScanPage() {
  const { addConnection } = useUser();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [scanResult, setScanResult] = React.useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean>(true);
  const [isScanning, setIsScanning] = React.useState<boolean>(true);

  const handleScan = React.useCallback((data: string) => {
    if (data) {
      setIsScanning(false); // Stop scanning, which triggers useEffect cleanup.
      setScanResult(data);
      try {
        const parsedData: PublicUserProfile = JSON.parse(data);
        if (parsedData.name && parsedData.localOrganisation && parsedData.whatsappNumber) {
          addConnection(parsedData);
        }
      } catch (error) {
        console.error("Failed to parse QR code data", error);
      }
    }
  }, [addConnection]);

  React.useEffect(() => {
    if (!isScanning) {
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
      if (isScanning) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // The autoPlay prop on the video element will handle playing the stream.
          animationFrameId = requestAnimationFrame(tick);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
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
  }, [isScanning, handleScan]);


  return (
    <PageWrapper>
      <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
        <div className="max-w-xl mx-auto">
            <PageHeader />
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">Scan to Connect</h1>
                <p className="text-lg text-muted-foreground">Point your camera at another delegate's QR code to exchange contact info.</p>
            </header>
            
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted shadow-lg border">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 border-4 border-white/50 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]" />
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

            {scanResult && !isScanning && (
                 <div className="text-center mt-6">
                    <Button onClick={() => {
                        setScanResult(null);
                        setIsScanning(true);
                    }} size="lg">
                        <Camera className="mr-2" /> Scan Again
                    </Button>
                </div>
            )}
        </div>
      </main>
    </PageWrapper>
  );
}
