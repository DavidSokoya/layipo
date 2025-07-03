
'use client';
import {
    BookMarked, Users, Calendar, Clock, MapPin, User, FileText, Bot, Download, Edit, Star, Award, BrainCircuit, Activity, Mic, Flame, Coffee
} from 'lucide-react';
import React from 'react';
import { useUser } from '@/hooks/use-user';
import { events } from '@/lib/data/events';
import { trainings } from '@/lib/data/trainings';
import { allRewardBadges } from '@/lib/data/rewards';
import type { Event, Training, PublicUserProfile, RewardBadge } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageWrapper } from '@/components/page-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function ProfileLoader() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-4">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <Skeleton className="w-20 h-20 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-40" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-32 mb-2" />
                        <div className="flex gap-4">
                            <Skeleton className="h-16 w-16 rounded-lg" />
                            <Skeleton className="h-16 w-16 rounded-lg" />
                            <Skeleton className="h-16 w-16 rounded-lg" />
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-40" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        </div>
    );
}

const getEventIcon = (title: string, isTraining: boolean) => {
    if (isTraining) return <BrainCircuit className="w-5 h-5 text-primary" />;
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('football') || lowerTitle.includes('aerobics')) return <Activity className="w-5 h-5 text-primary" />;
    if (lowerTitle.includes('ceremony') || lowerTitle.includes('banquet')) return <Award className="w-5 h-5 text-primary" />;
    if (lowerTitle.includes('speech') || lowerTitle.includes('debate')) return <Mic className="w-5 h-5 text-primary" />;
    if (lowerTitle.includes('assembly') || lowerTitle.includes('meeting') || lowerTitle.includes('chat')) return <Users className="w-5 h-5 text-primary" />;
    if (lowerTitle.includes('campfire') || lowerTitle.includes('storytelling')) return <Flame className="w-5 h-5 text-primary" />;
    if (lowerTitle.includes('breakfast') || lowerTitle.includes('lunch')) return <Coffee className="w-5 h-5 text-primary" />;
    return <Calendar className="w-5 h-5 text-primary" />;
};

