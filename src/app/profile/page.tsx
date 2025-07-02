
'use client';
import { BookMarked, Users, Calendar, Clock, MapPin, User, FileText, Bot, Download } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { useUser } from '@/hooks/use-user';
import { events } from '@/lib/data/events';
import { trainings } from '@/lib/data/trainings';
import type { Event, Training, PublicUserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageWrapper } from '@/components/page-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

function ProfileLoader() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-8">
                <Skeleton className="h-8 w-48" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-5 w-32" />
                </div>
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-40" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-40" />
                </CardHeader>
                <CardContent>
                     <Skeleton className="h-20 w-full" />
                </CardContent>
            </Card>
        </div>
    );
}

const AgendaItemCard = ({ item }: { item: Event | Training }) => {
    const isTraining = 'trainer' in item;
    return (
        <Link href={`/timetable#${item.id}`} className="block group">
            <div className="p-3 rounded-lg transition-colors hover:bg-muted/50">
                 <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{isTraining ? (item as Training).topic : (item as Event).title}</p>
                 <div className="flex items-center text-sm text-muted-foreground mt-1 gap-x-4 gap-y-1 flex-wrap">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{item.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{isTraining ? (item as Training).venue : (item as Event).location}</span>
                 </div>
            </div>
        </Link>
    )
}

const ConnectionCard = ({ connection }: { connection: PublicUserProfile }) => {
    const avatarUrl = connection.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(connection.name)}`;
    return (
        <Card>
            <CardContent className="p-3 flex items-center gap-3">
                 <Avatar className="w-12 h-12">
                    <AvatarImage src={avatarUrl} alt={connection.name} />
                    <AvatarFallback><User className="w-6 h-6" /></AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-sm">{connection.name}</p>
                    <p className="text-xs text-muted-foreground">{connection.localOrganisation}</p>
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

  return (
    <PageWrapper>
      <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
        <div className="max-w-4xl mx-auto space-y-8">
           <div className="mb-4 flex items-center justify-between">
                <Image src="/logos/elevate_lo.png" alt="Elevate Logo" width={90} height={20} className="object-contain" />
                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild size="sm">
                        <Link href="/install">
                            <Download className="mr-2 h-4 w-4" /> Install App
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild size="sm">
                        <Link href="/welcome">
                            <User className="mr-2 h-4 w-4"/> Edit Profile
                        </Link>
                    </Button>
                </div>
                <Image src="/logos/layipo_lo.png" alt="LAYIPO 25 Logo" width={90} height={24} className="object-contain" />
            </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src={avatarUrl} alt={user.name} />
              <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold font-headline text-foreground">{user.name}</h1>
              <p className="text-muted-foreground">{user.localOrganisation}</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="w-6 h-6 text-primary"/>
                My Agenda
              </CardTitle>
              <CardDescription>Your personalized schedule of bookmarked events and sessions.</CardDescription>
            </CardHeader>
            <CardContent>
                {bookmarkedItems.length > 0 ? (
                    <Accordion type="multiple" defaultValue={Object.keys(groupedAgenda)} className="w-full space-y-2">
                        {Object.entries(groupedAgenda).map(([date, items]) => (
                             <AccordionItem value={date} key={date} className="border rounded-lg px-3 bg-background">
                                <AccordionTrigger className="hover:no-underline py-3">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-semibold text-foreground">{date}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-1">
                                    <div className="space-y-1 border-t pt-2">
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
               <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-primary"/>
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
                        <p className="text-sm text-muted-foreground mt-1">This feature is coming soon! You'll be able to scan badges to exchange contact info.</p>
                     </div>
                )}
            </CardContent>
          </Card>

        </div>
      </main>
    </PageWrapper>
  );
}
