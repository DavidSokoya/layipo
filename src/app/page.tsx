'use client';
import * as React from 'react';
import { Bell, Shirt, MapPin, Clock, Info, UserCheck } from 'lucide-react';
import { events, type Event } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Logo } from '@/components/ui/logo';
import { PageWrapper } from '@/components/page-wrapper';
import { cn } from '@/lib/utils';

function DressCodeModal({
  event,
  open,
  onOpenChange,
}: {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shirt className="w-5 h-5 text-primary" /> Dress Code: {event.dressCode.title}
          </DialogTitle>
          <DialogDescription>Official guidelines for {event.title}.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            {event.dressCode.details.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const roleColors: Record<string, string> = {
  'Delegates': 'border-l-status-amber',
  'LOC/COC': 'border-l-status-red',
  'LOC/COC/Host President': 'border-l-status-red',
  'LOs': 'border-l-status-red',
  'Registered Trainers': 'border-l-status-green',
  'CC/LOP/CD': 'border-l-status-blue',
  'Council Members': 'border-l-status-blue',
  'Council Members/LOPs': 'border-l-status-blue',
  'Noble House Members': 'border-l-primary',
  'All': 'border-l-border',
};

function EventCard({ event }: { event: Event }) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSetReminder = () => {
    toast({
      title: 'Reminder Set!',
      description: `We'll notify you before "${event.title}" starts.`,
    });
  };

  const colorClass = roleColors[event.role] || 'border-l-border';

  return (
    <>
      <Card
        className={cn(
          'flex flex-col transition-all duration-300 hover:shadow-xl border-l-4',
          colorClass
        )}
      >
        <CardHeader>
          <CardTitle className="text-primary-600">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-start text-sm text-muted-foreground">
            <Info className="w-4 h-4 mr-2 mt-1 shrink-0" />
            <span>{event.description}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleSetReminder}>
            <Bell className="w-4 h-4 mr-2" />
            Set Reminder
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
            <Shirt className="w-4 h-4 mr-2" />
            Dress Code
          </Button>
        </CardFooter>
      </Card>
      {isModalOpen && <DressCodeModal event={event} open={isModalOpen} onOpenChange={setIsModalOpen} />}
    </>
  );
}

export default function TimetablePage() {
  const [filter, setFilter] = React.useState('All');

  const roles = ['All', ...Array.from(new Set(events.map((e) => e.role)))];

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

  const eventDays = Object.entries(groupedEvents);

  return (
    <PageWrapper>
      <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Logo />
          </div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground">
              Event Timetable
            </h1>
            <p className="text-muted-foreground mt-1">Your personalized schedule for the conference.</p>
          </div>

          <Card className="mb-8 shadow-sm">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                Filter by Audience
              </h3>
              <RadioGroup
                defaultValue="All"
                onValueChange={setFilter}
                className="flex flex-wrap gap-x-6 gap-y-4"
              >
                {roles.map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <RadioGroupItem value={role} id={`role-${role}`} />
                    <Label htmlFor={`role-${role}`} className="cursor-pointer hover:text-primary">
                      {role}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="space-y-10">
            {eventDays.map(([date, dayEvents]) => {
              const filteredDayEvents =
                filter === 'All'
                  ? dayEvents
                  : dayEvents.filter((event) => event.role === filter);

              if (filteredDayEvents.length === 0) {
                return null;
              }

              return (
                <div key={date}>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                    {date}
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredDayEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
