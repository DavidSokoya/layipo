
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Camera, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/ui/logo';
import { PageWrapper } from '@/components/page-wrapper';

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name can only contain letters, spaces, and basic punctuation.'),
  localOrganisation: z.string().min(3, 'Organisation is required.'),
  whatsappNumber: z
    .string()
    .min(10, 'A valid phone number is required.')
    .max(15, 'Phone number is too long.'),
});


export default function WelcomePage() {
  const { user, saveUser, updateUser } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [showCamera, setShowCamera] = React.useState(false);
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  const isEditing = !!user;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      localOrganisation: '',
      whatsappNumber: '',
    },
  });

  React.useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        localOrganisation: user.localOrganisation,
        whatsappNumber: user.whatsappNumber,
      });
      if (user.imageUrl) {
        setImageSrc(user.imageUrl);
      }
    }
  }, [user, form]);

  React.useEffect(() => {
    let stream: MediaStream | null = null;
    
    const enableCamera = async () => {
        if (showCamera) {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setHasCameraPermission(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing camera:", error);
                setHasCameraPermission(false);
                 toast({
                    variant: 'destructive',
                    title: 'Camera Access Denied',
                    description: 'Please enable camera permissions in your browser settings to use this feature.',
                });
            }
        }
    };
    enableCamera();

    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [showCamera, toast]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        if (showCamera) setShowCamera(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        setImageSrc(dataUri);
      }
      setShowCamera(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let phoneNumber = values.whatsappNumber.replace(/\s+/g, '').trim();

    if (phoneNumber.startsWith('0')) {
      phoneNumber = `+234${phoneNumber.substring(1)}`;
    } else if (phoneNumber.length === 10 && /^[789]/.test(phoneNumber)) {
      phoneNumber = `+234${phoneNumber}`;
    } else if (phoneNumber.length === 13 && phoneNumber.startsWith('234')) {
      phoneNumber = `+${phoneNumber}`;
    } else if (!phoneNumber.startsWith('+')) {
      phoneNumber = `+${phoneNumber}`;
    }

    const profileData = {
      ...values,
      whatsappNumber: phoneNumber,
      imageUrl: imageSrc || undefined,
    };
    
    try {
      if (isEditing) {
        updateUser(profileData);
        toast({ title: 'Profile Updated!', description: 'Your changes have been saved.' });
        router.push('/profile');
      } else {
        saveUser(profileData);
      }
    } catch(error) {
        toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description: 'Could not save your profile. Please try again.',
        });
    }
  }

  return (
    <PageWrapper>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <canvas ref={canvasRef} className="hidden" />
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl">
                {isEditing ? 'Edit Your Profile' : 'Welcome to LAYIPO 25!'}
            </CardTitle>
            <CardDescription>
              {isEditing ? "Keep your digital badge up to date." : "Let's set up your digital badge for the event."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="David Sokoya" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="localOrganisation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Local Organisation</FormLabel>
                      <FormControl>
                        <Input placeholder="JCIN OOU" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl>
                        <Input placeholder="08147518938" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be used for your QR code. We&apos;ll add the country code for you.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                    <FormLabel>Profile Picture</FormLabel>
                    <Card className="flex items-center justify-center w-full h-40 bg-muted rounded-lg overflow-hidden">
                        {imageSrc ? (
                            <Image src={imageSrc} alt="Profile preview" width={160} height={160} className="object-cover w-full h-full" />
                        ) : showCamera && hasCameraPermission ? (
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                        ) : (
                            <div className="text-muted-foreground flex flex-col items-center justify-center text-center p-4">
                                <Camera className="w-10 h-10 mb-2" />
                                <p className="text-sm">Upload or take a photo</p>
                            </div>
                        )}
                    </Card>
                </div>

                {showCamera && !hasCameraPermission && (
                    <Alert variant="destructive">
                        <AlertTitle>Camera permission needed</AlertTitle>
                        <AlertDescription>
                          Please allow camera access in your browser to take a photo.
                        </AlertDescription>
                    </Alert>
                )}

                {showCamera && (
                    <Button type="button" onClick={handleCapture} className="w-full" disabled={!hasCameraPermission}>
                        <Camera className="mr-2" /> Capture Photo
                    </Button>
                )}

                 <div className="grid grid-cols-2 gap-4">
                      <Button type="button" variant="outline" onClick={() => setShowCamera(prev => !prev)}>
                        <Camera className="mr-2" /> {showCamera ? 'Close Camera' : 'Use Camera'}
                      </Button>
                     <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                        <Upload className="mr-2" /> Upload
                     </Button>
                     <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                     />
                 </div>
                
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting 
                    ? 'Saving...' 
                    : isEditing ? 'Save Changes' : 'Create My Badge'
                   }
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
                {isEditing 
                ? 'Your profile information is saved locally on this device.'
                : 'You can update this information later on your profile page.'
                }
            </p>
          </CardFooter>
        </Card>
      </main>
    </PageWrapper>
  );
}
