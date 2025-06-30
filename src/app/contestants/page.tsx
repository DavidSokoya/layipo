
'use client';

import * as React from 'react';
import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { ArrowLeft, Crown, Vote, User, Award } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Contestant = {
    name: string;
    school: string;
    image: string;
    bio: string;
    contestantNumber: number;
    gender: 'male' | 'female';
}

const femaleFinalists: Contestant[] = [
    {
        name: "Awofodu Maryam O",
        school: "JCIN Lautech",
        image: "https://i.pravatar.cc/150?u=AwofoduMaryamO",
        bio: "An advocate for youth empowerment and sustainable development, Maryam is passionate about creating positive change in her community.",
        contestantNumber: 1,
        gender: 'female',
    },
    {
        name: "Adewale Precious Queen",
        school: "JCIN Funaab",
        image: "https://i.pravatar.cc/150?u=AdewalePreciousQueen",
        bio: "A future leader dedicated to championing educational reforms and creating opportunities for underprivileged students.",
        contestantNumber: 2,
        gender: 'female',
    },
    {
        name: "Chineye Emeka",
        school: "JCIN ABU",
        image: "https://i.pravatar.cc/150?u=ChineyeEmeka",
        bio: "A visionary leader with a focus on entrepreneurship, Chineye aims to inspire her peers to build innovative solutions for local challenges.",
        contestantNumber: 3,
        gender: 'female',
    },
    {
        name: "Praise APO",
        school: "JCIN UNIBEN",
        image: "https://i.pravatar.cc/150?u=PraiseAPO",
        bio: "A natural-born leader and advocate for mental health awareness. Praise aims to use the platform to destigmatize mental health conversations and promote wellness initiatives across campuses.",
        contestantNumber: 4,
        gender: 'female',
    },
    {
        name: "Faiza Sulaiman",
        school: "JCIN BUK",
        image: "https://i.pravatar.cc/150?u=FaizaSulaiman",
        bio: "Passionate about environmental sustainability, Faiza is working on projects that promote green energy and conservation.",
        contestantNumber: 5,
        gender: 'female',
    }
]

const maleFinalists: Contestant[] = [
    {
        name: "Abdulmuiz Adeagbo A.",
        school: "JCIN Lautech",
        image: "https://i.pravatar.cc/150?u=AbdulmuizAdeagbo",
        bio: "A tech enthusiast and innovator, Abdulmuiz is developing solutions to bridge the digital divide and empower his community with tech skills.",
        contestantNumber: 6,
        gender: 'male',
    },
    {
        name: "Inioluwa John Tinuola",
        school: "JCIN Funaab",
        image: "https://i.pravatar.cc/150?u=InioluwaJohnTinuola",
        bio: "Dedicated to improving public health, Inioluwa is involved in community health campaigns and dreams of a more accessible healthcare system.",
        contestantNumber: 7,
        gender: 'male',
    },
     {
        name: "Innocent Monday",
        school: "JCIN ABU",
        image: "https://i.pravatar.cc/150?u=InnocentMonday",
        bio: "An artist and social activist, Innocent uses his creativity to highlight social issues and inspire a new generation of change-makers.",
        contestantNumber: 8,
        gender: 'male',
    },
    {
        name: "Musa A. Ramalan",
        school: "JCIN NSUK",
        image: "https://i.pravatar.cc/150?u=MusaARamalan",
        bio: "A champion for social justice, Musa is committed to advocating for the rights of marginalized communities and fostering inclusive growth.",
        contestantNumber: 9,
        gender: 'male',
    },
    {
        name: "Yusuf Abdullahi",
        school: "JCIN BUK",
        image: "https://i.pravatar.cc/150?u=YusufAbdullahi",
        bio: "An aspiring economist, Yusuf is passionate about financial literacy and creating sustainable economic opportunities for young people.",
        contestantNumber: 10,
        gender: 'male',
    },
]

const judges = [
    { name: 'Miss Ibadan 2024', title: 'Special Guest Judge', image: 'https://i.pravatar.cc/150?u=MissIbadan' },
    { name: '2025 JCI Nigeria Director', title: 'Growth and Development', image: 'https://i.pravatar.cc/150?u=JCIDirector' }
]

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft as { days: number, hours: number, minutes: number, seconds: number };
    };

    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).length ? Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="flex flex-col items-center">
            <span className="text-lg sm:text-xl font-bold font-mono text-primary">{String(value).padStart(2, '0')}</span>
            <span className="text-xs uppercase text-muted-foreground">{interval}</span>
        </div>
    )) : <span className="text-lg font-bold text-primary">The moment is here!</span>;

    return (
        <Card className="bg-primary/10">
            <CardHeader className="p-4">
                <CardDescription className="text-center text-primary font-semibold">Coronation Night Countdown</CardDescription>
                <div className="flex justify-around items-center mt-2">
                    {timerComponents}
                </div>
            </CardHeader>
        </Card>
    );
};

