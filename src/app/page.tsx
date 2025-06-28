
'use client';
import * as React from 'react';
import { Bell, Search, Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { events, type Event } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageWrapper } from '@/components/page-wrapper';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const featuredItems = [
    {
        id: 'f10',
        title: 'OJUDE LAYIPO Opening Ceremony',
        description: 'Friday, 4th July 2025',
        image: 'https://images.unsplash.com/photo-1542621334-a254cf47763b?w=600&h=400&q=80',
        dataAiHint: 'grand ceremony',
        href: '/timetable#f10',
    },
    {
        id: 'th7',
        title: 'Football Competition',
        description: 'Preliminaries & Finals',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&q=80',
        dataAiHint: 'football stadium',
        href: '/timetable#th7',
    },
    {
        id: 'th9',
        title: 'Campfire & Stories',
        description: 'Thursday, 3rd July 2025',
        image: 'https://images.unsplash.com/photo-1496545672447-f699b503d270?w=600&h=400&q=80',
        dataAiHint: 'campfire night',
        href: '/timetable#th9',
    },
    {
        id: 'f11',
        title: 'Mr & Miss Collegiate',
        description: 'Friday, 4th July 2025',
        image: 'https://images.unsplash.com/photo-1519781981912-b4a690b27400?w=600&h=400&q=80',
        dataAiHint: 'fashion show',
        href: '/timetable#f11',
    },
    {
        id: 'f4',
        title: 'Speech & Debate Finals',
        description: 'Friday, 4th July 2025',
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&q=80',
        dataAiHint: 'public speaking',
        href: '/timetable#f4',
    },
    {
        id: 's9',
        title: 'Banquet & Closing Ceremony',
        description: 'Saturday, 5th July 2025',
        image: 'https://images.unsplash.com/photo-1527632946328-3d73b3768686?w=600&h=400&q=80',
        dataAiHint: 'formal banquet',
        href: '/timetable#s9',
    }
];


const FeaturedCard = ({ item }: { item: typeof featuredItems[0] }) => (
    <Link href={item.href} className="w-56 sm:w-64 flex-shrink-0">
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
            <CardFooter className="p-3 sm:p-4 pt-0">
                <div className="text-xs sm:text-sm font-medium text-primary flex items-center">
                    See Details <ArrowRight className="ml-2 h-4 w-4" />
                </div>
            </CardFooter>
        </Card>
    </Link>
);

const TodayEventCard = ({ event }: { event: Event }) => (
    <Link href={`/timetable#${event.id}`} className="block">
        <Card className="transition-all duration-300 hover:shadow-lg hover:bg-muted/50 h-full">
            <CardContent className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <Calendar className="w-5 h-5" />
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

export default function HomePage() {
    const { user } = useUser();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [todayEvents, setTodayEvents] = React.useState<Event[]>([]);
    const [isLoadingToday, setIsLoadingToday] = React.useState(true);
    
    React.useEffect(() => {
        // To make the demo more engaging, we'll always show events for the first full day of the conference.
        const demoDateStr = 'Thursday, 3rd July 2025';
        
        const filteredEvents = events.filter(event => event.date === demoDateStr).slice(0, 4);
        setTodayEvents(filteredEvents);
        setIsLoadingToday(false);
    }, []);
    
    const totalDays = events.reduce((acc, event) => acc.add(event.date), new Set()).size;
    const totalEvents = events.length;

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
                        <div className="absolute inset-0 bg-black/60" />
                    </div>
                    
                    <div className="relative z-10 p-4 sm:p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl sm:text-2xl font-bold">Layipo 2025</h1>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 -mr-2">
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

                        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                            <div>
                                <p className="font-bold text-lg sm:text-xl">{totalDays}</p>
                                <p className="text-xs sm:text-sm opacity-80">Days</p>
                            </div>
                            <div>
                                <p className="font-bold text-lg sm:text-xl">{totalEvents}</p>
                                <p className="text-xs sm:text-sm opacity-80">Sessions</p>
                            </div>
                            <div>
                                <p className="font-bold text-lg sm:text-xl">{(user?.points ?? 0).toLocaleString()}</p>
                                <p className="text-xs sm:text-sm opacity-80">Points</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12">
                    <section>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Happening Today</h2>
                             <Button asChild variant="link" size="sm" className="text-primary -mr-3 sm:mr-0">
                                <Link href="/timetable">
                                    View All <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        {isLoadingToday ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <Skeleton className="h-24 w-full rounded-lg" />
                               <Skeleton className="h-24 w-full rounded-lg" />
                            </div>
                        ) : todayEvents.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {todayEvents.map(event => <TodayEventCard key={event.id} event={event} />)}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground py-10 bg-muted/50 rounded-lg">
                                <p>No events scheduled for today. Take a rest!</p>
                                <p className="text-sm mt-2">Check the full timetable for other days.</p>
                            </div>
                        )}
                    </section>

                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">Explore The Event</h2>
                        <ScrollArea className="w-full -mx-4 sm:mx-0">
                            <div className="flex gap-4 pb-4 px-4 sm:px-0">
                                {featuredItems.map((item) => <FeaturedCard key={item.id} item={item} />)}
                            </div>
                            <ScrollBar orientation="horizontal" className="h-2" />
                        </ScrollArea>
                    </section>
                </div>
            </main>
        </PageWrapper>
    );
}
