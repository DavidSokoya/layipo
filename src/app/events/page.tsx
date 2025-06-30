
'use client';

import * as React from 'react';
import type { Event, Training } from '@/lib/types';
import { events } from '@/lib/data/events';
import { trainings } from '@/lib/data/trainings';
import { PageWrapper } from '@/components/page-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  BrainCircuit,
  Users,
  Briefcase,
  Award,
  Clock,
  MapPin,
  BookCopy,
  ChevronRight,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/hooks/use-user';
import { PageHeader } from '@/components/ui/page-header';
import { EventCard } from '@/components/event-card';

function isTraining(event: Event | Training): event is Training {
  return 'trainer' in event;
}

function TrainingDetailCard({ training }: { training: Training }) {
    const { user, toggleBookmark } = useUser();
    const isBookmarked = user?.bookmarkedEventIds.includes(training.id) || false;
  return (
    <Card className={cn(
        "flex flex-col overflow-hidden transition-all duration-300 group relative",
        training.special ? "bg-gradient-to-br from-primary/90 via-primary/70 to-primary/90 text-primary-foreground shadow-lg" : "bg-card"
    )}>
       <Button size="icon" variant={isBookmarked ? "default" : "secondary"} className="absolute top-2 right-2 z-10 h-8 w-8" onClick={() => toggleBookmark(training.id)}>
         <Star className={cn("w-4 h-4", isBookmarked && "fill-current", training.special && isBookmarked && "text-primary-foreground")} />
       </Button>
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
        const allItems: (Event | Training)[] = [...events, ...trainings];
        const categories: Record<keyof typeof categoryConfig, (Event | Training)[]> = {
            'Main Events & Ceremonies': [],
            'Competitions & Pageants': [],
            'Skill Development': [],
            'Networking & Socials': [],
            'Meetings & Assemblies': [],
        };
    
        allItems.forEach(item => {
            if (item.category && categories[item.category as keyof typeof categoryConfig]) {
                categories[item.category as keyof typeof categoryConfig].push(item);
            }
        });
        return categories;
    }, []);

    const currentEvents = selectedCategory ? categorizedEvents[selectedCategory as keyof typeof categoryConfig] : [];
    
    return (
        <PageWrapper>
            <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
                 <div className="max-w-4xl mx-auto">
                    <PageHeader />
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
                                : <EventCard key={event.id} event={event as Event} layout="vertical"/>
                            ))}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </PageWrapper>
    );
}
