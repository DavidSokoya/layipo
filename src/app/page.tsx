'use client';
import * as React from 'react';
import { Bell, Search, Calendar, Sparkles, Trophy, Mic, Award, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { events, type Event, trainings } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageWrapper } from '@/components/page-wrapper';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

// A helper function to parse date strings like "Wednesday, 2nd July 2025"
const parseDate = (dateStr: string): Date => {
    const cleanDateStr = dateStr.split(', ')[1].replace(/(\d+)(st|nd|rd|th)/, '$1');
    const date = new Date(cleanDateStr);
    // Fix for potential timezone issues where new Date() might result in the previous day.
    date.setHours(12, 0, 0, 0); 
    return date;
};

const featuredItems = [
    {
        title: 'Skill Development',
        description: `${trainings.length} sessions to boost your skills.`,
        image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&q=80',
        dataAiHint: 'workshop training',
        href: '/trainings',
        icon: Sparkles
    },
    {
        title: 'Football Finals',
        description: 'The ultimate showdown.',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&q=80',
        dataAiHint: 'football stadium',
        href: '/timetable',
        icon: Trophy
    },
    {
        title: 'Campfire & Stories',
        description: 'Relax and connect.',
        image: 'https://images.unsplash.com/photo-1508827420312-b5f4fe45c97b?w=600&h=400&q=80',
        dataAiHint: 'campfire night',
        href: '/timetable',
        icon: Mic
    },
    {
        title: 'Mr & Miss Collegiate',
        description: 'Glamour and talent on display.',
        image: 'https://images.unsplash.com/photo-1504194954202-60c3a6423a60?w=600&h=400&q=80',
        dataAiHint: 'fashion runway',
        href: '/timetable',
        icon: Award
    }
];

const FeaturedCard = ({ item }: { item: typeof featuredItems[0] }) => (
    <Link href={item.href} className="w-64 flex-shrink-0">
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
            <CardHeader className="flex-grow p-4">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription className="text-sm mt-1">{item.description}</CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
                <div className="text-sm font-medium text-primary flex items-center">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                </div>
            </CardFooter>
        </Card>
    </Link>
);

const TodayEventCard = ({ event }: { event: Event }) => (
    <Link href={`/timetable`} className="block">
        <Card className="transition-all duration-300 hover:shadow-lg hover:bg-muted/50">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.time} &bull; {event.location}</p>
                </div>
                 <ArrowRight className="w-4 h-4 text-muted-foreground" />
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
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredEvents = events.filter(event => {
            const eventDate = parseDate(event.date);
            return eventDate.getTime() === today.getTime();
        }).slice(0, 4); // Show max 4 events for today
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
                        <div className="absolute inset-0 bg-black/40" />
                    </div>
                    
                    <div className="relative z-10 p-4 sm:p-6 lg:p-8">
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
                                <p className="font-bold text-lg sm:text-xl">{(user?.points ?? 0).toLocaleString()}</p>
                                <p className="text-xs sm:text-sm opacity-80">Points</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Happening Today</h2>
                            <Button asChild variant="ghost">
                                <Link href="/timetable">
                                    View Full Timetable <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        {isLoadingToday ? (
                            <div className="space-y-4">
                               <Skeleton className="h-20 w-full rounded-lg" />
                               <Skeleton className="h-20 w-full rounded-lg" />
                            </div>
                        ) : todayEvents.length > 0 ? (
                            <div className="grid gap-4">
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
                        <h2 className="text-2xl font-bold mb-4">Explore The Event</h2>
                        <ScrollArea className="w-full">
                            <div className="flex gap-4 pb-4">
                                {featuredItems.map((item, index) => <FeaturedCard key={index} item={item} />)}
                            </div>
                            <ScrollBar orientation="horizontal" className="h-2" />
                        </ScrollArea>
                    </section>
                </div>
            </main>
        </PageWrapper>
    );
}
