
'use client';
import * as React from 'react';
import { Star, Clock, MapPin, CalendarDays } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PageWrapper } from '@/components/page-wrapper';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Event } from '@/lib/data';
import { events } from '@/lib/data';
import { TodayEventCard } from '@/components/today-event-card';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';


const HomePageHeader = () => {
    const { user } = useUser();
    const avatarUrl = user?.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(user?.name || 'user')}`;

    if (!user) {
        return (
            <div className="flex justify-between items-center p-2 bg-card border-b">
                 <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <Skeleton className="h-6 w-24" />
                 </div>
                 <Skeleton className="h-6 w-20" />
            </div>
        )
    }
    
    const firstName = user.name.split(' ')[0];

    return (
        <div className="flex justify-between items-center p-4 bg-card border-b">
            <Link href="/profile" className="flex items-center gap-3 group">
                 <Avatar className="w-9 h-9 border-2 border-primary/20 group-hover:border-primary transition-colors">
                    <AvatarImage src={avatarUrl} alt={user.name} />
                    <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Hi, {firstName}</h1>
            </Link>
            <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">{user.points.toLocaleString()} Points</span>
            </div>
        </div>
    )
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


export default function HomePage() {
  const { user } = useUser();
  const demoDate = new Date('2025-07-03T00:00:00');


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
  
  const allSpotlightItems: SpotlightItem[] = React.useMemo(() => {
    const eventMap = events.reduce((acc, event) => {
      acc[event.id] = event;
      return acc;
    }, {} as Record<string, Event>);
  
    const getEvent = (id: string) => eventMap[id];

    const featureLinks: SpotlightItem[] = [
        {
            href: '/council',
            title: 'The Council',
            image: 'https://placehold.co/400x400.png',
            dataAiHint: 'group leadership',
        },
        {
            href: '/contestants',
            title: 'Mr & Miss Collegiate',
            image: 'https://placehold.co/400x400.png',
            dataAiHint: 'pageant crown',
        },
        {
            href: '/football',
            title: 'Football Showdown',
            image: 'https://placehold.co/400x400.png',
            dataAiHint: 'football trophy',
        },
    ];
  
    const eventHighlights: SpotlightItem[] = [
      {
        href: '/timetable#f10',
        title: 'Opening Ceremony',
        date: getEvent('f10')?.date || '',
        image: getEvent('f10')?.image || 'https://placehold.co/400x400.png',
        dataAiHint: getEvent('f10')?.dataAiHint,
      },
      {
        href: '/timetable#f11',
        title: 'Mr & Miss Collegiate',
        date: getEvent('f11')?.date || '',
        image: getEvent('f11')?.image || 'https://placehold.co/400x400.png',
        dataAiHint: getEvent('f11')?.dataAiHint,
      },
      {
        href: '/trainings',
        title: 'Skill Development Trainings',
        date: 'Multiple Days',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'professional training',
      },
      {
        href: getEvent('s3')?.href || '/timetable#s3',
        title: getEvent('s3')?.title || 'Special Event',
        date: getEvent('s3')?.date || '',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'coffee chat meeting'
      },
      {
        href: '/timetable#f5',
        title: 'Collegiate General Assembly',
        date: getEvent('f5')?.date || '',
        image: getEvent('f5')?.image || 'https://placehold.co/400x400.png',
        dataAiHint: getEvent('f5')?.dataAiHint,
      },
      {
        href: '/timetable#f4',
        title: 'Debate & Speech Finals',
        date: getEvent('f4')?.date || '',
        image: getEvent('f4')?.image || 'https://placehold.co/400x400.png',
        dataAiHint: getEvent('f4')?.dataAiHint,
      },
    ].filter(e => e.title);

    return [...featureLinks, ...eventHighlights];
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
                        <div className="flex justify-between items-center mb-6">
                             <h2 className="text-base font-bold font-headline tracking-tight text-foreground">
                                {dayStatus === 'Happening' ? `Today's Events` : `${dayStatus} ${dayName}`}
                             </h2>
                             <div className="flex items-center gap-1.5">
                                {eventDays.map(([date]) => (
                                    <button
                                        key={date}
                                        onClick={() => setSelectedDate(date)}
                                        className={cn(
                                            "w-8 h-8 rounded-full text-[10px] font-semibold transition-colors flex items-center justify-center",
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
                           <ScrollArea className="w-full h-[16rem] rounded-lg border p-2">
                               <div className="grid grid-cols-1 gap-4">
                                   {selectedEvents.map(event => (
                                       <TodayEventCard key={event.id} event={event} />
                                   ))}
                               </div>
                           </ScrollArea>
                        ) : (
                            <p className="text-muted-foreground text-center py-4">No events scheduled for this day.</p>
                        )}
                    </section>
                </div>
            </main>
        </PageWrapper>
    );
}
