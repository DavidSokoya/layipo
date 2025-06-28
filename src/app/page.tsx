'use client';
import * as React from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Star, Users, Award, Trophy, Mic } from 'lucide-react';
import Image from 'next/image';
import { events, type Event } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageWrapper } from '@/components/page-wrapper';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const featuredItems = [
    {
        id: 'f10',
        title: 'OJUDE LAYIPO Opening Ceremony',
        description: 'Friday, 4th July 2025',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'grand ceremony',
        href: '/timetable#f10',
    },
    {
        id: 'th7',
        title: 'Football Competition',
        description: 'Preliminaries & Finals',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'football stadium',
        href: '/timetable#th7',
    },
    {
        id: 'th9',
        title: 'Campfire & Stories',
        description: 'Thursday, 3rd July 2025',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'campfire night',
        href: '/timetable#th9',
    },
    {
        id: 'f11',
        title: 'Mr & Miss Collegiate',
        description: 'Friday, 4th July 2025',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'fashion show',
        href: '/timetable#f11',
    },
    {
        id: 'f4',
        title: 'Speech & Debate Finals',
        description: 'Friday, 4th July 2025',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'public speaking',
        href: '/timetable#f4',
    },
    {
        id: 's9',
        title: 'Banquet & Closing Ceremony',
        description: 'Saturday, 5th July 2025',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'formal banquet',
        href: '/timetable#s9',
    },
    {
        id: 's10',
        title: 'Tungba Night',
        description: 'Saturday, 5th July 2025',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'party night',
        href: '/timetable#s10',
    }
];

const infoCards = [
    {
        title: "Meet the Council",
        description: "Discover the 2025 JCI Nigeria Collegiate Council, a dynamic group of leaders driven by the Ascend vision.",
        href: "/council",
        icon: Users
    },
    {
        title: "Mr & Miss Collegiate",
        description: "Meet the contestants and judges for this year's pageant. Get ready to vote for your champions!",
        href: "/contestants",
        icon: Award
    },
    {
        title: "Football Showdown",
        description: "The group stage draw is here! Check out the matchups and get ready for the collegiate rivalry to begin.",
        href: "/football",
        icon: Trophy
    }
]

const HomePageHeader = () => {
    const { user } = useUser();
    const avatarUrl = user?.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(user?.name || 'user')}`;

    if (!user) {
        return (
            <div className="flex justify-between items-center p-4 bg-card border-b">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full animate-pulse"></div>
                    <div className="space-y-2">
                        <div className="w-24 h-5 bg-muted rounded-md animate-pulse"></div>
                        <div className="w-32 h-8 bg-muted rounded-md animate-pulse"></div>
                    </div>
                 </div>
                 <div className="w-24 h-10 bg-muted rounded-md animate-pulse"></div>
            </div>
        )
    }

    return (
        <div className="flex justify-between items-center p-4 bg-card border-b">
            <Link href="/profile" className="flex items-center gap-4 group">
                 <Avatar className="w-16 h-16 border-2 border-primary/20 group-hover:border-primary transition-colors">
                    <AvatarImage src={avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-muted-foreground">Hi, there!</p>
                    <h1 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{user.name}</h1>
                </div>
            </Link>
             <Button variant="outline" asChild>
                <Link href="/profile">
                    <Star className="w-4 h-4 mr-2 text-amber-500" />
                    <span>{(user?.points ?? 0).toLocaleString()}</span>
                </Link>
            </Button>
        </div>
    )
}

const InfoLinkCard = ({ title, description, href, icon: Icon }: typeof infoCards[0]) => (
    <Link href={href} className="block group">
        <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
            <CardHeader className="flex flex-row items-center gap-4 p-4">
                <Icon className="w-8 h-8 text-primary shrink-0" />
                <div className="flex-1">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                 <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform shrink-0" />
            </CardHeader>
        </Card>
    </Link>
)

const TodayEventCard = ({ event }: { event: Event }) => (
    <Link href={`/timetable#${event.id}`} className="block">
        <Card className="transition-all duration-300 hover:shadow-lg hover:bg-muted/50 h-full">
            <CardContent className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <Mic className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-sm leading-snug">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.time} &bull; {event.location}</p>
                </div>
                 <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto self-start shrink-0" />
            </CardContent>
        </Card>
    </Link>
);