function ContestantCard({ contestant, onSelect }: { contestant: Contestant, onSelect: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            layout
        >
            <Card className="flex flex-col text-center overflow-hidden transition-all duration-300 hover:shadow-xl group h-full">
                <CardHeader className="p-3">
                    <Avatar className="w-16 h-16 mx-auto mb-2 border-4 border-primary/20 group-hover:border-primary transition-colors">
                        <AvatarImage src={contestant.image} alt={contestant.name} />
                        <AvatarFallback>{contestant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-sm font-semibold">{contestant.name}</CardTitle>
                    <CardDescription className="text-xs">{contestant.school}</CardDescription>
                </CardHeader>
                <CardFooter className="p-2 mt-auto bg-muted/50">
                    <Button variant="ghost" size="sm" className="w-full text-xs" onClick={onSelect}>
                        <User className="mr-2 h-4 w-4" /> View Profile
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

function ContestantProfileModal({ contestant, open, onOpenChange }: { contestant: Contestant | null, open: boolean, onOpenChange: (open: boolean) => void }) {
    if (!contestant) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[90vw] max-w-md p-0">
                <div className="p-6 pt-10 text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20 shadow-lg">
                        <AvatarImage src={contestant.image} alt={contestant.name} />
                        <AvatarFallback>{contestant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold font-headline">{contestant.name}</DialogTitle>
                    </DialogHeader>
                    <p className="text-primary font-medium mt-1">{contestant.school}</p>
                    <p className="text-base text-foreground/80 mt-4 text-center">{contestant.bio}</p>
                </div>
                <DialogFooter className="bg-muted/50 p-4">
                    <Button className="w-full" disabled>
                        <Vote className="mr-2 h-4 w-4"/> Vote Now (Coming Soon)
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function ContestantsPage() {
    const [selectedContestant, setSelectedContestant] = React.useState<Contestant | null>(null);
    const [activeTab, setActiveTab] = React.useState('female');
    const coronationDate = "2025-07-04T21:00:00"; // Friday, 4th July 2025, 9:00 PM

    return (
        <PageWrapper>
            <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="relative flex items-center justify-center">
                        <Button asChild variant="ghost" size="icon" className="absolute left-0">
                            <Link href="/">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="sr-only">Back to Home</span>
                            </Link>
                        </Button>
                        <Logo />
                    </div>
                    <header className="text-center">
                        <h1 className="text-2xl font-bold font-headline tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                           Mr &amp; Miss Collegiate 2025 Finalists
                        </h1>
                        <p className="mt-2 text-base text-muted-foreground max-w-3xl mx-auto">
                            Meet the brilliant leaders vying for the crown. Your votes will decide who moves forward. Get ready to support your champions!
                        </p>
                    </header>
                    
                    <CountdownTimer targetDate={coronationDate} />

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="female">Female Finalists</TabsTrigger>
                            <TabsTrigger value="male">Male Finalists</TabsTrigger>
                        </TabsList>
                        <div className='mt-4'>
                            <AnimatePresence mode="wait">
                                {activeTab === 'female' && (
                                    <motion.div
                                        key="female"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                                    >
                                        {femaleFinalists.map((c) => (
                                            <ContestantCard key={c.contestantNumber} contestant={c} onSelect={() => setSelectedContestant(c)} />
                                        ))}
                                    </motion.div>
                                )}
                                {activeTab === 'male' && (
                                   <motion.div
                                        key="male"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                                    >
                                        {maleFinalists.map((c) => (
                                            <ContestantCard key={c.contestantNumber} contestant={c} onSelect={() => setSelectedContestant(c)} />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Tabs>

                    <div className="text-center my-6">
                        <h2 className="text-xl font-bold font-headline tracking-tight text-foreground sm:text-2xl">
                           Meet Our Esteemed Judges
                        </h2>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                           {judges.map(judge => (
                                <Card key={judge.name} className="bg-card shadow-sm">
                                    <CardContent className="p-4 text-center">
                                        <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-primary/20">
                                            <AvatarImage src={judge.image} alt={judge.name} />
                                            <AvatarFallback>{judge.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <h3 className="text-lg font-semibold">{judge.name}</h3>
                                        <p className="text-sm text-muted-foreground">{judge.title}</p>
                                    </CardContent>
                                </Card>
                           ))}
                        </div>
                    </div>
                    
                    <Card className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-center">
                        <CardHeader className="p-4">
                            <div className="flex justify-center items-center gap-2">
                                <Crown className="h-6 w-6"/>
                                <CardTitle className="text-xl">Who will be crowned?</CardTitle>
                            </div>
                            <CardDescription className="text-black/80 text-sm">
                                Join the excitement at the Collegiate Conference, July 3rd-6th at Ilaji Resort, Ibadan!
                            </CardDescription>
                        </CardHeader>
                    </Card>

                </div>
                 <ContestantProfileModal contestant={selectedContestant} open={!!selectedContestant} onOpenChange={() => setSelectedContestant(null)} />
            </main>
        </PageWrapper>
    );
}
