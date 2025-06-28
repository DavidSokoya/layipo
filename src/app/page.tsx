'use client';
import * as React from 'react';
import { Star, Users, Award, Trophy, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageWrapper } from '@/components/page-wrapper';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Event } from '@/lib/data';
import { events } from '@/lib/data';
import { TodayEventCard } from '@/components/today-event-card';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';


const infoCards = [
    {
        title: "Meet the Council",
        href: "/council",
        icon: Users
    },
    {
        title: "Mr & Miss Collegiate",
        href: "/contestants",
        icon: Award
    },
    {
        title: "Football Showdown",
        href: "/football",
        icon: Trophy
    }
];

const HomePageHeader = () => {
    const { user } = useUser();
    const avatarUrl = user?.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(user?.name || 'user')}`;

    if (!user) {
        return (
            <div className="flex justify-between items-center p-3 bg-card border-b">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full animate-pulse"></div>
                    <div className="space-y-1">
                        <div className="w-20 h-4 bg-muted rounded-md animate-pulse"></div>
                        <div className="w-28 h-7 bg-muted rounded-md animate-pulse"></div>
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
                 <Avatar className="w-12 h-12 border-2 border-primary/20 group-hover:border-primary transition-colors">
                    <AvatarImage src={avatarUrl} alt={user.name} />
                    <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm text-muted-foreground">Hi, there!</p>
                    <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{firstName}</h1>
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

const InfoLinkCard = ({ title, href, icon: Icon }: typeof infoCards[0]) => (
     <Link href={href} className="block group">
        <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
            <CardContent className="p-3 flex flex-col items-center justify-center text-center gap-1.5">
                <Icon className="w-6 h-6 text-primary" />
                <p className="font-semibold text-xs text-center">{title}</p>
            </CardContent>
        </Card>
    </Link>
);


export default function HomePage() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const demoDate = new Date('2025-07-03T00:00:00');

  const parseDate = (dateStr: string): Date => {
    const parts = dateStr.split(', ');
    const datePart = parts.length > 1 ? parts[1] : parts[0];
    const cleanDateStr = datePart.replace(/(\d+)(st|nd|rd|th)/, '$1');
    // Append a fixed year for consistent parsing
    return new Date(cleanDateStr + ' 2025');
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
    if (eventDays.length > 0) {
      setSelectedDate(getInitialDate());
    }
  }, [eventDays, getInitialDate]);

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
                         <div className="grid grid-cols-3 gap-2">
                            {infoCards.map((card) => <InfoLinkCard key={card.href} {...card} />)}
                        </div>
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
                           <AnimatePresence initial={false}>
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
                           </AnimatePresence>
                        ) : (
                            <p className="text-muted-foreground text-center py-4">No events scheduled for this day.</p>
                        )}
                    </section>
                </div>
            </main>
        </PageWrapper>
    );
}
