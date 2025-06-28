
'use client';

import * as React from 'react';
import type { Training } from '@/lib/data';
import { trainings } from '@/lib/data';
import { PageWrapper } from '@/components/page-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, MapPin, Award, BookCopy, ChevronRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function TrainingCard({ training }: { training: Training }) {
  return (
    <Card className={cn(
        "flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl group",
        training.special ? "bg-gradient-to-br from-primary/90 via-primary/70 to-primary/90 text-primary-foreground shadow-lg" : "bg-card"
    )}>
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 shrink-0 border-white/20">
          <AvatarImage src={training.trainerImage} alt={training.trainer} />
          <AvatarFallback>{training.trainer.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-base md:text-lg break-words">{training.topic}</CardTitle>
          <p className={cn("text-sm font-medium mt-1", training.special ? "text-primary-foreground/90" : "text-muted-foreground")}>
            by {training.trainer}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 p-4 pt-0">
         <div className={cn("flex items-center text-sm", training.special ? "text-primary-foreground/90" : "text-muted-foreground")}>
            <Clock className="w-4 h-4 mr-2" />
            <span>{training.time}</span>
          </div>
          <div className={cn("flex items-center text-sm", training.special ? "text-primary-foreground/90" : "text-muted-foreground")}>
            <MapPin className="w-4 h-4 mr-2" />
            <span>{training.venue}</span>
          </div>

        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className={cn(
                    "text-sm justify-start items-center gap-1 p-0 font-semibold hover:no-underline [&>svg:last-child]:hidden group-hover:text-primary transition-colors",
                    training.special && "hover:text-primary-foreground/80 text-primary-foreground/90 group-hover:text-white"
                )}>
                    Details <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </AccordionTrigger>
                <AccordionContent className={cn("text-sm pt-2 space-y-3", training.special ? "text-primary-foreground/80" : "text-muted-foreground")}>
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
                </AccordionContent>
            </AccordionItem>
        </Accordion>
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

    return (
        <PageWrapper>
            <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
                 <div className="max-w-4xl mx-auto">
                    <div className="relative mb-8 flex items-center justify-center">
                        <Button asChild variant="ghost" size="icon" className="absolute left-0">
                            <Link href="/">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="sr-only">Back to Home</span>
                            </Link>
                        </Button>
                        <Logo />
                    </div>
                    <header className="text-center mb-12">
                        <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                           Grow with JCI
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Enhance your skills and broaden your horizons with our expert-led sessions. Each training is designed to empower you with new knowledge and practical abilities.
                        </p>
                    </header>

                    <div className="space-y-12">
                        {trainingDays.map(([date, dayTrainings]) => (
                            <section key={date}>
                                <h2 className="text-2xl font-semibold text-foreground mb-6 pb-2 border-b-2 border-primary/20">{date}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {dayTrainings.map((training) => (
                                        <TrainingCard key={training.id} training={training} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                 </div>
            </main>
        </PageWrapper>
    );
}
