'use client';

import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const contestants = [
    {
        name: "Mary Idoko",
        school: "JCIN Nsuk",
        image: "https://i.pravatar.cc/150?u=MaryIdoko",
        description: "Brings a spark of creativity and determination. Get ready to witness her exceptional talent and skills as she take on the challenge. Let's cheer her on! 🎉💪",
        contestantNumber: 15,
    },
    {
        name: "Praise Apo",
        school: "JCIN UNIBEN",
        image: "https://i.pravatar.cc/150?u=PraiseApo",
        description: "Praise is bold, brilliant, and beautifully confident. She embodies the true spirit of leadership and excellence. Join us in cheering her on as she vies for the crown. Your support means the world!",
        contestantNumber: 12,
    }
]

export default function ContestantsPage() {
    return (
        <PageWrapper>
            <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
                <div className="max-w-4xl mx-auto space-y-12">
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
                        <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                           Meet the Contestants: Mr & Miss Collegiate 2025
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                           The spotlight is back, and it’s shining on brilliance! We’re proud to unveil the remarkable young leaders vying for the crown in this year’s Mr & Miss Collegiate. From campuses across the nation, these vibrant individuals bring intellect, charisma, and purpose to the stage.
                        </p>
                        <p className="mt-2 text-base text-muted-foreground max-w-3xl mx-auto">
                            Voting begins soon and only the top 7 with the highest votes will move on, so get ready to vote, rally your campus, and support your champions!
                        </p>
                    </header>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {contestants.map((c) => (
                             <Card key={c.name} className="flex flex-col text-center overflow-hidden transition-all duration-300 hover:shadow-xl">
                                <CardHeader className="p-6">
                                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                                        <AvatarImage src={c.image} alt={c.name} />
                                        <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <CardTitle>{c.name}</CardTitle>
                                    <CardDescription>{c.school}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow p-6 pt-0">
                                    <p className="text-muted-foreground">{c.description}</p>

                                </CardContent>
                                <CardFooter className="p-4 bg-muted/50 mt-auto">
                                    <Button variant="ghost" className="w-full font-bold text-primary">
                                        Contestant #{c.contestantNumber}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center my-8">
                        <h2 className="text-2xl font-bold font-headline tracking-tight text-foreground sm:text-3xl">
                           Meet Our Esteemed Judges
                        </h2>
                        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
                            <div className="text-center">
                                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                                    <AvatarImage src="https://i.pravatar.cc/150?u=MissIbadan" alt="Miss Ibadan 2024" />
                                    <AvatarFallback>MI</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-semibold">Miss Ibadan 2024</h3>
                                <p className="text-muted-foreground">Special Guest Judge</p>
                            </div>
                             <div className="text-center">
                                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                                    <AvatarImage src="https://i.pravatar.cc/150?u=JCIDirector" alt="JCI Director" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-semibold">2025 JCI Nigeria Director</h3>
                                <p className="text-muted-foreground">Growth and Development</p>
                            </div>
                        </div>
                    </div>
                    
                    <Card className="bg-primary/10 text-center">
                        <CardHeader>
                            <CardTitle>Who will be crowned?</CardTitle>
                            <CardDescription>
                                Join the excitement at the Collegiate Conference, July 3rd-6th at Ilaji Resort, Ibadan! With special guest judge Miss Ibadan, this competition promises to be unforgettable. Don't miss the talent showcases, interviews, and fashion parades!
                            </CardDescription>
                        </CardHeader>
                    </Card>

                </div>
            </main>
        </PageWrapper>
    );
}
