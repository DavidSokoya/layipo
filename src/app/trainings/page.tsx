
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Clock, MapPin, Award, BookCopy, User, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
        "flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl group relative h-full",
        training.special ? "bg-gradient-to-br from-primary/90 via-primary/70 to-primary/90 text-primary-foreground shadow-lg ring-2 ring-primary/50" : "bg-card"
    )}>
        <Button size="icon" variant={isBookmarked ? "default" : "secondary"} className="absolute top-2 right-2 z-10 h-8 w-8" onClick={handleToggleBookmark}>
         <Star className={cn("w-4 h-4", isBookmarked && "fill-current", training.special && isBookmarked && "text-primary-foreground")} />
       </Button>
       {training.special && (
            <Badge className="absolute top-2 left-2 z-10 bg-amber-400 text-black shadow">Featured Session</Badge>
       )}
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 shrink-0 border-white/20">
          <AvatarImage src={training.trainerImage} alt={training.trainer} />
          <AvatarFallback><User className="w-8 h-8" /></AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-base md:text-lg break-words">{training.topic}</CardTitle>
          <CardDescription className={cn("text-sm font-medium mt-1", training.special ? "text-primary-foreground/90" : "text-muted-foreground")}>
            by {training.trainer}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 p-4 pt-0">
        <div className="flex flex-col gap-2">
            <div className={cn("flex items-center text-sm", training.special ? "text-primary-foreground/90" : "text-muted-foreground")}>
                <Clock className="w-4 h-4 mr-2" />
                <span>{training.time}</span>
            </div>
            <div className={cn("flex items-center text-sm", training.special ? "text-primary-foreground/90" : "text-muted-foreground")}>
                <MapPin className="w-4 h-4 mr-2" />
                <span>{training.venue}</span>
            </div>
        </div>
        
        <div className={cn("text-sm pt-2 space-y-3", training.special ? "text-primary-foreground/80" : "text-muted-foreground")}>
            {training.theme && (
                <div className="flex items-start gap-2.5">
                <BookCopy className="w-4 h-4 mt-1 shrink-0" />
                <p><strong className={cn("font-semibold", training.special && "text-primary-foreground")}>Theme:</strong> {training.theme}</p>
                </div>
            )}
            <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 mt-1 shrink-0" />
                <p><strong className={cn("font-semibold", training.special && "text-primary-foreground")}>Trainer Profile:</strong> {training.trainerProfile}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}


export default function TrainingsPage() {
    const groupedTrainings = React.useMemo(() => trainings.reduce<Record<string, Training[]>>((acc, training) => {
      const date = training.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(training);
      return acc;
    }, {}), []);
    
    const trainingDays = Object.entries(groupedTrainings);
    const initialTab = trainingDays.length > 0 ? trainingDays[0][0] : '';


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
                        <div className="absolute top-4 left-4">
                             <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                                <Link href="/">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="sr-only">Back</span>
                                </Link>
                            </Button>
                        </div>
                        <h1 className="text-3xl font-bold font-headline tracking-tight text-white sm:text-4xl lg:text-5xl">
                           Grow with JCI
                        </h1>
                        <p className="mt-2 text-lg text-white/80 max-w-2xl mx-auto">
                            Enhance your skills and broaden your horizons with our expert-led sessions.
                        </p>
                    </div>
                </div>

                 <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
                     <Tabs defaultValue={initialTab} className="w-full">
                        <ScrollArea className="w-full whitespace-nowrap">
                            <TabsList className="inline-flex h-auto p-0 gap-3 bg-transparent">
                                {trainingDays.map(([date]) => (
                                    <TabsTrigger
                                        key={date}
                                        value={date}
                                        className="flex flex-col items-center justify-center h-auto w-auto rounded-lg p-2 px-4 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-accent/80 data-[state=inactive]:bg-card"
                                    >
                                        <span className="text-sm font-semibold tracking-wider">{date}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <ScrollBar orientation="horizontal" className="mt-2" />
                        </ScrollArea>
                        
                        {trainingDays.map(([date, dayTrainings]) => (
                            <TabsContent key={date} value={date} className="mt-6">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {dayTrainings.map((training) => (
                                        <TrainingCard key={training.id} training={training} />
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                     </Tabs>
                 </div>
            </main>
        </PageWrapper>
    );
}

    