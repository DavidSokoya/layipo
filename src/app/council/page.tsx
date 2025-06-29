
'use client';

import * as React from 'react';
import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type CouncilMember = {
    name: string;
    title: string;
    org: string;
    image: string;
    category: 'Executive Council' | 'Directors';
    role: 'Chairperson' | 'Director' | 'Secretary';
    bio: string;
};

const councilMembers: CouncilMember[] = [
    { 
        name: 'Adebayo Sunday', 
        title: 'Collegiate Council Chairperson', 
        org: 'JCIN LAUTECH', 
        image: 'https://i.pravatar.cc/150?u=AdebayoSunday',
        category: 'Executive Council',
        role: 'Chairperson',
        bio: 'Leading the 2025 Collegiate Council with the \'Ascend\' vision, Adebayo is dedicated to fostering growth, unity, and impactful projects across all JCI Nigeria collegiate chapters. His focus is on empowering the next generation of leaders.'
    },
    { 
        name: 'Aisha Bello', 
        title: 'General Secretary', 
        org: 'JCIN TASUED', 
        image: 'https://i.pravatar.cc/150?u=AishaBello',
        category: 'Executive Council',
        role: 'Secretary',
        bio: 'Aisha is the organizational backbone of the council. She manages all administrative tasks, ensures smooth communication, and maintains official records, facilitating efficient council operations.'
    },
    { 
        name: 'Fatima Aliyu', 
        title: 'Director of Growth & Development', 
        org: 'JCIN UNILAG', 
        image: 'https://i.pravatar.cc/150?u=FatimaAliyu',
        category: 'Directors',
        role: 'Director',
        bio: 'Fatima spearheads initiatives for chapter growth and member development. She is responsible for creating strategies that enhance recruitment, retention, and the overall value of JCI membership for students.'
    },
    { 
        name: 'Chinedu Okoro', 
        title: 'Director of Media & Publicity', 
        org: 'JCIN UI', 
        image: 'https://i.pravatar.cc/150?u=ChineduOkoro',
        category: 'Directors',
        role: 'Director',
        bio: 'Chinedu manages the council\'s brand and communication. He ensures that the stories of JCI\'s impact are told effectively across all media platforms, amplifying the voice of collegiate members.'
    },
    { 
        name: 'Bolanle Adeyemi', 
        title: 'Director of Finance', 
        org: 'JCIN OAU', 
        image: 'https://i.pravatar.cc/150?u=BolanleAdeyemi',
        category: 'Directors',
        role: 'Director',
        bio: 'Bolanle oversees the financial health and strategy of the Collegiate Council. She is committed to transparency and sustainable financial management to support the council\'s ambitious programs.'
    },
    { 
        name: 'Emeka Nwosu', 
        title: 'Director of Community Projects', 
        org: 'JCIN FUNAAB', 
        image: 'https://i.pravatar.cc/150?u=EmekaNwosu',
        category: 'Directors',
        role: 'Director',
        bio: 'Emeka champions JCI\'s commitment to community service. He leads the planning and execution of impactful projects that address local needs and create positive, sustainable change.'
    },
];

const filterRoles = ['All', 'Chairperson', 'Director', 'Secretary'];

function MemberProfileModal({ member, open, onOpenChange }: { member: CouncilMember | null, open: boolean, onOpenChange: (open: boolean) => void }) {
    if (!member) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[90vw] max-w-sm p-0">
                <div className="p-6 pt-10 text-center">
                     <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <DialogHeader className="p-0 text-center items-center">
                        <DialogTitle className="text-2xl font-bold font-headline">{member.name}</DialogTitle>
                    </DialogHeader>
                    <p className="text-primary font-medium mt-1">{member.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{member.org}</p>
                    <p className="text-base text-foreground/80 mt-4 text-left">{member.bio}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function CouncilPage() {
    const [filter, setFilter] = React.useState('All');
    const [selectedMember, setSelectedMember] = React.useState<CouncilMember | null>(null);

    const filteredMembers = React.useMemo(() => {
        return councilMembers.filter(member => {
            const matchesFilter = filter === 'All' || member.role === filter;
            return matchesFilter;
        });
    }, [filter]);

    const groupedMembers = React.useMemo(() => {
        return filteredMembers.reduce((acc, member) => {
            const category = member.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(member);
            return acc;
        }, {} as Record<string, CouncilMember[]>);
    }, [filteredMembers]);

    return (
        <PageWrapper>
            <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="relative mb-8 flex items-center justify-center">
                        <Button asChild variant="ghost" size="icon" className="absolute left-0">
                            <Link href="/">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="sr-only">Back to Home</span>
                            </Link>
                        </Button>
                        <Logo />
                    </div>
                    <header className="text-center mb-8">
                        <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                           Meet the 2025 Collegiate Council
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                           A dynamic group of leaders driven by the Ascend vision.
                        </p>
                    </header>

                    <div className="space-y-4 mb-8">
                        <div className="flex flex-wrap gap-2">
                            {filterRoles.map(role => (
                                <Button 
                                    key={role}
                                    variant={filter === role ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setFilter(role)}
                                >
                                    {role}
                                </Button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        <AnimatePresence>
                            {Object.entries(groupedMembers).map(([category, members]) => (
                                members.length > 0 && (
                                    <motion.section 
                                        key={category}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <h2 className="text-lg font-semibold text-foreground bg-background/80 backdrop-blur-sm sticky top-0 py-2 z-10">{category}</h2>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                                            {members.map((member, index) => (
                                                <motion.div
                                                    key={member.name}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    layout
                                                >
                                                    <Card 
                                                        onClick={() => setSelectedMember(member)}
                                                        className="text-center transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer h-full"
                                                    >
                                                        <CardContent className="p-4 flex flex-col items-center h-full">
                                                            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 border-2 border-primary/20">
                                                                <AvatarImage src={member.image} alt={member.name} />
                                                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <div className='mt-auto'>
                                                                <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">{member.name}</h3>
                                                                <p className="text-xs sm:text-sm text-primary font-medium">{member.title}</p>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.section>
                                )
                            ))}
                        </AnimatePresence>
                         {filteredMembers.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-muted-foreground">No members found.</p>
                            </div>
                        )}
                    </div>
                </div>

                <MemberProfileModal member={selectedMember} open={!!selectedMember} onOpenChange={() => setSelectedMember(null)} />

            </main>
        </PageWrapper>
    );
}
