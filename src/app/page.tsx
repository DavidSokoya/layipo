'use client';

import * as React from 'react';
import {
  Bell,
  Shirt,
  MapPin,
  Clock,
  Info,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { events, type Event } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getStyleTips } from '@/ai/flows/style-tips-flow';
import { Separator } from '@/components/ui/separator';

function DressCodeModal({
  event,
  open,
  onOpenChange,
}: {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [personalStyle, setPersonalStyle] = React.useState('');
  const [generatedTips, setGeneratedTips] = React.useState<string[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGetStyleTips = async () => {
    if (!personalStyle.trim()) return;
    setIsLoading(true);
    setGeneratedTips(null);
    try {
      const response = await getStyleTips({
        eventTitle: event.title,
        dressCodeTitle: event.dressCode.title,
        dressCodeDetails: event.dressCode.details,
        personalStyle: personalStyle,
      });
      setGeneratedTips(response.tips);
    } catch (error) {
      console.error('Error getting style tips:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setPersonalStyle('');
        setGeneratedTips(null);
        setIsLoading(false);
      }, 300);
    }
  }, [open]);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shirt className="w-5 h-5 text-primary" /> Dress Code: {event.dressCode.title}
          </DialogTitle>
          <DialogDescription>
            Official guidelines for {event.title}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            {event.dressCode.details.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>

          <Separator className="my-2" />

          <div className="space-y-3">
             <div className="flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-accent mt-1 shrink-0" />
              <div>
                <Label htmlFor="style" className="font-semibold text-base">
                  Get Personalized AI Tips
                </Label>
                <p className="text-sm text-muted-foreground">Describe your personal style, and we&apos;ll suggest how to adapt it for this event.</p>
              </div>
            </div>
            <Input id="style" placeholder="e.g., modern, minimalist, colorful" value={personalStyle} onChange={(e) => setPersonalStyle(e.target.value)} disabled={isLoading} />
          </div>

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground py-4">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Generating tips...</span>
            </div>
          )}

          {generatedTips && (
             <div className="p-4 mt-2 space-y-3 rounded-md bg-accent/10 border border-accent/20">
                <h4 className="font-semibold text-accent flex items-center gap-2"><Sparkles className="w-4 h-4" /> Your Style, Elevated:</h4>
                <ul className="space-y-2 text-sm text-foreground list-disc list-inside pl-4">
                    {generatedTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                    ))}
                </ul>
             </div>
          )}

        </div>
        <DialogFooter className="gap-2 sm:justify-end flex-col-reverse sm:flex-row">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
            <Button onClick={handleGetStyleTips} disabled={isLoading || !personalStyle.trim()}>
                {isLoading && <Sparkles className="w-4 h-4 mr-2 animate-spin" />}
                {isLoading ? 'Thinking...' : 'Get AI Tips'}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EventCard({ event }: { event: Event }) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSetReminder = () => {
    toast({
      title: 'Reminder Set!',
      description: `We'll notify you before "${event.title}" starts.`,
    });
  };

  return (
    <>
      <Card className="flex flex-col transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary">{event.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 pt-1">
            <Badge variant="outline">{event.role}</Badge>
          </CardDescription>
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
        <CardFooter className="flex gap-2">
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
      {isModalOpen && (
        <DressCodeModal event={event} open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </>
  );
}

export default function TimetablePage() {
  const [filter, setFilter] = React.useState('All');
  const [filteredEvents, setFilteredEvents] = React.useState<Event[]>(events);

  React.useEffect(() => {
    if (filter === 'All') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((event) => event.role === filter));
    }
  }, [filter]);

  const roles = ['All', ...Array.from(new Set(events.map(e => e.role)))];

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">Event Timetable</h1>
          <p className="text-muted-foreground mt-1">
            Your personalized schedule for the conference.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><UserCheck className="w-5 h-5 text-accent"/>Filter by Role</h3>
            <RadioGroup
              defaultValue="All"
              onValueChange={setFilter}
              className="flex flex-wrap gap-4"
            >
              {roles.map(role => (
                <div key={role} className="flex items-center space-x-2">
                  <RadioGroupItem value={role} id={`role-${role}`} />
                  <Label htmlFor={`role-${role}`} className="cursor-pointer hover:text-primary">{role}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
}