const parseDate = (dateStr: string): Date => {
    if (!dateStr) return new Date(NaN);
    const cleanDateStr = dateStr.split(', ')[1]?.replace(/(\d+)(st|nd|rd|th)/, '$1');
    if (!cleanDateStr) return new Date(NaN);
    return new Date(cleanDateStr);
};


export default function HomePage() {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const eventDays = React.useMemo(() => {
        const dates = Array.from(new Set(events.map(e => e.date)));
        return dates.sort((a, b) => {
            const dateA = parseDate(a);
            const dateB = parseDate(b);
            if (isNaN(dateA.getTime())) return 1;
            if (isNaN(dateB.getTime())) return -1;
            return dateA.getTime() - dateB.getTime();
        });
    }, []);

    const DEMO_DATE = 'Thursday, 3rd July 2025';
    const [selectedDate, setSelectedDate] = React.useState(DEMO_DATE);

    const displayedEvents = React.useMemo(() => {
        return events.filter(event => event.date === selectedDate);
    }, [selectedDate]);
    
    const eventsToShow = isExpanded ? displayedEvents : displayedEvents.slice(0, 3);

    const title = React.useMemo(() => {
        const todayForDemo = parseDate(DEMO_DATE);
        const currentSelectedDate = parseDate(selectedDate);
        if (isNaN(currentSelectedDate.getTime())) return "Today's Events";

        const dayName = selectedDate.split(',')[0];

        if (currentSelectedDate.getTime() === todayForDemo.getTime()) {
          return "Happening Today";
        }

        if (currentSelectedDate.getTime() < todayForDemo.getTime()) {
          return `Happened on ${dayName}`;
        }

        return `Happening on ${dayName}`;
    }, [selectedDate]);

    return (
        <PageWrapper>
            <main className="flex-1 pb-16">
                <HomePageHeader />
                
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12">
                     <section className="space-y-4">
                        {infoCards.map((card) => <InfoLinkCard key={card.href} {...card} />)}
                    </section>
                
                    <section>
                         <div className="flex flex-wrap items-center justify-between gap-y-2 mb-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h2>
                                <div className="flex items-center gap-2">
                                    {eventDays.map((date) => {
                                        const dayAbbr = date.split(',')[0].slice(0, 3);
                                        const isActive = date === selectedDate;
                                        return (
                                            <Button
                                                key={date}
                                                variant={isActive ? 'default' : 'outline'}
                                                size="icon"
                                                className={cn(
                                                    "h-10 w-10 sm:h-8 sm:w-8 shrink-0 rounded-full text-xs font-bold",
                                                    isActive && "shadow-lg"
                                                )}
                                                onClick={() => {
                                                    setSelectedDate(date);
                                                    setIsExpanded(false);
                                                }}
                                            >
                                                {dayAbbr}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                             <Button asChild variant="link" size="sm" className="text-primary -mr-3 sm:mr-0">
                                <Link href="/timetable">
                                    View Full Timetable <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        {displayedEvents.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {eventsToShow.map(event => <TodayEventCard key={event.id} event={event} />)}
                                </div>
                                {displayedEvents.length > 3 && (
                                    <div className="mt-4 text-center">
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            className="w-full sm:w-auto"
                                        >
                                            {isExpanded ? 'Show Less' : `View all ${displayedEvents.length} events for today`}
                                            {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center text-muted-foreground py-10 bg-muted/50 rounded-lg">
                                <p>No events scheduled for this day.</p>
                                <p className="text-sm mt-2">Check the full timetable for other days.</p>
                            </div>
                        )}
                    </section>
                    
                     <section>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">Explore The Event</h2>
                        <ScrollArea className="w-full -mx-4 sm:mx-0">
                            <div className="flex gap-4 pb-4 px-4 sm:px-0">
                                {featuredItems.map((item) => (
                                    <Link key={item.id} href={item.href} className="w-56 sm:w-64 flex-shrink-0">
                                        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group h-full flex flex-col">
                                            <div className="aspect-video overflow-hidden relative">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform group-hover:scale-105"
                                                    data-ai-hint={item.dataAiHint}
                                                />
                                            </div>
                                            <CardHeader className="flex-grow p-3 sm:p-4">
                                                <CardTitle className="text-sm sm:text-base leading-snug">{item.title}</CardTitle>
                                                <CardDescription className="text-xs sm:text-sm mt-1">{item.description}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="h-2" />
                        </ScrollArea>
                    </section>

                </div>
            </main>
        </PageWrapper>
    );
}
