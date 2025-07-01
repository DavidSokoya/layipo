
'use client';
import * as React from 'react';
import { Star, Clock, MapPin, CalendarDays, Flame, CheckCircle2, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PageWrapper } from '@/components/page-wrapper';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Event } from '@/lib/types';
import { events } from '@/lib/data/events';
import { TodayEventCard } from '@/components/today-event-card';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/ui/logo';

function HomePageLoader() {
  return (
    <PageWrapper>
      <main className="flex-1 pb-24">
        <HomePageHeader />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12">
          {/* Spotlight Skeleton */}
          <section>
            <Skeleton className="h-7 w-32 mb-4" />
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4">
                <Skeleton className="h-32 w-[200px] sm:w-[240px] rounded-xl" />
                <Skeleton className="h-32 w-[200px] sm:w-[240px] rounded-xl" />
                <Skeleton className="h-32 w-[200px] sm:w-[240px] rounded-xl hidden sm:block" />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Leadership Skeleton */}
          <section>
            <Skeleton className="h-7 w-48 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-48 rounded-xl" />
              <Skeleton className="h-48 rounded-xl" />
            </div>
          </section>

          {/* Schedule Skeleton */}
          <section>
            <div className="flex space-x-3 mb-6">
              <Skeleton className="h-[52px] w-12 rounded-lg" />
              <Skeleton className="h-[52px] w-12 rounded-lg" />
              <Skeleton className="h-[52px] w-12 rounded-lg" />
              <Skeleton className="h-[52px] w-12 rounded-lg" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          </section>
        </div>
      </main>
    </PageWrapper>
  );
}


const HomePageHeader = () => {
  const { user } = useUser();
  const avatarUrl =
    user?.imageUrl ||
    `https://i.pravatar.cc/150?u=${encodeURIComponent(user?.name || 'user')}`;

  if (!user) {
    return (
      <div className="flex justify-between items-center p-3 bg-card border-b">
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
        <Skeleton className="h-7 w-28" />
      </div>
    );
  }

  const firstName = user.name.split(' ')[0];

  return (
    <div className="flex justify-between items-center p-3 bg-card border-b">
      <Link href="/profile" className="flex items-center gap-3 group">
        <Avatar className="w-9 h-9 border-2 border-primary/20 group-hover:border-primary transition-colors">
          <AvatarImage src={avatarUrl} alt={user.name} />
          <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
        </Avatar>
        <h1 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          Hi, {firstName}
        </h1>
      </Link>
      <Logo />
    </div>
  );
};

type SpotlightItem = {
  href: string;
  title: string;
  image: string;
  dataAiHint?: string;
  date?: string; // Optional date for event-based items
};

const SpotlightCard = ({ item }: { item: SpotlightItem }) => (
  <Link href={item.href} className="block group">
    <Card className="relative w-full h-32 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Image
        src={item.image}
        alt={item.title}
        data-ai-hint={item.dataAiHint}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-3 text-primary-foreground">
        <h3 className="font-bold text-sm leading-tight">{item.title}</h3>
        {item.date && (
          <div className="flex items-center text-xs opacity-80 mt-1">
            <CalendarDays className="w-3 h-3 mr-1.5 shrink-0" />
            <span>{item.date}</span>
          </div>
        )}
      </div>
    </Card>
  </Link>
);

const OnNowCard = ({ event, now, remainingCount }: { event: Event & { startTime: Date, endTime: Date }; now: Date; remainingCount: number }) => {
  const totalDuration = event.endTime.getTime() - event.startTime.getTime();
  const elapsedTime = now.getTime() - event.startTime.getTime();
  const progress = Math.max(0, Math.min(100, (elapsedTime / totalDuration) * 100));

  return (
    <Card className="border-2 border-primary/50 shadow-lg mt-6">
      <CardHeader className="p-3">
        <div className="flex justify-between items-start">
            <div>
                 <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold mb-2 flex items-center gap-1.5 w-fit">
                    <Flame className="w-4 h-4 animate-pulse" />
                    ON NOW
                </Badge>
                <h3 className="font-bold text-lg text-foreground">{event.title}</h3>
            </div>
            <Link href={event.href || `/timetable#${event.id}`}>
                 <div className="text-xs font-semibold text-primary">View</div>
            </Link>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-2"><Clock className="w-4 h-4"/>{event.time}</p>
          <p className="flex items-center gap-2"><MapPin className="w-4 h-4"/>{event.location}</p>
        </div>
         <div className="mt-4 space-y-2">
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground text-right">{remainingCount} events remaining today</p>
         </div>
      </CardContent>
    </Card>
  );
};

const UpNextCard = ({ event }: { event: Event }) => (
    <Link href={event.href || `/timetable#${event.id}`} className="block group">
        <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/50 h-full p-3">
            <p className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">{event.title}</p>
            <div className="flex items-center text-xs text-muted-foreground pt-2 mt-1 gap-x-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    Starts at {event.time.split('–')[0].trim()}
                </span>
                <span className="flex items-center gap-1.5 mt-1 sm:mt-0">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                </span>
            </div>
        </Card>
    </Link>
)


