
'use client';
import {
    Bookmark, Users, Calendar, Clock, MapPin, User, FileText, Bot, Download, Edit, Star, Award, BrainCircuit, Activity, Mic, Flame, Coffee, Badge, Link as LinkIcon, HelpCircle
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
import { cn } from '@/lib/utils';

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

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const ConnectionCard = ({ connection }: { connection: PublicUserProfile & { connectedAt: string } }) => {
    const avatarUrl = connection.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(connection.name)}`;
    const connectedDate = new Date(connection.connectedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    });
    const message = encodeURIComponent(`Hi ${User.name}We met at the JCIN Collegiate Conference 2025`);
    const whatsappLink = `https://wa.me/${connection.whatsappNumber.replace(/\+/g, '')}?text=${message}`;

    return (
         <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/30 bg-gradient-to-br from-card to-muted/30">
            <CardContent className="p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarImage src={avatarUrl} alt={connection.name} />
                        <AvatarFallback><User className="w-6 h-6" /></AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                        <p className="font-semibold text-sm truncate">{connection.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{connection.localOrganisation.toUpperCase()}</p>
                        <p className="text-xs text-muted-foreground/80 mt-1 flex items-center gap-1.5"><LinkIcon className="w-3 h-3"/>Connected on {connectedDate}</p>
                    </div>
                </div>
                 <Button asChild size="icon" className="shrink-0 bg-green-500 hover:bg-green-600">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <WhatsappIcon className="w-5 h-5 fill-white" />
                        <span className="sr-only">Chat on WhatsApp</span>
                    </a>
                </Button>
            </CardContent>
        </Card>
    );
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
                        <p className="text-muted-foreground">{user.localOrganisation.toLocaleUpperCase()}</p>
                         <div className="mt-2 flex items-center gap-2 justify-center sm:justify-start">
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
                    </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                     <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="cursor-help">
                                    <div className="flex justify-between items-center mb-1 text-sm">
                                        <span className="font-semibold text-primary flex items-center gap-1.5">
                                            My Points
                                            <HelpCircle className="w-4 h-4 text-muted-foreground" />
                                        </span>
                                        <span className="font-bold">{user.points} / {pointsToNextLevel}</span>
                                    </div>
                                    <Progress value={(user.points / pointsToNextLevel) * 100} />
                                    <p className="text-xs text-muted-foreground mt-1 text-right">{pointsToNextLevel - user.points} points to next level</p>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="font-semibold">How to earn points:</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                                    <li>+10 for creating your profile</li>
                                    <li>+5 for each new connection</li>
                                    <li>+2 for bookmarking a session</li>
                                    <li>-2 for removing a bookmark</li>
                                </ul>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                     <div>
                        <h3 className="text-sm font-semibold text-primary mb-2">My Badges</h3>
                         {unlockedBadges.length > 0 ? (
                            <ScrollArea>
                                <div className="flex gap-4 pb-2">
                                    {unlockedBadges.map((badge) => (
                                        <TooltipProvider key={badge.id}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex flex-col items-center gap-1.5 w-16 text-center">
                                                         <div className={cn(
                                                            "flex items-center justify-center w-12 h-12 rounded-full",
                                                            "bg-amber-100 border-2 border-amber-300 text-amber-600"
                                                        )}>
                                                            <badge.icon className="w-6 h-6" />
                                                        </div>
                                                        <p className="text-xs text-muted-foreground leading-tight">{badge.name}</p>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{badge.description}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        ) : (
                            <p className="text-sm text-muted-foreground">No badges unlocked yet. Keep participating!</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Bookmark className="w-5 h-5 text-primary"/>
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
                            <p className="text-sm text-muted-foreground mt-1">Tap the Scan button below to exchange contact info!</p>
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
      </main>
    </PageWrapper>
  );
}
