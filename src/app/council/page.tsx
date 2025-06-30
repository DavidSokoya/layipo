
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
    role: 'Chairperson' | 'Director' | 'Secretary' | 'Executive Council Member';
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
        name: 'Amira Abdullahi', 
        title: 'Executive Council', 
        org: 'JCIN Chapter', 
        image: 'https://i.pravatar.cc/150?u=AmiraAbdullahi',
        category: 'Executive Council',
        role: 'Executive Council Member',
        bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members."
    },
    { 
        name: 'Promise Isaac O', 
        title: 'Executive Council', 
        org: 'JCIN Chapter', 
        image: 'https://i.pravatar.cc/150?u=PromiseIsaacO',
        category: 'Executive Council',
        role: 'Executive Council Member',
        bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members."
    },
    { name: 'Orimogunje Josephine', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=OrimogunjeJosephine', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Chinarulumogu Eze', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=ChinarulumoguEze', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Hamza Muhammed', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=HamzaMuhammed', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Kadril-Lawal Zainab', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=KadrilLawalZainab', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Emmanuella Adaora', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=EmmanuellaAdaora', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Obaloluwa Samuel', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=ObaloluwaSamuel', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Ojo Waheed', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=OjoWaheed', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Yusuf Abdullah A.', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=YusufAbdullahA', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Ileladewa Ademidun M', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=IleladewaAdemidunM', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Adekunle Daniel', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=AdekunleDaniel', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Abdulrahman Abdulraheem', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=AbdulrahmanAbdulraheem', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Cajetan Iyenaobe', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=CajetanIyenaobe', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Raji Elizabeth Omayoza', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=RajiElizabethOmayoza', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Hopeson Akamefula J.', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=HopesonAkamefulaJ', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Oluwafemi Olumuyiwa', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=OluwafemiOlumuyiwa', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Akande Moses', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=AkandeMoses', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Yakubu ToHBi', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=YakubuToHBi', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Falope Oluwafunke', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=FalopeOluwafunke', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Emmanuel Nelson', title: 'Director', org: 'JCIN Chapter', image: 'https://i.pravatar.cc/150?u=EmmanuelNelson', category: 'Directors', role: 'Director', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
];

function MemberProfileModal({ member, open, onOpenChange }: { member: CouncilMember | null, open: boolean, onOpenChange: (open: boolean) => void }) {
    if (!member) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[90vw] max-w-sm p-0">
                <div className="p-6 pt-10 text-center">
                     <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20 rounded-md">
                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
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
    const [selectedMember, setSelectedMember] = React.useState<CouncilMember | null>(null);

    const groupedMembers = React.useMemo(() => {
        return councilMembers.reduce((acc, member) => {
            const category = member.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(member);
            return acc;
        }, {} as Record<string, CouncilMember[]>);
    }, []);

    return (
        <PageWrapper>
            <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="relative mb-6 flex items-center justify-center">
                        <Button asChild variant="ghost" size="icon" className="absolute left-0">
                            <Link href="/">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="sr-only">Back to Home</span>
                            </Link>
                        </Button>
                        <Logo />
                    </div>
                    <header className="text-center mb-4">
                        <h1 className="text-2xl font-bold font-headline tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                           Meet the 2025 Collegiate Council
                        </h1>
                        <p className="mt-2 text-base text-muted-foreground max-w-2xl mx-auto sm:text-lg">
                           A dynamic group of leaders driven by the Ascend vision.
                        </p>
                    </header>
                    
                    <div className="space-y-4">
                        <AnimatePresence>
                            {Object.entries(groupedMembers).map(([category, members]) => (
                                members.length > 0 && (
                                    <motion.section 
                                        key={category}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <h2 className="text-base sm:text-lg font-semibold text-foreground bg-background/80 backdrop-blur-sm sticky top-0 py-2 z-10">{category}</h2>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
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
                                                            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 border-2 border-primary/20 rounded-md">
                                                                <AvatarImage src={member.image} alt={member.name} className="object-cover" />
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
                         {councilMembers.length === 0 && (
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
