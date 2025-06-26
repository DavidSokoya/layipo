'use client';
import * as React from 'react';
import { Bell, Shirt, MapPin, Clock, Info, UserCheck, BellRing, Search } from 'lucide-react';
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
import { PageWrapper } from '@/components/page-wrapper';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

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
  const [selectedVenue, setSelectedVenue] = React.useState<string | null>(null);
  const [isReminderSet, setIsReminderSet] = React.useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = React.useState(false);

  const handleSetReminder = () => {
    setIsReminderSet(true);
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
          'flex flex-col transition-all duration-300 hover:shadow-xl border-l-4 hover:scale-[1.02]',
          colorClass
        )}
      >
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg md:text-xl break-words">{event.title}</CardTitle>
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
          <div className="flex items-center text-sm text-muted-foreground">
            <Shirt className="w-4 h-4 mr-2" />
            <span>{event.dressCode.title}</span>
          </div>
          <AnimatePresence>
            {isDescriptionVisible && (
               <motion.div
                key="description"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="flex items-start text-sm text-muted-foreground pt-2">
                  <Info className="w-4 h-4 mr-2 mt-1 shrink-0" />
                  <span>{event.description}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-start gap-2 p-4 sm:p-6 pt-0">
          <Button variant="outline" size="sm" onClick={handleSetReminder} disabled={isReminderSet}>
            {isReminderSet ? <BellRing /> : <Bell />}
            {isReminderSet ? 'Reminder Set' : 'Set Reminder'}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}>
            <Info />
            <span>Details</span>
          </Button>
        </CardFooter>
      </Card>
      {selectedVenue && <VenueModal venueName={selectedVenue} open={!!selectedVenue} onOpenChange={() => setSelectedVenue(null)} />}
    </>
  );
}

export default function TimetablePage() {
  const [filter, setFilter] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const roles = React.useMemo(() => {
    const allRoles = events.map((e) => e.role);
    const uniqueRoles = [...new Set(allRoles)].filter(r => r && r !== 'All').sort();
    return ['All', ...uniqueRoles];
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
  
  const totalDays = eventDays.length;
  const totalEvents = events.length;
  const totalPoints = 5000; // Placeholder based on profile page

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
      <main className="flex-1 pb-16">
        <header className="sticky top-0 z-30 text-primary-foreground backdrop-blur-sm">
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop&q=80"
              data-ai-hint="youth conference audience"
              alt="Conference background"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="relative z-10 p-4 sm:p-6 lg:p-8 bg-black/30">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl sm:text-2xl font-bold">Layipo 2025</h1>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Bell className="h-5 w-5" />
              </Button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/70" />
              <Input
                type="search"
                placeholder="Search events..."
                className="w-full pl-10 bg-transparent border-white/50 text-primary-foreground placeholder:text-primary-foreground/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-bold text-lg sm:text-xl">{totalDays}</p>
                <p className="text-xs sm:text-sm opacity-80">Days</p>
              </div>
              <div>
                <p className="font-bold text-lg sm:text-xl">{totalEvents}</p>
                <p className="text-xs sm:text-sm opacity-80">Sessions</p>
              </div>
              <div>
                <p className="font-bold text-lg sm:text-xl">{totalPoints.toLocaleString()}</p>
                <p className="text-xs sm:text-sm opacity-80">Points</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="my-8">
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
              const filteredDayEvents =
                (filter === 'All'
                  ? dayEvents
                  : dayEvents.filter((event) => event.role === filter || event.role === 'All')
                ).filter((event) => {
                  const lowerCaseQuery = searchQuery.trim().toLowerCase();
                  if (lowerCaseQuery === '') return true;
                  return (
                    event.title.toLowerCase().includes(lowerCaseQuery) ||
                    event.description.toLowerCase().includes(lowerCaseQuery)
                  );
                });

              return (
                <TabsContent key={date} value={date} className="mt-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">{date}</h2>
                  {filteredDayEvents.length === 0 ? (
                    <div className="text-center text-muted-foreground py-10">
                      No events scheduled for this day with the selected filters.
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
