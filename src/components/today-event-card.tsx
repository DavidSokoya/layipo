'use client';
import { Card } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import type { Event } from "@/lib/data";
import Link from "next/link";

export function TodayEventCard({ event }: { event: Event }) {
    return (
        <Link href={`/timetable#${event.id}`} className="block h-full group">
            <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/50 h-full p-4 flex flex-col">
                <div className="flex-grow">
                    <p className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">{event.title}</p>
                    <p className="text-sm text-muted-foreground pt-1">{event.role}</p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground pt-3 mt-auto">
                    <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1.5" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center ml-4">
                        <MapPin className="w-3 h-3 mr-1.5" />
                        <span className="truncate">{event.location}</span>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
