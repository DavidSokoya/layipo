'use client';
import * as React from 'react';
import { Star, ChevronDown, ChevronUp, ChevronRight, Clock, MapPin, Shirt, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageWrapper } from '@/components/page-wrapper';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Event } from '@/lib/data';
import { events } from '@/lib/data';
import { TodayEventCard } from '@/components/today-event-card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';


const HomePageHeader = () => {
    const { user } = useUser();
    const avatarUrl = user?.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(user?.name || 'user')}`;

    if (!user) {
        return (
            <div className="flex justify-between items-center p-4 bg-card border-b">
                 <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                 </div>
            </div>
        )
    }
    
    const firstName = user.name.split(' ')[0];

    return (
        <div className="flex justify-between items-center p-4 bg-card border-b">
            <Link href="/profile" className="flex items-center gap-3 group">
                 <Avatar className="w-12 h-12 border-2 border-primary/20 group-hover:border-primary transition-colors">
                    <AvatarImage src={avatarUrl} alt={user.name} />
                    <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Hi, {firstName}</h1>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-400" />
                        <span>{user.points.toLocaleString()} Points</span>
                    </p>
                </div>
            </Link>
        </div>
    )
};

type FeaturedEvent = {
  id: string;
  href: string;
  title: string;
  date: string;
  image: string;
  dataAiHint?: string;
};

const FeaturedEventCard = ({ event }: { event: FeaturedEvent }) => (
    <Link href={event.href} className="block group h-full">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full">
            <div className="relative overflow-hidden h-36">
                <Image 
                  src={event.image || 'https://placehold.co/400x400.png'} 
                  alt={event.title}
                  data-ai-hint={event.dataAiHint}
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-col p-4 flex-grow">
                <h3 className="font-bold text-base leading-tight flex-grow">{event.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <CalendarDays className="w-3 h-3 mr-2 shrink-0" />
                    <span>{event.date}</span>
                </div>
                <div className="mt-auto pt-2 text-primary font-semibold text-sm flex items-center">
                    View Details <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </Card>
    </Link>
);


export default function HomePage() {
  const { user } = useUser();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const demoDate = new Date('2025-07-03T00:00:00');

  React.useEffect(() => {
    if (user) {
      const timer = setTimeout(() => setProgress((user.points / 5000) * 100), 100);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const parseDate = (dateStr: string): Date => {
    if (!dateStr) return new Date();
    const datePart = dateStr.split(', ')[1];
    if (!datePart) return new Date();
    const cleanDateStr = datePart.replace(/(\d+)(st|nd|rd|th)/, '$1');
    return new Date(`${cleanDateStr} 2025`);
  };

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
  }, []);

  const getInitialDate = React.useCallback(() => {
    const demoDay = demoDate.getDate();
    const todayKey = eventDays.find(([date]) => parseDate(date).getDate() === demoDay);
    return todayKey ? todayKey[0] : eventDays[0]?.[0] || '';
  }, [eventDays, demoDate]);


  const [selectedDate, setSelectedDate] = React.useState(getInitialDate);
  
  React.useEffect(() => {
    if (eventDays.length > 0 && !selectedDate) {
      setSelectedDate(getInitialDate());
    }
  }, [eventDays, getInitialDate, selectedDate]);
  
  const featuredEvents: FeaturedEvent[] = React.useMemo(() => {
    const eventMap = events.reduce((acc, event) => {
      acc[event.id] = event;
      return acc;
    }, {} as Record<string, Event>);
  
    const getEvent = (id: string) => eventMap[id];
  
    return [
      {
        ...getEvent('f10'),
        href: '/timetable#f10',
        title: 'Opening Ceremony',
        date: getEvent('f10')?.date || '',
      },
      {
        ...getEvent('f11'),
        href: '/timetable#f11',
        title: 'Mr & Miss Collegiate',
        date: getEvent('f11')?.date || '',
      },
      {
        id: 'trainings',
        href: '/trainings',
        title: 'Skill Development Trainings',
        date: 'Multiple Days',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'professional training',
      },
      {
        ...getEvent('f5'),
        href: '/timetable#f5',
        title: 'Collegiate General Assembly',
        date: getEvent('f5')?.date || '',
      },
      {
        ...getEvent('th9'),
        href: '/timetable#th9',
        title: 'Storytelling / Campfire Night',
        date: getEvent('th9')?.date || '',
      },
      {
        ...getEvent('f4'),
        href: '/timetable#f4',
        title: 'Debate & Speech Finals',
        date: getEvent('f4')?.date || '',
      },
      {
        ...getEvent('s9'),
        href: '/timetable#s9',
        title: 'Closing Ceremony & Banquet',
        date: getEvent('s9')?.date || '',
      },
    ].filter(e => e.id && e.title).map(e => ({
        ...e,
        image: e.image || 'https://placehold.co/400x400.png'
    })) as FeaturedEvent[];
  }, []);


  if (!user || !selectedDate) {
    return (
        <PageWrapper>
            <main className="flex-1 pb-24">
                <HomePageHeader />
                 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12">
                     <section>
                         <p className="text-muted-foreground text-center py-4">Loading events...</p>
                    </section>
                </div>
            </main>
        </PageWrapper>
    );
  }

  const selectedEvents = eventDays.find(([date]) => date === selectedDate)?.[1] || [];
  const visibleEvents = isExpanded ? selectedEvents : selectedEvents.slice(0, 3);

  const getDayStatus = (date: Date) => {
    const today = new Date(demoDate);
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() < today.getTime()) return "Happened on";
    if (date.getTime() === today.getTime()) return "Happening";
    return "Happening on";
  }

  const selectedDayDate = parseDate(selectedDate);
  const dayStatus = getDayStatus(selectedDayDate);
  const dayName = selectedDayDate.toLocaleDateString('en-US', { weekday: 'long' });

    return (
        <PageWrapper>
            <main className="flex-1 pb-24">
                <HomePageHeader />
                
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12">
                    <section>
                        <h2 className="text-xl font-bold font-headline tracking-tight text-foreground mb-4">
                            Event Highlights
                        </h2>
                         <ScrollArea className="w-full whitespace-nowrap rounded-md">
                            <div className="flex w-max space-x-4 pb-4">
                                {featuredEvents.map((event) => (
                                     <div key={event.id} className="w-[300px] sm:w-[350px] overflow-hidden">
                                        <FeaturedEventCard event={event} />
                                    </div>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </section>
                    
                     <Link href="/profile">
                        <Card className="shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 text-primary-foreground">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-primary-foreground/80">Your Progress</CardTitle>
                                <Star className="w-4 h-4 text-primary-foreground/80" />
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="text-2xl font-bold">{user.points.toLocaleString()} Points</div>
                                <p className="text-xs text-primary-foreground/80">
                                    {5000 - user.points > 0 ? `${(5000 - user.points).toLocaleString()} points to the next reward!` : `You've unlocked all rewards!`}
                                </p>
                                <Progress value={progress} className="w-full h-1.5 mt-2 [&>div]:bg-white" />
                            </CardContent>
                        </Card>
                    </Link>

                    <section>
                        <ScrollArea className="w-full whitespace-nowrap -mx-4 px-4">
                            <div className="flex w-max space-x-2 mx-auto">
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/council">Meet the Council</Link>
                                </Button>
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/contestants">Mr & Miss Collegiate</Link>
                                </Button>
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/football">Football Showdown</Link>
                                </Button>
                            </div>
                            <ScrollBar orientation="horizontal" className="invisible" />
                        </ScrollArea>
                    </section>
                    
                    <section>
                        <div className="flex justify-between items-center mb-4">
                             <h2 className="text-xl font-bold font-headline tracking-tight text-foreground">
                                {dayStatus === 'Happening' ? `Today's Events` : `${dayStatus} ${dayName}`}
                             </h2>
                             <div className="flex items-center gap-1.5">
                                {eventDays.map(([date]) => (
                                    <button
                                        key={date}
                                        onClick={() => setSelectedDate(date)}
                                        className={cn(
                                            "w-9 h-9 rounded-full text-sm font-semibold transition-colors flex items-center justify-center",
                                            selectedDate === date
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                                        )}
                                    >
                                        {date.split(',')[0].slice(0, 3)}
                                    </button>
                                ))}
                             </div>
                        </div>

                        {selectedEvents.length > 0 ? (
                           <>
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                                >
                                    {visibleEvents.map(event => (
                                        <motion.div layout key={event.id}>
                                            <TodayEventCard event={event} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                                {selectedEvents.length > 3 && (
                                     <div className="mt-4 text-center">
                                        <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)} className="text-primary">
                                            {isExpanded ? "Show Less" : "View all for today"}
                                            {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                                        </Button>
                                    </div>
                                )}
                           </>
                        ) : (
                            <p className="text-muted-foreground text-center py-4">No events scheduled for this day.</p>
                        )}
                    </section>

                </div>
            </main>
        </PageWrapper>
    );
}
