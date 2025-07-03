
'use client';

import * as React from 'react';
import { PageWrapper } from '@/components/page-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type CouncilMember = {
    name: string;
    title: string;
    org: string;
    image: string;
    bio: string;
};

const councilMembers: CouncilMember[] = [
    { name: 'Amira Abdullahi', title: 'Collegiate Chairperson', org: 'JCIN BUK', image: '/images/council/amira_abdullahi.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Promise Isaac O', title: 'Immediate Past CC', org: 'JCIN OAU', image: '/images/council/promise_isaac_o.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Orimogunje Josephine', title: 'CVC Southwest ', org: 'JCIN Chapter', image: '/images/council/orimogunje_josephine.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Chinarulumogu Eze', title: 'CVC SS/SE', org: 'JCIN Chapter', image: '/images/council/hamza_muhammed.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Kadril-Lawal Zainab', title: 'CVC NW', org: 'JCIN Chapter', image: '/images/council/kadril-lawal_zainab.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Emmanuella Adaora', title: 'Council Secretary', org: 'JCIN Chapter', image: '/images/council/emmanuella_adora.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Obaloluwa Samuel', title: 'General Legal Council', org: 'JCIN Chapter', image: '/images/council/obaloluwa_samuel.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Ojo Waheed', title: 'Director of skills and development ', org: 'JCIN Chapter', image: '/images/council/ojo_waheed.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Yusuf Abdullah A.', title: 'Editor in chief', org: 'JCIN Chapter', image: '/images/council/yusuf_abdullah_a.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Ileladewa Ademidun M', title: 'Director of Communications', org: 'JCIN Chapter', image: '/images/council/ileladewa.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Adekunle Daniel', title: 'Director of welfare', org: 'JCIN Chapter', image: '/images/council/adekunle_daniel.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Abdulrahman Abdulraheem', title: 'Director of business and partnership', org: 'JCIN Chapter', image: '/images/council/abdulrahman_abdulraheem.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Cajetan Iyenagbe', title: 'Director of group and retention', org: 'JCIN Chapter', image: '/images/council/cajetan.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Raji Elizabeth Omayoza', title: 'Director of sponsorship', org: 'JCIN Chapter', image: '/images/council/raji.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Hopeson Akamefula J.', title: 'Director project and programs', org: 'JCIN Chapter', image: '/images/council/hopeson_akamefula_j.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Oluwafemi Olumuyiwa', title: 'Director Awards and documentation', org: 'JCIN Chapter', image: '/images/council/oluwafemi_olumuyiwa.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Akande Moses', title: 'Director Conference Director', org: 'JCIN Chapter', image: '/images/council/akande_moses.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Yakubu Tohir', title: 'Executive Ass. to the CC', org: 'JCIN Chapter', image: '/images/council/yakubu_tohbi.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Falope Oluwafunmike', title: 'Personal assistant to the CC on special duties ', org: 'JCIN Chapter', image: '/images/council/falope_oluwafunke.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
    { name: 'Emmanuel Nelson', title: 'Personal assistant to the CC on media', org: 'JCIN Chapter', image: '/images/council/emmanuel_nelson.png', bio: "A dedicated member of the 2025 Collegiate Council, committed to the 'Ascend' vision and empowering JCI members." },
];

function MemberProfileModal({ member, open, onOpenChange }: { member: CouncilMember | null, open: boolean, onOpenChange: (open: boolean) => void }) {
    if (!member) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[90vw] max-w-sm p-0">
                <div className="p-6 pt-10 text-center">
                     <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20 rounded-full">
                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                        <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
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

    return (
        <PageWrapper>
            <main className="flex-1 mb-16">
                 <div className="relative h-[16.66vh] w-full">
                    <Image
                        src="/images/spotlight/council.jpg"
                        data-ai-hint="professional team"
                        alt="Collegiate Council Banner"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                        <div className="absolute top-4 left-4">
                             <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                                <Link href="/">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="sr-only">Back</span>
                                </Link>
                            </Button>
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-bold font-headline tracking-tight sm:text-2xl">
                           Meet the 2025 Collegiate Council
                        </h1>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {councilMembers.map((member, index) => (
                            <React.Fragment key={member.name}>
                                <motion.div
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
                                            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 border-2 border-primary/20 rounded-full">
                                                <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                                <AvatarFallback><User className="w-10 h-10" /></AvatarFallback>
                                            </Avatar>
                                            <div className='mt-auto'>
                                                <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">{member.name}</h3>
                                                <p className="text-xs sm:text-sm text-primary font-medium">{member.title}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                                {index === 1 && (
                                    <div className="col-span-2 sm:hidden">
                                        <Separator className="my-2" />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <MemberProfileModal member={selectedMember} open={!!selectedMember} onOpenChange={() => setSelectedMember(null)} />
            </main>
        </PageWrapper>
    );
}
