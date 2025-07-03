
'use client';

import * as React from 'react';
import Image from 'next/image';
import type { Training } from '@/lib/types';
import { trainings } from '@/lib/data/trainings';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

import { PageWrapper } from '@/components/page-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User, Star, ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

function TrainingCard({ training }: { training: Training }) {
    const { user, toggleBookmark } = useUser();
    const { toast } = useToast();

    const isBookmarked = user?.bookmarkedEventIds.includes(training.id) || false;

    const handleToggleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(training.id);
        toast({
            title: !isBookmarked ? 'Training Bookmarked!' : 'Bookmark Removed',
            description: `"${training.topic}" has been ${!isBookmarked ? 'added to' : 'removed from'} your agenda.`,
        });
    };

  return (
    <Card className={cn(
        "flex flex-col overflow-hidden transition-all duration-300 group relative h-full",
        training.special ? "bg-gradient-to-br from-primary/10 via-background to-background ring-2 ring-primary/50" : "bg-card"
    )}>
        {training.special && (
            <Badge className="absolute top-3 right-3 z-10 bg-amber-400 text-black shadow-lg border-amber-500/50">Featured Session</Badge>
       )}
      
      <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex sm:flex-col items-center gap-4 sm:gap-2 sm:w-1/4">
            <Avatar className="w-16 h-16 sm:w-24 sm:h-24 border-2 shrink-0 border-primary/20">
              <AvatarImage src={training.trainerImage} alt={training.trainer} />
              <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
            </Avatar>
            <div className="text-left sm:text-center flex-1">
                 <p className="font-bold text-base text-foreground">{training.trainer}</p>
                 <Button size="icon" variant={isBookmarked ? "default" : "outline"} className="mt-2 h-8 w-8" onClick={handleToggleBookmark}>
                    <Star className={cn("w-4 h-4", isBookmarked && "fill-current")} />
                    <span className="sr-only">Bookmark</span>
                </Button>
            </div>
        </div>
        <div className="sm:w-3/4 sm:pl-4 sm:border-l">
            <h3 className="text-lg font-semibold text-primary">{training.topic}</h3>
            {training.theme && <p className="text-sm font-medium text-muted-foreground italic mb-2">Theme: {training.theme}</p>}

            <div className="flex flex-col gap-1.5 my-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{training.date} at {training.time}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{training.venue}</span>
                </div>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed">{training.trainerProfile}</p>
        </div>
      </CardContent>
    </Card>
  );
}


export default function TrainingsPage() {
    const [activeDay, setActiveDay] = React.useState('Thursday');
    
    const { thursdayTrainings, fridayMorning, fridayAfternoon } = React.useMemo(() => {
        const thursday = trainings.filter(t => t.date.startsWith('Thursday'));
        const fridayMorning = trainings.filter(t => t.date.startsWith('Friday') && t.time.includes('AM'));
        const fridayAfternoon = trainings.filter(t => t.date.startsWith('Friday') && t.time.includes('PM'));
        return { thursdayTrainings: thursday, fridayMorning, fridayAfternoon };
    }, []);

    return (
        <PageWrapper>
            <main className="flex-1 mb-16">
                <div className="relative h-[16.66vh] w-full">
                    <Image
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&h=800&fit=crop"
                        alt="A training session with people collaborating"
                        data-ai-hint="business workshop"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                             <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                                <Link href="/">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="sr-only">Back</span>
                                </Link>
                            </Button>
                            <div className="flex items-center gap-4">
                                <Image src="/logos/layipo_lo.png" alt="LAYIPO 25 Logo" width={90} height={24} className="object-contain" />
                                <Image src="/logos/elevate_lo.png" alt="Elevate Logo" width={24} height={24} className="object-contain" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold font-headline tracking-tight text-white sm:text-3xl lg:text-4xl">
                           Grow with JCI
                        </h1>
                        <p className="mt-2 text-base text-white/80 max-w-2xl mx-auto">
                            Enhance your skills and broaden your horizons with our expert-led sessions.
                        </p>
                    </div>
                </div>

                 <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <Button
                            size="lg"
                            onClick={() => setActiveDay('Thursday')}
                            variant={activeDay === 'Thursday' ? 'default' : 'outline'}
                        >
                            Thurs, July 3rd
                        </Button>
                        <Button
                            size="lg"
                            onClick={() => setActiveDay('Friday')}
                            variant={activeDay === 'Friday' ? 'default' : 'outline'}
                        >
                            Fri, July 4th
                        </Button>
                    </div>
                     
                     <AnimatePresence mode="wait">
                        <motion.div
                             key={activeDay}
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             transition={{ duration: 0.3 }}
                        >
                            {activeDay === 'Thursday' && (
                                <Accordion type="single" collapsible defaultValue="session-1" className="w-full space-y-4">
                                    <AccordionItem value="session-1" className="border rounded-lg bg-card shadow-sm">
                                        <AccordionTrigger className="p-4 font-semibold text-lg hover:no-underline">Skill Dev. Session I</AccordionTrigger>
                                        <AccordionContent className="p-4 pt-0">
                                            <div className="space-y-4 border-t pt-4">
                                                {thursdayTrainings.map((training) => (
                                                    <TrainingCard key={training.id} training={training} />
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            )}

                             {activeDay === 'Friday' && (
                                <Accordion type="single" collapsible defaultValue="session-2" className="w-full space-y-4">
                                     <AccordionItem value="session-2" className="border rounded-lg bg-card shadow-sm">
                                        <AccordionTrigger className="p-4 font-semibold text-lg hover:no-underline">Skill Dev. Session II</AccordionTrigger>
                                        <AccordionContent className="p-4 pt-0">
                                            <div className="space-y-4 border-t pt-4">
                                                {fridayMorning.map((training) => (
                                                    <TrainingCard key={training.id} training={training} />
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                     <AccordionItem value="session-3" className="border rounded-lg bg-card shadow-sm">
                                        <AccordionTrigger className="p-4 font-semibold text-lg hover:no-underline">Skill Dev. Session III</AccordionTrigger>
                                        <AccordionContent className="p-4 pt-0">
                                            <div className="space-y-4 border-t pt-4">
                                                {fridayAfternoon.map((training) => (
                                                    <TrainingCard key={training.id} training={training} />
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            )}
                        </motion.div>
                     </AnimatePresence>
                 </div>
            </main>
        </PageWrapper>
    );
}
