
'use client';

import * as React from 'react';
import type { Event, Training } from '@/lib/data';
import { events, trainings } from '@/lib/data';
import { PageWrapper } from '@/components/page-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  ArrowLeft,
  Trophy,
  BrainCircuit,
  Users,
  Briefcase,
  Award,
  Clock,
  MapPin,
  Shirt,
  Info,
  BookCopy,
  ChevronRight,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

function isTraining(event: Event | Training): event is Training {
  return 'trainer' in event;
}

const roleBadgeColors: Record<string, string> = {
  'General Delegates': 'bg-status-amber text-amber-foreground',
  'LOC/COC': 'bg-status-red text-red-foreground',
  'Council Members': 'bg-status-blue text-blue-foreground',
  'Registered Trainers': 'bg-status-green text-green-foreground',
  'Noble House Members': 'bg-primary text-primary-foreground',
  'All': 'bg-muted text-muted-foreground',
};

function EventDetailCard({ event }: { event: Event }) {
    const badgeColorClass = roleBadgeColors[event.role] || 'bg-muted text-muted-foreground';
    const eventImage = event.image || 'https://placehold.co/600x400.png';

    return (
      <Card
        id={event.id}
        className='overflow-hidden transition-all duration-300 w-full flex flex-col group scroll-mt-24'
      >
        <div className="h-48 relative">
            <Badge className={cn("absolute top-2 left-2 z-10", badgeColorClass)}>{event.role}</Badge>
            <div className='overflow-hidden h-full'>
                 <Image
                    src={eventImage}
                    alt={event.title}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                    data-ai-hint={event.dataAiHint}
                    />
            </div>
        </div>
        <div className="flex-1 flex flex-col p-4">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-lg md:text-xl break-words">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow space-y-2 pb-3">
                <p className="flex items-center text-sm text-muted-foreground"><Clock className="w-4 h-4 mr-2" />{event.date}</p>
                <p className="flex items-center text-sm text-muted-foreground"><Clock className="w-4 h-4 mr-2" />{event.time}</p>
                <p className="flex items-center text-sm text-muted-foreground"><MapPin className="w-4 h-4 mr-2" />{event.location}</p>
                <p className="flex items-center text-sm text-muted-foreground"><Shirt className="w-4 h-4 mr-2" />{event.dressCode.title}</p>
                <p className="flex items-start text-sm text-muted-foreground pt-2"><Info className="w-4 h-4 mr-2 mt-1 shrink-0" />{event.description}</p>
            </CardContent>
        </div>
      </Card>
    )
}

function TrainingDetailCard({ training }: { training: Training }) {
  return (
    <Card className={cn(
        "flex flex-col overflow-hidden transition-all duration-300 group",
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
            <span>{training.date} at {training.time}</span>
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

export default function EventsPage() {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

    const categoryConfig = {
      'Main Events & Ceremonies': { icon: Award, description: 'Keynotes, ceremonies, and major conference milestones.' },
      'Competitions & Pageants': { icon: Trophy, description: 'Cheer on participants in our exciting competitions.' },
      'Skill Development': { icon: BrainCircuit, description: 'Expert-led sessions to enhance your skills.' },
      'Networking & Socials': { icon: Users, description: 'Connect with fellow delegates at our social events.' },
      'Meetings & Assemblies': { icon: Briefcase, description: 'Official meetings for council and committee members.' },
    };

    const categorizedEvents = React.useMemo(() => {
      const categories: Record<keyof typeof categoryConfig, (Event | Training)[]> = {
        'Main Events & Ceremonies': [],
        'Competitions & Pageants': [],
        'Skill Development': [],
        'Networking & Socials': [],
        'Meetings & Assemblies': [],
      };

      categories['Skill Development'].push(...trainings);

      events.forEach(event => {
        const title = event.title.toLowerCase();
        if (title.includes('ceremony') || title.includes('banquet') || title.includes('registration') || title.includes('morning show') || title.includes('departure') || title.includes('panel discussion')) {
          categories['Main Events & Ceremonies'].push(event);
        } else if (title.includes('football') || title.includes('pageant') || title.includes('contest') || title.includes('debate')) {
          categories['Competitions & Pageants'].push(event);
        } else if (title.includes('skill') || title.includes('academy')) {
          categories['Skill Development'].push(event);
        } else if (title.includes('lunch') || title.includes('breakfast') || title.includes('campfire') || title.includes('aerobics') || title.includes('chat') || title.includes('tungba')) {
          categories['Networking & Socials'].push(event);
        } else if (title.includes('meeting') || title.includes('arrival') || title.includes('setup') || title.includes('media') || title.includes('visit') || title.includes('assembly') || title.includes('presidency') || title.includes('strategy')) {
          categories['Meetings & Assemblies'].push(event);
        } else {
          categories['Main Events & Ceremonies'].push(event);
        }
      });
      return categories;
    }, []);

    const currentEvents = selectedCategory ? categorizedEvents[selectedCategory as keyof typeof categoryConfig] : [];
    
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
                           Event Hub
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                           Explore all activities, from keynotes to competitions. Tap a category to see the full list of events.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {Object.entries(categorizedEvents).map(([category, items]) => {
                           if (items.length === 0) return null;
                           const config = categoryConfig[category as keyof typeof categoryConfig];
                           const Icon = config.icon;
                           return (
                               <Card 
                                   key={category} 
                                   onClick={() => setSelectedCategory(category)}
                                   className="transition-all duration-300 hover:shadow-xl hover:border-primary/50 cursor-pointer flex flex-col"
                                >
                                   <CardHeader className="flex-row items-start gap-4 space-y-0">
                                       <div className="p-3 bg-primary/10 rounded-full">
                                            <Icon className="w-6 h-6 text-primary" />
                                       </div>
                                       <div>
                                            <CardTitle className="text-lg">{category}</CardTitle>
                                            <CardDescription className="text-sm mt-1">{config.description}</CardDescription>
                                       </div>
                                   </CardHeader>
                                   <CardContent className="mt-auto">
                                       <Badge variant="secondary">{items.length} Event{items.length > 1 ? 's' : ''}</Badge>
                                   </CardContent>
                               </Card>
                           );
                       })}
                    </div>
                 </div>
            </main>

            <Dialog open={!!selectedCategory} onOpenChange={(isOpen) => !isOpen && setSelectedCategory(null)}>
                <DialogContent className="w-screen h-screen max-w-full rounded-none sm:max-w-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-lg p-0 flex flex-col">
                    <DialogHeader className="p-4 border-b flex-row items-center space-y-0">
                        <DialogTitle className="flex-1">{selectedCategory}</DialogTitle>
                         <Button variant="ghost" size="icon" onClick={() => setSelectedCategory(null)} className="sm:hidden">
                            <X className="w-5 h-5"/>
                            <span className="sr-only">Close</span>
                        </Button>
                    </DialogHeader>
                    <ScrollArea className="flex-1">
                        <div className="p-4 grid gap-4">
                            {currentEvents.map((event) => (
                                isTraining(event)
                                ? <TrainingDetailCard key={event.id} training={event} />
                                : <EventDetailCard key={event.id} event={event as Event} />
                            ))}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </PageWrapper>
    );
}