const AgendaItemCard = ({ item }: { item: Event | Training }) => {
    const isTraining = 'trainer' in item;
    const title = isTraining ? (item as Training).topic : (item as Event).title;
    const location = isTraining ? (item as Training).venue : (item as Event).location;
    return (
        <Link href={`/timetable#${item.id}`} className="block group">
            <div className="p-3 rounded-lg transition-colors hover:bg-muted/50 flex items-start gap-4">
                {getEventIcon(title, isTraining)}
                <div className="flex-1">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">{title}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1 gap-x-4 gap-y-1 flex-wrap">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{item.time}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{location}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const ConnectionCard = ({ connection }: { connection: PublicUserProfile }) => {
    const avatarUrl = connection.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(connection.name)}`;
    return (
        <Card className="transition-all hover:shadow-md">
            <CardContent className="p-3 flex items-center gap-3">
                 <Avatar className="w-12 h-12">
                    <AvatarImage src={avatarUrl} alt={connection.name} />
                    <AvatarFallback><User className="w-6 h-6" /></AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-sm">{connection.name}</p>
                    <p className="text-xs text-muted-foreground">{connection.localOrganisation.toUpperCase()}</p>
                </div>
            </CardContent>
        </Card>
    )
}



export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const allEventsAndTrainings = React.useMemo(() => [...events, ...trainings], []);

  const bookmarkedItems = React.useMemo(() => {
    if (!user) return [];
    return allEventsAndTrainings
      .filter(item => user.bookmarkedEventIds.includes(item.id))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.time.localeCompare(b.time));
  }, [user, allEventsAndTrainings]);

  const groupedAgenda = React.useMemo(() => {
    return bookmarkedItems.reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {} as Record<string, (Event | Training)[]>);
  }, [bookmarkedItems]);

  if (isLoading || !user) {
    return (
      <PageWrapper>
        <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
          <ProfileLoader />
        </main>
      </PageWrapper>
    );
  }
  
  const avatarUrl = user.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(user.name)}`;
  const unlockedBadges = allRewardBadges.filter(badge => user.unlockedBadges.includes(badge.id));
  const pointsToNextLevel = 100;

  return (
    <PageWrapper>
      <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
        <div className="max-w-4xl mx-auto space-y-8">
            <Card className="overflow-hidden">
                <CardHeader className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 space-y-0 bg-muted/50">
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-background shadow-md">
                        <AvatarImage src={avatarUrl} alt={user.name} />
                        <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-2xl font-bold font-headline text-foreground">{user.name}</h1>
                        <p className="text-muted-foreground">{user.localOrganisation}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild size="sm">
                            <Link href="/install">
                                <Download className="mr-2 h-4 w-4" /> Install
                            </Link>
                        </Button>
                        <Button variant="default" asChild size="sm">
                            <Link href="/welcome">
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-6">
                     <div>
                        <div className="flex justify-between items-center mb-1">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Star className="w-4 h-4 text-amber-500" />
                                My Points
                            </CardTitle>
                            <span className="text-sm font-bold text-foreground">{user.points} / {pointsToNextLevel}</span>
                        </div>
                        <Progress value={(user.points / pointsToNextLevel) * 100} />
                        <CardDescription className="text-xs text-right mt-1">
                            {pointsToNextLevel - user.points} points to next level
                        </CardDescription>
                    </div>

                     <div>
                        <CardTitle className="text-sm font-semibold mb-3">Unlocked Badges</CardTitle>
                        {unlockedBadges.length > 0 ? (
                             <ScrollArea>
                                <div className="flex gap-4 pb-4">
                                    {unlockedBadges.map(badge => <RewardBadgeCard key={badge.id} badge={badge} />)}
                                </div>
                                <ScrollBar orientation="horizontal" />
                             </ScrollArea>
                        ) : (
                             <div className="text-center py-6 px-4 rounded-lg bg-muted/50">
                                <Award className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                                <h3 className="font-semibold text-sm text-foreground">No Badges Yet</h3>
                                <p className="text-xs text-muted-foreground mt-1">Attend sessions and connect with others to earn badges!</p>
                             </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <BookMarked className="w-5 h-5 text-primary"/>
                        My Agenda
                    </CardTitle>
                    <CardDescription>Your personalized schedule of bookmarked events and sessions.</CardDescription>
                </CardHeader>
                <CardContent>
                    {bookmarkedItems.length > 0 ? (
                        <Accordion type="multiple" defaultValue={Object.keys(groupedAgenda)} className="w-full space-y-2">
                            {Object.entries(groupedAgenda).map(([date, items]) => (
                                <AccordionItem value={date} key={date} className="border rounded-lg px-1 bg-background">
                                    <AccordionTrigger className="hover:no-underline py-3 px-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span className="font-semibold text-foreground">{date}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-1">
                                        <div className="space-y-1 border-t -mx-1">
                                            {items.map(item => <AgendaItemCard key={item.id} item={item} />)}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                         <div className="text-center py-8 px-4 rounded-lg bg-muted/50">
                            <FileText className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                            <h3 className="font-semibold text-foreground">Your Agenda is Empty</h3>
                            <p className="text-sm text-muted-foreground mt-1">Bookmark sessions from the Timetable or Events pages to add them here.</p>
                         </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Users className="w-5 h-5 text-primary"/>
                        My Connections
                    </CardTitle>
                    <CardDescription>A list of people you've connected with during the event.</CardDescription>
                </CardHeader>
                <CardContent>
                    {user.connections.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {user.connections.map(connection => (
                                <ConnectionCard key={connection.whatsappNumber} connection={connection}/>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 px-4 rounded-lg bg-muted/50">
                            <Bot className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                            <h3 className="font-semibold text-foreground">No Connections Yet</h3>
                            <p className="text-sm text-muted-foreground mt-1">Scan badges to exchange contact info and earn points!</p>
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
      </main>
    </PageWrapper>
  );
}
