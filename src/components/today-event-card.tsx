'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import type { Event } from "@/lib/data";
import Link from "next/link";
import { cn } from "@/lib/utils";

const roleColors: Record<string, string> = {
  'General Delegates': 'border-l-status-amber',
  'LOC/COC': 'border-l-status-red',
  'Council Members': 'border-l-status-blue',
  'Registered Trainers': 'border-l-status-green',
  'Noble House Members': 'border-l-primary',
  'All': 'border-l-border',
};

export function TodayEventCard({ event }: { event: Event }) {
    const colorClass = roleColors[event.role] || 'border-l-border';
    
    return (
        <Link href={`/timetable#${event.id}`} className="block h-full">
            <Card className={cn("transition-all duration-300 hover:shadow-lg border-l-4 h-full", colorClass)}>
                <CardContent className="p-3 space-y-1 flex flex-col justify-center h-full">
                    <p className="font-semibold text-sm leading-tight">{event.title}</p>
                    <div className="flex items-center text-xs text-muted-foreground pt-1">
                        <Clock className="w-3 h-3 mr-1.5" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1.5" />
                        <span className="truncate">{event.location}</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
