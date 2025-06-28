
'use client';
import { Card } from "@/components/ui/card";
import { Clock, MapPin, Award, BrainCircuit, Calendar, Coffee, Flame, Activity, Mic, Users } from "lucide-react";
import type { Event } from "@/lib/data";
import Link from "next/link";

const getEventIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('football') || lowerTitle.includes('aerobics')) return <Activity className="w-5 h-5" />;
    if (lowerTitle.includes('skill') || lowerTitle.includes('session') || lowerTitle.includes('academy')) return <BrainCircuit className="w-5 h-5" />;
    if (lowerTitle.includes('ceremony') || lowerTitle.includes('banquet')) return <Award className="w-5 h-5" />;
    if (lowerTitle.includes('speech') || lowerTitle.includes('debate')) return <Mic className="w-5 h-5" />;
    if (lowerTitle.includes('assembly') || lowerTitle.includes('meeting')) return <Users className="w-5 h-5" />;
    if (lowerTitle.includes('campfire') || lowerTitle.includes('storytelling')) return <Flame className="w-5 h-5" />;
    if (lowerTitle.includes('breakfast') || lowerTitle.includes('lunch')) return <Coffee className="w-5 h-5" />;
    return <Calendar className="w-5 h-s" />;
};


export function TodayEventCard({ event }: { event: Event }) {
    return (
        <Link href={`/timetable#${event.id}`} className="block h-full group">
            <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/50 h-full p-3 flex flex-col">
                <div className="flex-grow">
                    <div className="flex items-start gap-2">
                        <span className="text-primary mt-1">{getEventIcon(event.title)}</span>
                        <p className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors flex-1">{event.title}</p>
                    </div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground pt-2 mt-auto pl-7">
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
