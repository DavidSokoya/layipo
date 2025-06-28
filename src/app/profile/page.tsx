'use client';
import { Trophy, Award, CalendarCheck2, Users, Star } from 'lucide-react';
import Image from 'next/image';
import type { Badge as BadgeType, Reward } from '@/lib/data';
import { rewards } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import { Logo } from '@/components/ui/logo';
import { PageWrapper } from '@/components/page-wrapper';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';

const badges: BadgeType[] = [
  { id: '1', title: 'Ice Breaker', description: 'Attended opening.', icon: Award, unlocked: true },
  { id: '2', title: 'Early Bird', description: 'Checked-in early.', icon: CalendarCheck2, unlocked: true },
  { id: '3', title: 'Social Butterfly', description: 'Met 5 new people.', icon: Users, unlocked: false },
  { id: '4', title: 'Trivia Master', description: 'Won a trivia game.', icon: Trophy, unlocked: false },
];

function RewardCard({ reward, userPoints }: { reward: Reward; userPoints: number }) {
  const { toast } = useToast();
  const canAfford = userPoints >= reward.cost;

  const handleUnlock = () => {
    toast({
      variant: canAfford ? 'default' : 'destructive',
      title: canAfford ? `Unlocked: ${reward.title}` : 'Not enough points!',
      description: canAfford
        ? 'Your reward is available for pickup at the info desk.'
        : `You need ${reward.cost - userPoints} more points to unlock this.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
      <div className="aspect-video overflow-hidden">
        <Image
          src={reward.image}
          alt={reward.title}
          width={600}
          height={400}
          className="object-cover w-full h-full transition-transform hover:scale-105"
          data-ai-hint={reward.dataAiHint}
        />
      </div>
      <CardHeader>
        <CardTitle>{reward.title}</CardTitle>
        <CardDescription>{reward.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button onClick={handleUnlock} disabled={!canAfford} className="w-full" variant="secondary">
          <Star className="w-4 h-4 mr-2" />
          Unlock for {reward.cost} points
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProfileLoader() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="mb-8">
                <Logo />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-5 w-32" />
                </div>
            </div>
            <Card className="bg-gray-200">
                <CardHeader>
                    <Skeleton className="h-7 w-40" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-8 w-32 mx-auto" />
                    <Skeleton className="h-2 w-full" />
                </CardContent>
            </Card>
             <div>
                <Skeleton className="h-8 w-52 mb-4" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-20 rounded-lg" />
                    ))}
                </div>
            </div>
            <div>
                <Skeleton className="h-8 w-52 mb-4" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-80 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    );
}


export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (user) {
      const timer = setTimeout(() => setProgress((user.points / 5000) * 100), 100);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (isLoading || !user) {
    return (
      <PageWrapper>
        <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
          <ProfileLoader />
        </main>
      </PageWrapper>
    );
  }
  
  const avatarUrl = user.imageUrl || `https://i.pravatar.cc/150?u=${encodeURIComponent(user.name)}`;

  return (
    <PageWrapper>
      <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="mb-8 flex items-center justify-between">
            <Logo />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src={avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold font-headline text-foreground">{user.name}</h1>
              <p className="text-muted-foreground">{user.role}</p>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 text-primary-foreground shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Your Progress</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Next reward tier at 5000 points.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-3xl font-bold text-center">
                {user.points.toLocaleString()} <span className="text-lg font-normal">Points</span>
              </p>
              <Progress value={progress} className="w-full h-2 [&>div]:bg-white" />
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500" /> Unlocked Badges
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {badges.map((badge) => (
                <Card
                  key={badge.id}
                  className={cn(
                    'transition-all border-2',
                    badge.unlocked
                      ? 'border-green-500/50'
                      : 'opacity-60 grayscale border-transparent'
                  )}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div
                      className={cn(
                        'p-2 rounded-full',
                        badge.unlocked ? 'bg-green-500/20' : 'bg-muted'
                      )}
                    >
                      <badge.icon
                        className={cn('w-6 h-6', badge.unlocked ? 'text-green-600' : 'text-muted-foreground')}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{badge.title}</h3>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500" /> Unlockable Rewards
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rewards.map((reward) => (
                <RewardCard key={reward.id} reward={reward} userPoints={user.points} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
