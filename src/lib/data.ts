export type Event = {
  id: string;
  title: string;
  time: string;
  location: string;
  role: 'Delegate' | 'LOC' | 'Trainer' | 'VIP';
  description: string;
  dressCode: {
    title: string;
    details: string[];
  };
};

export const events: Event[] = [
  {
    id: '1',
    title: 'Opening Ceremony',
    time: '09:00 - 10:30',
    location: 'Main Auditorium',
    role: 'VIP',
    description: 'The grand opening of the JCI National Convention. Featuring keynote speakers and a welcome address.',
    dressCode: {
      title: 'Business Formal',
      details: [
        'A full matching business suit, including a jacket and dress pants or a dress skirt.',
        'Pair with a button-down shirt, a blouse, or a shell.',
        'Appropriate footwear includes classic heels, flats, or dress shoes.',
        'Keep accessories professional and understated.'
      ]
    }
  },
  {
    id: '2',
    title: 'Digital Marketing Workshop',
    time: '11:00 - 13:00',
    location: 'Room 201',
    role: 'Trainer',
    description: 'An interactive session on the latest trends in digital marketing and social media strategy.',
    dressCode: {
      title: 'Business Casual',
      details: [
        'Feel free to wear dress slacks, chinos, or a skirt.',
        'Pair with a polo shirt, blouse, or a sweater.',
        'Avoid jeans, t-shirts, and sneakers.',
        'Comfortable yet professional footwear is recommended.'
      ]
    }
  },
  {
    id: '3',
    title: 'Delegate Networking Lunch',
    time: '13:00 - 14:30',
    location: 'Exhibition Hall',
    role: 'Delegate',
    description: 'A chance for all delegates to connect, network, and share experiences over a catered lunch.',
    dressCode: {
      title: 'Smart Casual',
      details: [
        'A step up from casual, but not as formal as business casual.',
        'Well-fitting, dark-wash jeans (no rips) are acceptable.',
        'Pair with a stylish top, a blazer, or a sports coat.',
        'Clean, fashionable sneakers, loafers, or boots are great choices.'
      ]
    }
  },
  {
    id: '4',
    title: 'LOC Coordination Meeting',
    time: '15:00 - 16:00',
    location: 'LOC Headquarters',
    role: 'LOC',
    description: 'A daily sync-up for the Local Organizing Committee to ensure smooth event operations.',
     dressCode: {
      title: 'Team Uniform / Casual',
      details: [
        'Official JCI GO team polo or t-shirt is preferred.',
        'Comfortable pants or shorts suitable for active work.',
        'Comfortable, supportive shoes are a must.',
        'Focus on practicality and comfort for a long day of work.'
      ]
    }
  },
  {
    id: '5',
    title: 'Gala Dinner & Awards Night',
    time: '19:00 - 22:00',
    location: 'Grand Ballroom',
    role: 'VIP',
    description: 'An evening of celebration, fine dining, and recognition of outstanding achievements within JCI.',
    dressCode: {
      title: 'Black Tie Optional',
      details: [
        'For men: A tuxedo is welcome, but a dark suit with a tie is also appropriate.',
        'For women: A floor-length gown, a fancy cocktail dress, or a dressy pantsuit.',
        'Elegant footwear and accessories are encouraged.',
        'This is the most formal event; dress to impress!'
      ]
    }
  },
];

export const user = {
  name: 'Alex Doe',
  role: 'Delegate',
  points: 1250,
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  unlocked: boolean;
};

export type Reward = {
    id: string;
    title: string;
    cost: number;
    description: string;
    image: string;
    hint: string;
}

export const rewards: Reward[] = [
    { id: '1', title: 'JCI Branded Mug', cost: 500, description: 'Start your day with a reminder of your JCI journey.', image: 'https://placehold.co/600x400.png', hint: 'coffee mug' },
    { id: '2', title: 'Exclusive T-Shirt', cost: 1500, description: 'A limited edition T-shirt, only available to top point earners.', image: 'https://placehold.co/600x400.png', hint: 't-shirt' },
    { id: '3', title: 'VIP Seating Voucher', cost: 3000, description: 'Get front-row seats at the next keynote session.', image: 'https://placehold.co/600x400.png', hint: 'event ticket' },
    { id: '4', title: 'Mentorship Session', cost: 5000, description: 'A one-on-one session with a JCI National President.', image: 'https://placehold.co/600x400.png', hint: 'business meeting' },
];
