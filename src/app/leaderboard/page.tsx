// This file is new
'use client';

import * as React from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserProfile } from '@/lib/types';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';

import { PageWrapper } from '@/components/page-wrapper';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, User as UserIcon } from 'lucide-react';

function LeaderboardSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="p-3">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-8 text-lg font-bold" />
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                        <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                </Card>
            ))}
        </div>
    )
}

function LeaderboardCard({ user, rank }: { user: UserProfile, rank: number }) {
    const { user: currentUser } = useUser();
    const isCurrentUser = currentUser?.whatsappNumber === user.whatsappNumber;
    const avatarUrl = user.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(user.name)}`;

    const rankColor = rank === 1 ? 'text-amber-400' 
                    : rank === 2 ? 'text-slate-400' 
                    : rank === 3 ? 'text-amber-600' 
                    : 'text-muted-foreground';

    return (
        <Card className={cn("transition-all", isCurrentUser && "ring-2 ring-primary border-primary")}>
            <CardContent className="p-3">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 w-8">
                        {rank <= 3 ? <Trophy className={cn("w-5 h-5", rankColor)} /> : <span className={cn("text-lg font-bold w-5 text-center", rankColor)}>{rank}</span>}
                    </div>
                    <Avatar className="w-12 h-12 border-2 border-muted">
                        <AvatarImage src={avatarUrl} alt={user.name} />
                        <AvatarFallback><UserIcon className="w-6 h-6" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <p className="font-semibold truncate">{user.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{user.localOrganisation}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg text-primary">{user.points}</p>
                        <p className="text-xs text-muted-foreground">Points</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default function LeaderboardPage() {
    const [users, setUsers] = React.useState<UserProfile[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCol = collection(db, 'users');
                const q = query(usersCol, orderBy('points', 'desc'), limit(50));
                const userSnapshot = await getDocs(q);
                const userList = userSnapshot.docs.map(doc => doc.data() as UserProfile);
                setUsers(userList);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <PageWrapper>
            <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
                <div className="max-w-2xl mx-auto">
                    <PageHeader />
                    <header className="text-center mb-12">
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl"
                        >
                           Leaderboard
                        </motion.h1>
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mt-2 text-lg text-muted-foreground"
                        >
                           See who's topping the charts at LAYIPO '25!
                        </motion.p>
                    </header>
                    
                    {isLoading ? (
                        <LeaderboardSkeleton />
                    ) : (
                        <div className="space-y-3">
                            {users.map((user, index) => (
                                <LeaderboardCard key={user.whatsappNumber} user={user} rank={index + 1} />
                            ))}
                        </div>
                    )}

                    {!isLoading && users.length === 0 && (
                        <Card className="text-center py-10 px-4">
                            <CardHeader>
                                <CardTitle>Leaderboard is Empty</CardTitle>
                                <p className="text-muted-foreground">It looks like the competition hasn't started yet. Check back soon!</p>
                            </CardHeader>
                        </Card>
                    )}
                </div>
            </main>
        </PageWrapper>
    )
}
