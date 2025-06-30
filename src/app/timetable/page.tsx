
'use client';
import * as React from 'react';
import { ArrowLeft } from 'lucide-react';
import { events } from '@/lib/data/events';
import type { Event } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PageWrapper } from '@/components/page-wrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { EventCard } from '@/components/event-card';
import { PageHeader } from '@/components/ui/page-header';


export default function TimetablePage() {
  const groupedEvents = React.useMemo(() => {
    return events.reduce<Record<string, Event[]>>((acc, event) => {
      const date = event.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});
  }, []);

  const initialTab = React.useMemo(() => {
    const parseDate = (dateStr: string): Date => {
      const cleanDateStr = dateStr.split(', ')[1].replace(/(\d+)(st|nd|rd|th)/, '$1');
      return new Date(cleanDateStr);
    };
    
    const sortedDates = Object.keys(groupedEvents).sort((a, b) => {
      return parseDate(a).getTime() - parseDate(b).getTime();
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingDate = sortedDates.find(dateStr => parseDate(dateStr).getTime() >= today.getTime());

    return upcomingDate || sortedDates[0];
  }, [groupedEvents]);

  const eventDays = Object.entries(groupedEvents);

  return (
    <PageWrapper>
        <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
            <div className="max-w-4xl mx-auto">
                 <PageHeader />
                <header className="text-center mb-12">
                    <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        Event Timetable
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore the full schedule for LAYIPO 25. Here you can find all sessions, workshops, and activities.
                    </p>
                </header>

                <Tabs defaultValue={initialTab} className="w-full">
                    <ScrollArea className="w-full whitespace-nowrap">
                    <TabsList className="inline-flex h-auto p-0 gap-3 bg-transparent">
                        {eventDays.map(([date]) => {
                        const dayAbbr = date.split(',')[0].slice(0, 3);
                        const dayNum = date.split(', ')[1].split(' ')[0].replace(/\D/g, '');

                        return (
                            <TabsTrigger
                            key={date}
                            value={date}
                            className="flex flex-col items-center justify-center h-auto w-16 rounded-lg p-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-accent/80 data-[state=inactive]:bg-card"
                            >
                            <span className="text-xs font-semibold uppercase tracking-wider">{dayAbbr}</span>
                            <span className="text-2xl font-bold mt-1">{dayNum}</span>
                            </TabsTrigger>
                        );
                        })}
                    </TabsList>
                    <ScrollBar orientation="horizontal" className="mt-2" />
                    </ScrollArea>

                    {eventDays.map(([date, dayEvents]) => {
                    return (
                        <TabsContent key={date} value={date} className="mt-6">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">{date}</h2>
                        {dayEvents.length === 0 ? (
                            <div className="text-center text-muted-foreground py-10">
                            No events scheduled for this day.
                            </div>
                        ) : (
                            <div className="grid gap-6 grid-cols-1">
                            {dayEvents.map((event) => (
                                <EventCard key={event.id} event={event} layout="horizontal" />
                            ))}
                            </div>
                        )}
                        </TabsContent>
                    );
                    })}
                </Tabs>
            </div>
        </main>
    </PageWrapper>
  );
}
