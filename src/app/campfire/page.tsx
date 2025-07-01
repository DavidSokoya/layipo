
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Building, Calendar, Clock, Bell, Flame } from 'lucide-react';
import Image from 'next/image';

import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

function TypewriterEffect({ text, className }: { text: string; className?: string }) {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i },
    }),
  };
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h2
      style={{ display: 'flex', overflow: 'hidden' }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
}

export default function CampfirePage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSetReminder = () => {
    toast({
      title: 'Reminder Set!',
      description: "We'll notify you before the Storytelling / Campfire night begins.",
    });
  };

  return (
    <PageWrapper>
      <main className="flex-1">
        <div className="relative h-64 md:h-80 w-full">
          <Image
            src="/images/spotlight/storytelling.png"
            alt="Campfire at night"
            data-ai-hint="campfire night"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-orange-950/20 " />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 text-white hover:bg-white/10 hover:text-white"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
            >
              <Flame className="w-16 h-16 mb-4 opacity-80" />
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-bold font-headline tracking-tight text-white">
              Storytelling & Campfire
            </h1>
            <TypewriterEffect
              text="Stories, S'mores, and Starlight"
              className="text-lg md:text-xl font-light text-white/80 mt-2"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 space-y-8 mt-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-lg text-foreground leading-relaxed">
                Join us for a magical night of stories that echo tradition, courage, and shared laughter… all under the Ibadan skies.
                Anchored by none other than Aare Olabode Anisoloja, The Elite Broadcaster himself, this isn’t just another night, it’s a moment of connection.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Building className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Venue</p>
                  <p className="font-semibold text-foreground">Main Bowl</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <Calendar className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold text-foreground">Thursday, July 3rd, 2025</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-semibold text-foreground">8:00 PM - 11:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4 py-8">
            <h3 className="text-xl font-semibold text-foreground">
              Bring your stories, leave with memories.
            </h3>
            <Button size="lg" onClick={handleSetReminder} className="shadow-lg">
              <Bell className="mr-2" /> Set Reminder
            </Button>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
