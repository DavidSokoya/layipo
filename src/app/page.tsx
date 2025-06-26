'use client';
import * as React from 'react';
import { Bell, Shirt, MapPin, Clock, Info, UserCheck } from 'lucide-react';
import Image from 'next/image';
import { events, type Event, venues, type Venue } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Logo } from '@/components/ui/logo';
import { PageWrapper } from '@/components/page-wrapper';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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
      <DialogContent className="sm:max-w-md">
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
              data-ai-hint={venue.hint}
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


function DressCodeModal({
  event,
  open,
  onOpenChange,
}: {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shirt className="w-5 h-5 text-primary" /> Dress Code: {event.dressCode.title}
          </DialogTitle>
          <DialogDescription>Official guidelines for {event.title}.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            {event.dressCode.details.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
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

const roleColors: Record<string, string> = {
  'General Delegates': 'border-l-status-amber',
  'LOC/COC': 'border-l-status-red',
  'Council Members': 'border-l-status-blue',
  'Registered Trainers': 'border-l-status-green',
  'Noble House Members': 'border-l-primary',
  'All': 'border-l-border',
};

function EventCard({ event }: { event: Event }) {
  const { toast } = useToast();
  const [isDressCodeModalOpen, setIsDressCodeModalOpen] = React.useState(false);
  const [selectedVenue, setSelectedVenue] = React.useState<string | null>(null);


  const handleSetReminder = () => {
    toast({
      title: 'Reminder Set!',
      description: `We'll notify you before "${event.title}" starts.`,
    });
  };

  const colorClass = roleColors[event.role] || 'border-l-border';

  return (
    <>
      <Card
        className={cn(
          'flex flex-col transition-all duration-300 hover:shadow-xl border-l-4',
          colorClass
        )}
      >
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-primary text-lg md:text-xl break-words">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow space-y-3 p-4 sm:p-6 pt-0">
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
          <div className="flex items-start text-sm text-muted-foreground">
            <Info className="w-4 h-4 mr-2 mt-1 shrink-0" />
            <span>{event.description}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 p-4 sm:p-6 pt-0">
          <Button variant="outline" size="sm" onClick={handleSetReminder}>
            <Bell className="w-4 h-4 mr-2" />
            Set Reminder
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsDressCodeModalOpen(true)}>
            <Shirt className="w-4 h-4 mr-2" />
            Dress Code
          </Button>
        </CardFooter>
      </Card>
      {isDressCodeModalOpen && <DressCodeModal event={event} open={isDressCodeModalOpen} onOpenChange={setIsDressCodeModalOpen} />}
      {selectedVenue && <VenueModal venueName={selectedVenue} open={!!selectedVenue} onOpenChange={() => setSelectedVenue(null)} />}
    </>
  );
}

export default function TimetablePage() {
  const [filter, setFilter] = React.useState('All');

  const roles = React.useMemo(() => {
    const uniqueRoles = [...new Set(events.map((e) => e.role))].sort();
    if (!uniqueRoles.includes('All')) {
        return ['All', ...uniqueRoles];
    }
    return uniqueRoles;
  }, []);


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

  const eventDays = Object.entries(groupedEvents);

  const roleDotColors: Record<string, string> = {
    'General Delegates': 'bg-status-amber',
    'LOC/COC': 'bg-status-red',
    'Council Members': 'bg-status-blue',
    'Registered Trainers': 'bg-status-green',
    'Noble House Members': 'bg-primary',
    'All': 'bg-muted-foreground',
  };


  return (
    <PageWrapper>
      <main className="flex-1 p-4 sm:p-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Logo />
          </div>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold font-headline tracking-tight text-foreground">
              Event Timetable
            </h1>
            <p className="text-muted-foreground mt-1">Your personalized schedule for the conference.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-primary" />
              Filter by Audience
            </h3>
            <ScrollArea className="w-full -mx-1 whitespace-nowrap">
                <RadioGroup
                  defaultValue="All"
                  onValueChange={setFilter}
                  className="flex gap-3 pb-3 px-1"
                >
                  {roles.map((role) => (
                    <div key={role}>
                      <RadioGroupItem value={role} id={`role-${role}`} className="peer sr-only" />
                      <Label
                        htmlFor={`role-${role}`}
                        className="flex items-center gap-2.5 rounded-full border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                      >
                        <div className={cn('h-2 w-2 rounded-full', roleDotColors[role] ?? 'bg-border')} />
                        {role}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              <ScrollBar orientation="horizontal" className="h-2"/>
            </ScrollArea>
          </div>


          <Tabs defaultValue={eventDays[0]?.[0]} className="w-full">
            <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
              <TabsList className="inline-flex h-auto p-1">
                {eventDays.map(([date]) => (
                  <TabsTrigger key={date} value={date} className="text-xs sm:text-sm">
                    {date.split(',')[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {eventDays.map(([date, dayEvents]) => {
              const filteredDayEvents =
                filter === 'All'
                  ? dayEvents
                  : dayEvents.filter((event) => event.role === filter || event.role === 'All');

              return (
                <TabsContent key={date} value={date} className="mt-6">
                  {filteredDayEvents.length === 0 ? (
                    <div className="text-center text-muted-foreground py-10">
                      No events scheduled for this day with the selected filter.
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredDayEvents.map((event) => (
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
