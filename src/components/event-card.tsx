'use client';

import * as React from 'react';
import Image from 'next/image';
import { Shirt, MapPin, Clock, Info, Star } from 'lucide-react';

import type { Event, Venue } from '@/lib/types';
import { venues } from '@/lib/data/venues';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const venuesMap = venues.reduce((acc, venue) => {
  acc[venue.name] = venue;
  return acc;
}, {} as Record<string, Venue>);

const roleBadgeColors: Record<string, string> = {
  'General Delegates': 'bg-status-amber text-amber-foreground',
  'LOC/COC': 'bg-status-red text-red-foreground',
  'Council Members': 'bg-status-blue text-blue-foreground',
  'Registered Trainers': 'bg-status-green text-green-foreground',
  'Noble House Members': 'bg-primary text-primary-foreground',
  'All': 'bg-muted text-muted-foreground',
};

function VenueModal({
  venueName,
  open,
  onOpenChange,
}: {
  venueName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const venue = venuesMap[venueName];

  if (!venue) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="m-4 rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" /> {venue.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="aspect-video overflow-hidden rounded-lg">
            <Image
              src={venue.image}
              alt={venue.name}
              width={600}
              height={400}
              className="object-cover w-full h-full"
              data-ai-hint={venue.dataAiHint}
            />
          </div>
          <p className="text-sm text-muted-foreground">{venue.description}</p>
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


type EventCardProps = {
  event: Event;
  layout?: 'vertical' | 'horizontal';
};

export function EventCard({ event, layout = 'horizontal' }: EventCardProps) {
  const { toast } = useToast();
  const { user, toggleBookmark } = useUser();
  const [selectedVenue, setSelectedVenue] = React.useState<string | null>(null);

  const isBookmarked = user?.bookmarkedEventIds.includes(event.id) || false;

  const handleToggleBookmark = () => {
    toggleBookmark(event.id);
    toast({
      title: !isBookmarked ? 'Event Bookmarked!' : 'Bookmark Removed',
      description: `"${event.title}" has been ${!isBookmarked ? 'added to' : 'removed from'} your agenda.`,
    });
  };

  const badgeColorClass = roleBadgeColors[event.role] || 'bg-muted text-muted-foreground';
  const eventImage = event.image || 'https://placehold.co/600x400.png';

  const isHorizontal = layout === 'horizontal';

  return (
    <>
      <Card
        id={event.id}
        className={cn(
          'overflow-hidden transition-all duration-300 w-full flex flex-col group scroll-mt-24',
          isHorizontal && 'sm:flex-row'
        )}
      >
        <div className={cn(
            "relative",
            isHorizontal ? "sm:w-1/3" : "h-48"
        )}>
            <Badge className={cn("absolute top-2 left-2 z-10", badgeColorClass)}>{event.role}</Badge>
            <div className='overflow-hidden h-48 sm:h-full'>
                 <Image
                    src={eventImage}
                    alt={event.title}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={event.dataAiHint}
                    />
            </div>
        </div>
        <div className={cn(
            "flex flex-col p-4",
            isHorizontal && "sm:w-2/3 sm:p-6"
        )}>
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-lg md:text-xl break-words">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow space-y-2 pb-3">
                <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                </div>
              <div className="flex items-start text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 mt-1 shrink-0" />
                 <div className="flex flex-wrap items-center gap-x-1">
                    {event.location.split(', ').map((part, index, arr) => (
                        <React.Fragment key={part}>
                        <button
                            onClick={() => venuesMap[part.trim()] && setSelectedVenue(part.trim())}
                            className={cn(
                            "hover:underline hover:text-primary transition-colors text-left",
                            !venuesMap[part.trim()] && "pointer-events-none"
                            )}
                            disabled={!venuesMap[part.trim()]}
                        >
                            {part.trim()}
                        </button>
                        {index < arr.length - 1 && <span className="text-muted-foreground/80">,</span>}
                        </React.Fragment>
                    ))}
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Shirt className="w-4 h-4 mr-2" />
                <span>{event.dressCode.title}</span>
              </div>
              <div className="flex items-start text-sm text-muted-foreground pt-2">
                  <Info className="w-4 h-4 mr-2 mt-1 shrink-0" />
                  <span>{event.description}</span>
                </div>
            </CardContent>
            <CardFooter className="p-0 flex justify-start gap-2 pt-0 mt-auto">
              <Button variant={isBookmarked ? 'default' : 'outline'} size="sm" onClick={handleToggleBookmark}>
                <Star className={cn("w-4 h-4", isBookmarked && "fill-current")} />
                <span className='hidden sm:inline'>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </Button>
            </CardFooter>
        </div>
      </Card>
      {selectedVenue && <VenueModal venueName={selectedVenue} open={!!selectedVenue} onOpenChange={() => setSelectedVenue(null)} />}
    </>
  );
}
