'use client';
import {
  Trophy,
  Award,
  CalendarCheck2,
  Users,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import type { Badge as BadgeType, Reward } from '@/lib/data';
import { user, rewards } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

const badges: BadgeType[] = [
  { id: '1', title: 'Ice Breaker', description: 'Attended the opening ceremony.', icon: Award, unlocked: true },
  { id: '2', title: 'Early Bird', description: 'Checked-in to a session 10 mins early.', icon: CalendarCheck2, unlocked: true },
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
      description: canAfford ? `Your reward is available for pickup at the info desk.` : `You need ${reward.cost - userPoints} more points to unlock this.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
       <div className="aspect-video overflow-hidden">
         <Image src={reward.image} alt={reward.title} width={600} height={400} className="object-cover w-full h-full transition-transform hover:scale-105" data-ai-hint={reward.hint} />
       </div>
      <CardHeader>
        <CardTitle>{reward.title}</CardTitle>
        <CardDescription>{reward.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleUnlock} disabled={!canAfford} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Star className="w-4 h-4 mr-2" />
          Unlock for {reward.cost} points
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ProfilePage() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Animate progress bar on load
    const timer = setTimeout(() => setProgress((user.points / 5000) * 100), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-primary/20">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.name}`} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">{user.name}</h1>
            <p className="text-muted-foreground">{user.role}</p>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-primary to-teal-600 text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl">Your Progress</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Earn points by participating in events. Next reward tier at 5000 points.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-bold text-center">{user.points} <span className="text-lg font-normal">Points</span></p>
            <Progress value={progress} className="w-full [&>div]:bg-accent" />
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-accent" /> Unlocked Badges
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {badges.map((badge) => (
              <Card key={badge.id} className={`transition-all ${!badge.unlocked && 'opacity-50 grayscale'}`}>
                <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                  <div className={`p-3 rounded-full ${badge.unlocked ? 'bg-accent/20' : 'bg-muted'}`}>
                    <badge.icon className={`w-8 h-8 ${badge.unlocked ? 'text-accent' : 'text-muted-foreground'}`} />
                  </div>
                  <h3 className="font-semibold">{badge.title}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-accent" /> Unlockable Rewards
            </h2>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {rewards.map(reward => (
                    <RewardCard key={reward.id} reward={reward} userPoints={user.points} />
                 ))}
             </div>
        </div>

      </div>
    </main>
  );
}
