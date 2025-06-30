
'use client';
import * as React from 'react';
import { Shirt, MapPin, Clock, Info, Star, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { events, type Event, venues, type Venue } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { PageWrapper } from '@/components/page-wrapper';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/hooks/use-user';

const venuesMap = venues.reduce((acc, venue) => {
  acc[venue.name] = venue;
  return acc;
}, {} as Record<string, Venue>);

function VenueModal({
  venueName,
  open,
  onOpenChange,
}: {
  venueName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const venue = venuesMap[venueName];

  if (!venue) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="m-4 rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" /> {venue.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="aspect-video overflow-hidden rounded-lg">
            <Image
              src={venue.image}
              alt={venue.name}
              width={600}
              height={400}
              className="object-cover w-full h-full"
              data-ai-hint={venue.dataAiHint}
            />
          </div>
          <p className="text-sm text-muted-foreground">{venue.description}</p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const roleBadgeColors: Record<string, string> = {
  'General Delegates': 'bg-status-amber text-amber-foreground',
  'LOC/COC': 'bg-status-red text-red-foreground',
  'Council Members': 'bg-status-blue text-blue-foreground',
  'Registered Trainers': 'bg-status-green text-green-foreground',
  'Noble House Members': 'bg-primary text-primary-foreground',
  'All': 'bg-muted text-muted-foreground',
};

function EventCard({ event }: { event: Event }) {
  const { toast } = useToast();
  const { user, toggleBookmark } = useUser();
  const [selectedVenue, setSelectedVenue] = React.useState<string | null>(null);

  const isBookmarked = user?.bookmarkedEventIds.includes(event.id) || false;

  const handleToggleBookmark = () => {
    toggleBookmark(event.id);
    toast({
      title: !isBookmarked ? 'Event Bookmarked!' : 'Bookmark Removed',
      description: `"${event.title}" has been ${!isBookmarked ? 'added to' : 'removed from'} your agenda.`,
    });
  };

  const badgeColorClass = roleBadgeColors[event.role] || 'bg-muted text-muted-foreground';
  const eventImage = event.image || 'https://placehold.co/600x400.png';

  return (
    <>
      <Card
        id={event.id}
        className='overflow-hidden transition-all duration-300 hover:shadow-xl w-full flex flex-col sm:flex-row group scroll-mt-24'
      >
        <div className="sm:w-1/3 relative">
            <Badge className={cn("absolute top-2 left-2 z-10", badgeColorClass)}>{event.role}</Badge>
            <div className='overflow-hidden h-48 sm:h-full'>
                 <Image
                    src={eventImage}
                    alt={event.title}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={event.dataAiHint}
                    />
            </div>
        </div>
        <div className="sm:w-2/3 flex flex-col p-4 sm:p-6">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-lg md:text-xl break-words">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow space-y-2 pb-3">
                <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                </div>
              <div className="flex items-start text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 mt-1 shrink-0" />
                 <div className="flex flex-wrap items-center gap-x-1">
                    {event.location.split(', ').map((part, index, arr) => (
                        <React.Fragment key={part}>
                        <button
                            onClick={() => venuesMap[part.trim()] && setSelectedVenue(part.trim())}
                            className={cn(
                            "hover:underline hover:text-primary transition-colors text-left",
                            !venuesMap[part.trim()] && "pointer-events-none"
                            )}
                            disabled={!venuesMap[part.trim()]}
                        >
                            {part.trim()}
                        </button>
                        {index < arr.length - 1 && <span className="text-muted-foreground/80">,</span>}
                        </React.Fragment>
                    ))}
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Shirt className="w-4 h-4 mr-2" />
                <span>{event.dressCode.title}</span>
              </div>
              <div className="flex items-start text-sm text-muted-foreground pt-2">
                  <Info className="w-4 h-4 mr-2 mt-1 shrink-0" />
                  <span>{event.description}</span>
                </div>
            </CardContent>
            <CardFooter className="p-0 flex justify-start gap-2 pt-0 mt-auto">
              <Button variant={isBookmarked ? 'default' : 'outline'} size="sm" onClick={handleToggleBookmark}>
                <Star className={cn("w-4 h-4", isBookmarked && "fill-current")} />
                <span className='hidden sm:inline'>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </Button>
            </CardFooter>
        </div>
      </Card>
      {selectedVenue && <VenueModal venueName={selectedVenue} open={!!selectedVenue} onOpenChange={() => setSelectedVenue(null)} />}
    </>
  );
}

export default function TimetablePage() {
  const groupedEvents = React.useMemo(() => {
    return events.reduce<Record<string, Event[]>>((acc, event) => {
      const date = event.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});
  }, []);

  const initialTab = React.useMemo(() => {
    const parseDate = (dateStr: string): Date => {
      const cleanDateStr = dateStr.split(', ')[1].replace(/(\d+)(st|nd|rd|th)/, '$1');
      return new Date(cleanDateStr);
    };
    
    const sortedDates = Object.keys(groupedEvents).sort((a, b) => {
      return parseDate(a).getTime() - parseDate(b).getTime();
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingDate = sortedDates.find(dateStr => parseDate(dateStr).getTime() >= today.getTime());

    return upcomingDate || sortedDates[0];
  }, [groupedEvents]);

  const eventDays = Object.entries(groupedEvents);

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
                        Event Timetable
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore the full schedule for Layipo 2025. Here you can find all sessions, workshops, and activities.
                    </p>
                </header>

                <Tabs defaultValue={initialTab} className="w-full">
                    <ScrollArea className="w-full whitespace-nowrap">
                    <TabsList className="inline-flex h-auto p-0 gap-3 bg-transparent">
                        {eventDays.map(([date]) => {
                        const dayAbbr = date.split(',')[0].slice(0, 3);
                        const dayNum = date.split(', ')[1].split(' ')[0].replace(/\D/g, '');

                        return (
                            <TabsTrigger
                            key={date}
                            value={date}
                            className="flex flex-col items-center justify-center h-auto w-16 rounded-lg p-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-accent/80 data-[state=inactive]:bg-card"
                            >
                            <span className="text-xs font-semibold uppercase tracking-wider">{dayAbbr}</span>
                            <span className="text-2xl font-bold mt-1">{dayNum}</span>
                            </TabsTrigger>
                        );
                        })}
                    </TabsList>
                    <ScrollBar orientation="horizontal" className="mt-2" />
                    </ScrollArea>

                    {eventDays.map(([date, dayEvents]) => {
                    return (
                        <TabsContent key={date} value={date} className="mt-6">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">{date}</h2>
                        {dayEvents.length === 0 ? (
                            <div className="text-center text-muted-foreground py-10">
                            No events scheduled for this day.
                            </div>
                        ) : (
                            <div className="grid gap-6 grid-cols-1">
                            {dayEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                            </div>
                        )}
                        </TabsContent>
                    );
                    })}
                </Tabs>
            </div>
        </main>
    </PageWrapper>
  );
}
