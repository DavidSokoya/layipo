'use client';
import * as React from 'react';
import { Star, Users, Award, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageWrapper } from '@/components/page-wrapper';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const infoCards = [
    {
        title: "Meet the Council",
        href: "/council",
        icon: Users
    },
    {
        title: "Mr & Miss Collegiate",
        href: "/contestants",
        icon: Award
    },
    {
        title: "Football Showdown",
        href: "/football",
        icon: Trophy
    }
];

const HomePageHeader = () => {
    const { user } = useUser();
    const avatarUrl = user?.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(user?.name || 'user')}`;

    if (!user) {
        return (
            <div className="flex justify-between items-center p-4 bg-card border-b">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full animate-pulse"></div>
                    <div className="space-y-2">
                        <div className="w-24 h-5 bg-muted rounded-md animate-pulse"></div>
                        <div className="w-32 h-8 bg-muted rounded-md animate-pulse"></div>
                    </div>
                 </div>
                 <div className="w-24 h-10 bg-muted rounded-md animate-pulse"></div>
            </div>
        )
    }

    return (
        <div className="flex justify-between items-center p-4 bg-card border-b">
            <Link href="/profile" className="flex items-center gap-4 group">
                 <Avatar className="w-16 h-16 border-2 border-primary/20 group-hover:border-primary transition-colors">
                    <AvatarImage src={avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-muted-foreground">Hi, there!</p>
                    <h1 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{user.name}</h1>
                </div>
            </Link>
             <Button variant="outline" asChild>
                <Link href="/profile">
                    <Star className="w-4 h-4 mr-2 text-amber-500" />
                    <span>{(user?.points ?? 0).toLocaleString()}</span>
                </Link>
            </Button>
        </div>
    )
};

const InfoLinkCard = ({ title, href, icon: Icon }: typeof infoCards[0]) => (
     <Link href={href} className="block group">
        <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <Icon className="w-8 h-8 text-primary" />
                <p className="font-semibold text-sm">{title}</p>
            </CardContent>
        </Card>
    </Link>
);

export default function HomePage() {
    return (
        <PageWrapper>
            <main className="flex-1 pb-16">
                <HomePageHeader />
                
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12">
                     <section>
                         <div className="grid grid-cols-3 gap-2 md:gap-4">
                            {infoCards.map((card) => <InfoLinkCard key={card.href} {...card} />)}
                        </div>
                    </section>
                </div>
            </main>
        </PageWrapper>
    );
}