export default function HomePage() {
  const { user } = useUser();
  const [now, setNow] = React.useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<string>('');

  const parseDate = React.useCallback((dateStr: string): Date => {
    if (!dateStr) return new Date();
    const datePart = dateStr.split(', ')[1];
    if (!datePart) return new Date();
    const cleanDateStr = datePart.replace(/(\d+)(st|nd|rd|th)/, '$1');
    return new Date(`${cleanDateStr} 2025`);
  }, []);

  const eventDays = React.useMemo(() => {
    const grouped = events.reduce<Record<string, Event[]>>((acc, event) => {
      const date = event.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});

    return Object.entries(grouped).sort(([dateA], [dateB]) => {
      return parseDate(dateA).getTime() - parseDate(dateB).getTime();
    });
  }, [parseDate]);
  
  React.useEffect(() => {
    const currentDate = new Date();
    setNow(currentDate);

    if (eventDays.length > 0) {
      const todayDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

      const todayKey = eventDays.find(([date]) => {
          const eventDate = parseDate(date);
          const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
          return eventDateOnly.getTime() === todayDateOnly.getTime();
      });

      setSelectedDate(todayKey ? todayKey[0] : eventDays[0]?.[0] || '');
    }

    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, [eventDays, parseDate]);
  
  const { currentEvent, upcomingEvents, remainingEvents, totalUpcomingCount } = React.useMemo(() => {
     const timeStringToDate = (timeStr: string, date: Date): Date => {
        const newDate = new Date(date);
        const [time, modifier] = timeStr.toLowerCase().split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        minutes = minutes || 0;

        if (modifier === 'pm' && hours < 12) {
            hours += 12;
        }
        if (modifier === 'am' && hours === 12) {
            hours = 0;
        }
        newDate.setHours(hours, minutes, 0, 0);
        return newDate;
    };
    
    const parseTimeRange = (timeRangeStr: string, date: Date): [Date, Date] => {
        const parts = timeRangeStr.split('–');
        if (parts.length !== 2) return [new Date(), new Date()];
        const [startStr, endStr] = parts;
        const startDate = timeStringToDate(startStr.trim(), date);
        const endDate = timeStringToDate(endStr.trim(), date);
        if(endDate < startDate) {
            endDate.setDate(endDate.getDate() + 1);
        }
        return [startDate, endDate];
    };
      
    const dayEvents = eventDays.find(([date]) => date === selectedDate)?.[1] || [];
    if (!dayEvents.length || !now) return { currentEvent: null, upcomingEvents: [], remainingEvents: [], totalUpcomingCount: 0 };

    const baseDate = parseDate(selectedDate);
    
    const isToday = baseDate.toDateString() === now.toDateString();
    const currentTime = isToday ? now : new Date(baseDate.setHours(0, 0, 0, 0));

    let current: (Event & { startTime: Date, endTime: Date }) | null = null;
    const upcoming: (Event & { startTime: Date, endTime: Date })[] = [];
    const past: (Event & { startTime: Date, endTime: Date })[] = [];
    
    dayEvents.forEach(event => {
      const [startTime, endTime] = parseTimeRange(event.time, baseDate);
      const eventWithTimes = { ...event, startTime, endTime };

      if (currentTime >= startTime && currentTime < endTime) {
        current = eventWithTimes;
      } else if (startTime > currentTime) {
        upcoming.push(eventWithTimes);
      } else {
        past.push(eventWithTimes);
      }
    });

    upcoming.sort((a,b) => a.startTime.getTime() - b.startTime.getTime());
    
    const allDayEventsSorted = [...past, current, ...upcoming].filter(Boolean).sort((a,b) => a!.startTime.getTime() - b!.startTime.getTime()) as (Event & { startTime: Date, endTime: Date })[];
    
    return { 
      currentEvent: current, 
      upcomingEvents: upcoming.slice(0, 2),
      remainingEvents: allDayEventsSorted,
      totalUpcomingCount: upcoming.length
    };

  }, [selectedDate, eventDays, now, parseDate]);


  const allSpotlightItems: SpotlightItem[] = React.useMemo(() => {
    return [
      {
        href: '/council',
        title: 'Meet The Council',
        image: '/images/spotlight/council.jpg',
        dataAiHint: 'professional team',
      },
      {
        href: '/contestants',
        title: 'Mr & Miss Collegiate',
        image: '/images/spotlight/mr-ms_collegiate.png',
        dataAiHint: 'fashion pageant',
      },
       {
        href: '/outfits',
        title: 'Event Dress Codes',
        image: '/images/spotlight/clothing.jpg',
        dataAiHint: 'fashion clothing',
      },
      {
        href: '/football',
        title: 'Football Showdown',
        image: '/images/spotlight/football.jpg',
        dataAiHint: 'football',
      },
      {
        href: '/campfire',
        title: 'Storytelling/Campfire',
        image: '/images/spotlight/storytelling.png',
        dataAiHint: 'campfire',
      },
      {
        href: '/trainings',
        title: 'Skill Development Trainings',
        image: '/images/spotlight/skills_development.jpg',
        dataAiHint: 'skill workshop',
      },
      {
        href: '/coffee-chat',
        title: 'ASCEND COFFEE CHAT',
        image: '/images/spotlight/coffee.jpg',
        dataAiHint: 'coffee meeting',
      },
      {
        href: '/debate',
        title: 'Debate & Speech Finals',
        image: '/images/spotlight/speech.jpg',
        dataAiHint: 'public speaking',
      },
    ];
  }, []);

  if (!user || !selectedDate || !now) {
    return <HomePageLoader />;
  }

  return (
    <PageWrapper>
      <main className="flex-1 pb-4">
        <HomePageHeader />
        <div className="max-w-6xl mx-auto py-6 sm:py-8 space-y-6 sm:space-y-8">
          <section>
            <h2 className="text-xl font-bold font-headline tracking-tight text-foreground mb-4 px-4 sm:px-6 lg:px-8">
              Spotlight
            </h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4 px-4 sm:px-6 lg:px-8">
                {allSpotlightItems.map((item) => (
                  <div key={item.href} className="w-[200px] sm:w-[240px] overflow-hidden">
                    <SpotlightCard item={item} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="mt-4 px-4 sm:px-6 lg:px-8" />
            </ScrollArea>
          </section>

          <section className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold font-headline tracking-tight text-foreground mb-4">
              Event Leadership
            </h2>
             <div className="grid grid-cols-2 gap-4">
               <Link href="/council/amira-abdullahi" className="block group">
                  <Card className="relative overflow-hidden h-48 group rounded-xl">
                    <Image
                      src="/images/amira.jpg"
                      alt="Amira Abdullahi"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint="youth leader"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3 text-primary-foreground">
                      <h3 className="font-bold text-base">Amira Abdullahi</h3>
                      <p className="text-sm opacity-90">Collegiate Chairperson</p>
                    </div>
                  </Card>
                </Link>
               <Link href="/council/oluwatoyin-atanda" className="block group">
                  <Card className="relative overflow-hidden h-48 group rounded-xl">
                    <Image
                      src="/images/oluwatoyin_atanda.jpg"
                      alt="Oluwatoyin Atanda"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint="professional woman"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3 text-primary-foreground">
                      <h3 className="font-bold text-base">Oluwatoyin Atanda</h3>
                      <p className="text-sm opacity-90">National President</p>
                    </div>
                  </Card>
                </Link>
             </div>
          </section>

          <section className="px-4 sm:px-6 lg:px-8">
             <ScrollArea className="w-full whitespace-nowrap [&_>div>div]:pb-2 [&_>div>div]:-mb-2">
                <div className="flex w-max space-x-3">
                    {eventDays.map(([date]) => {
                        const dayAbbr = date.split(',')[0].slice(0, 3);
                        const dayNum = date.split(', ')[1].split(' ')[0].replace(/\D/g, '');
                        return (
                            <button
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                className={cn(
                                    "flex flex-col items-center justify-center h-auto w-12 rounded-lg p-1 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:shadow-md hover:bg-accent/80",
                                    selectedDate === date
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-card text-card-foreground border"
                                )}
                            >
                                <span className="text-xs font-semibold uppercase tracking-wider">{dayAbbr}</span>
                                <span className="text-lg font-bold mt-0.5">{dayNum}</span>
                            </button>
                        )
                    })}
                </div>
             </ScrollArea>
             
             {currentEvent && <OnNowCard event={currentEvent} now={now} remainingCount={totalUpcomingCount} />}

             {upcomingEvents.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold text-foreground mb-2">Up Next</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {upcomingEvents.map(event => (
                            <UpNextCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
             )}

             {!currentEvent && upcomingEvents.length === 0 && (
                <Card className="mt-6 text-center py-10">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2"/>
                    <h3 className="font-semibold text-lg">All Done for Now!</h3>
                    <p className="text-muted-foreground text-sm">No more sessions scheduled for today.</p>
                </Card>
             )}

             {remainingEvents.length > 0 && (
                <Accordion type="single" collapsible className="w-full mt-4" defaultValue={!currentEvent && upcomingEvents.length === 0 ? "item-1" : undefined}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-sm font-semibold">View Full Day's Schedule</AccordionTrigger>
                        <AccordionContent>
                           <div className="grid grid-cols-1 gap-4 pt-4">
                               {remainingEvents.map(event => (
                                   <TodayEventCard key={event.id} event={event} isBookmarked={user.bookmarkedEventIds.includes(event.id)} />
                               ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
             )}

          </section>
        </div>
      </main>
    </PageWrapper>
  );
}
