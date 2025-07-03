import type { RewardBadge } from '../types';
import { Coffee, Star, ShieldCheck, Users, Award } from 'lucide-react';

export const allRewardBadges: RewardBadge[] = [
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Checked in on the first day!',
    icon: Star,
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Made 5 new connections!',
    icon: Users,
  },
  {
    id: 'perfect-attendance',
    name: 'Perfect Attendance',
    description: 'Attended all your bookmarked sessions.',
    icon: ShieldCheck,
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Attended 3 training sessions.',
    icon: Award,
  },
  {
    id: 'caffeine-connoisseur',
    name: 'Caffeine Connoisseur',
    description: 'Attended the Coffee Chat.',
    icon: Coffee,
  },
];
