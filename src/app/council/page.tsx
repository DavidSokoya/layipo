'use client';

import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const councilMembers = [
    { name: 'Adebayo Sunday', title: 'Collegiate Council Chairperson', org: 'JCIN LAUTECH', image: 'https://i.pravatar.cc/150?u=AdebayoSunday' },
    { name: 'Fatima Aliyu', title: 'Director of Growth & Development', org: 'JCIN UNILAG', image: 'https://i.pravatar.cc/150?u=FatimaAliyu' },
    { name: 'Chinedu Okoro', title: 'Director of Media & Publicity', org: 'JCIN UI', image: 'https://i.pravatar.cc/150?u=ChineduOkoro' },
    { name: 'Bolanle Adeyemi', title: 'Director of Finance', org: 'JCIN OAU', image: 'https://i.pravatar.cc/150?u=BolanleAdeyemi' },
    { name: 'Emeka Nwosu', title: 'Director of Community Projects', org: 'JCIN FUNAAB', image: 'https://i.pravatar.cc/150?u=EmekaNwosu' },
    { name: 'Aisha Bello', title: 'General Secretary', org: 'JCIN TASUED', image: 'https://i.pravatar.cc/150?u=AishaBello' },
];


export default function CouncilPage() {
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
                           Meet the 2025 JCI Nigeria Collegiate Council
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                           We are proud to unveil the 2025 JCI Nigeria Collegiate Council, a dynamic group of leaders driven by the Ascend vision. Together, we’re set to empower, inspire, and create lasting impact across JCI Nigeria.
                        </p>
                    </header>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {councilMembers.map((member) => (
                            <Card key={member.name} className="text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                                <CardContent className="p-6">
                                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                                        <AvatarImage src={member.image} alt={member.name} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                                    <p className="text-primary font-medium">{member.title}</p>
                                    <p className="text-sm text-muted-foreground">{member.org}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </div>
            </main>
        </PageWrapper>
    );
}
