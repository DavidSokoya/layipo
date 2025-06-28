'use client';

import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ArrowLeft, Dot } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const groups = {
    "Group A": ["JCIN The Polytechnic Ibadan", "JCIN UI", "JCIN FUNAAB", "JCIN OAU"],
    "Group B": ["JCIN TASUED", "JCIN MAPOLY", "JCIN FCE ABK", "JCIN Ede Poly"],
    "Group C": ["JCIN LAUTECH", "JCIN Eksu", "JCIN FUTA", "JCIN Fedpole"],
    "Group D": ["JCIN Unilag", "JCIN Lasu", "JCIN Yabatech", "JCIN Unilorin"],
};

export default function FootballPage() {
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
                    <header className="text-center mb-12">
                        <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                           THE COLLEGIATE RIVALRY IS ABOUT TO BEGIN!
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                           The pitch is set, the stakes are high, and the group stage draw for the LÁYÍPO ‘25 Football Showdown is finally here! Get ready for tackles, triumphs, and team spirit like never before!
                        </p>
                    </header>
                    
                    <div className="my-8">
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/genkit-llm-77389.appspot.com/o/stagedraw.png?alt=media&token=c191a351-a951-464a-9310-449e7a4a821e"
                            alt="Group Stage Draw"
                            width={1024}
                            height={1024}
                            className="rounded-lg shadow-lg mx-auto w-full h-auto"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        {Object.entries(groups).map(([groupName, teams]) => (
                            <Card key={groupName} className="transition-all duration-300 hover:shadow-lg">
                                <CardHeader className="bg-muted/50">
                                    <CardTitle className="text-primary">{groupName}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 space-y-2">
                                    {teams.map(team => (
                                        <div key={team} className="flex items-center gap-2">
                                            <Dot className="w-5 h-5 text-muted-foreground" />
                                            <p className="font-medium">{team}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                     <div className="text-center text-lg text-muted-foreground mt-12">
                        <p>Who’s making it out of the groups? The journey to the finals starts now!</p>
                     </div>
                </div>
            </main>
        </PageWrapper>
    );
}
