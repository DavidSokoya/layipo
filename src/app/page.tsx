'use client';
import * as React from 'react';
import { Star, ChevronDown, ChevronUp, ChevronRight, Clock, MapPin, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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


const HomePageHeader = () => {
    const { user } = useUser();
    const avatarUrl = user?.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(user?.name || 'user')}`;

    if (!user) {
        return (
            <div className="flex justify-between items-center p-3 bg-card border-b">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
                    <div className="space-y-1">
                        <div className="w-20 h-4 bg-muted rounded-md animate-pulse"></div>
                        <div className="w-24 h-6 bg-muted rounded-md animate-pulse"></div>
                    </div>
                 </div>
                 <div className="w-20 h-9 bg-muted rounded-md animate-pulse"></div>
            </div>
        )
    }
    
    const firstName = user.name.split(' ')[0];

    return (
        <div className="flex justify-between items-center p-3 bg-card border-b">
            <Link href="/profile" className="flex items-center gap-3 group">
                 <Avatar className="w-10 h-10 border-2 border-primary/20 group-hover:border-primary transition-colors">
                    <AvatarImage src={avatarUrl} alt={user.name} />
                    <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm text-muted-foreground">Hi, there!</p>
                    <h1 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{firstName}</h1>
                </div>
            </Link>
             <Button variant="outline" size="sm" asChild>
                <Link href="/profile">
                    <Star className="w-4 h-4 mr-2 text-amber-500" />
                    <span>{(user?.points ?? 0).toLocaleString()}</span>
                </Link>
            </Button>
        </div>
    )
};

type FeaturedEvent = {
  id: string;
  href: string;
  title: string;
  time: string;
  location: string;
  dressCode: string;
  image: string;
  dataAiHint?: string;
};

const FeaturedEventCard = ({ event }: { event: FeaturedEvent }) => (
    <Link href={event.href} className="block group">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col sm:flex-row h-full">
            <div className="sm:w-1/3 relative overflow-hidden h-36 sm:h-auto">
                <Image 
                  src={event.image || 'https://placehold.co/400x400.png'} 
                  alt={event.title}
                  data-ai-hint={event.dataAiHint}
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="sm:w-2/3 flex flex-col p-4">
                <h3 className="font-bold text-base leading-tight">{event.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <Clock className="w-3 h-3 mr-2 shrink-0" />
                    <span>{event.time}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3 mr-2 shrink-0" />
                    <span className='truncate'>{event.location}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Shirt className="w-3 h-3 mr-2 shrink-0" />
                    <span>{event.dressCode}</span>
                </div>
                <div className="mt-auto pt-2 text-primary font-semibold text-sm flex items-center">
                    View Details <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </Card>
    </Link>
);


export default function HomePage() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const demoDate = new Date('2025-07-03T00:00:00');

  const parseDate = (dateStr: string): Date => {
    if (!dateStr) return new Date();
    const datePart = dateStr.split(', ')[1] || dateStr;
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

      return [
        { id: 'f10', href: '/timetable#f10', title: 'Opening Ceremony', dressCode: 'Outfit: Campala', ...eventMap['f10'] },
        { id: 'f11', href: '/timetable#f11', title: 'Mr & Miss Collegiate', dressCode: `Outfit: ${eventMap['f11'].dressCode.title}`, ...eventMap['f11'] },
        { id: 'trainings', href: '/trainings', title: 'Skill Development Trainings', time: 'Multiple Sessions', location: 'Various Halls', dressCode: 'Outfit: Business Formal', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional training' },
        { id: 'f5', href: '/timetable#f5', title: 'Collegiate General Assembly', dressCode: 'Outfit: Strictly Formal', ...eventMap['f5'] },
        { id: 'th9', href: '/timetable#th9', title: 'Storytelling / Campfire Night', dressCode: 'Outfit: Rep Your Culture', ...eventMap['th9'] },
        { id: 'f4', href: '/timetable#f4', title: 'Debate & Speech Finals', dressCode: `Outfit: ${eventMap['f4'].dressCode.title}`, ...eventMap['f4'] },
        { id: 's9', href: '/timetable#s9', title: 'Closing Ceremony & Banquet', dressCode: 'Outfit: Black Tie', ...eventMap['s9'] },
      ];
  }, []);


  if (!selectedDate) {
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
                    
                    <section>
                        <h2 className="text-xl font-bold font-headline tracking-tight text-foreground mb-4">
                            Event Highlights
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {featuredEvents.map((event) => <FeaturedEventCard key={event.id} event={event} />)}
                        </div>
                    </section>
                    
                    <section>
                        <h2 className="text-xl font-bold font-headline tracking-tight text-foreground mb-4">
                            More Information
                        </h2>
                        <div className="flex flex-wrap gap-2">
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
                    </section>
                </div>
            </main>
        </PageWrapper>
    );
}
