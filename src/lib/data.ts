export type Event = {
  id: string;
  date: string;
  time: string;
  title: string;
  location: string;
  role: string;
  description: string;
  dressCode: {
    title: string;
    details: string[];
  };
};

export type Venue = {
  name: string;
  description: string;
  image: string;
};

export type UserProfile = {
  name: string;
  role: string;
  localOrganisation: string;
  whatsappNumber: string;
  imageUrl?: string;
  points: number;
};

export type Training = {
  id: string;
  topic: string;
  trainer: string;
  trainerImage: string;
  trainerProfile: string;
  date: string;
  time: string;
  venue: string;
  theme?: string;
  special?: boolean;
};


export const venues: Venue[] = [
  { name: 'Training Hall', description: 'Dedicated space for workshops and training sessions.', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&fit=crop&q=80' },
  { name: 'Main Hall', description: 'The primary hall for large gatherings and keynote presentations.', image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop&q=80' },
  { name: 'Favour Hall', description: 'A secondary hall used for parallel sessions and smaller events.', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop&q=80' },
  { name: 'Marquee Hall', description: 'A large, elegant marquee for major ceremonies and banquets.', image: 'https://images.unsplash.com/photo-1542621334-a254cf47763b?w=600&h=400&fit=crop&q=80' },
  { name: 'Main Bowl', description: 'The main outdoor arena for sports and large-scale activities.', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop&q=80' },
  { name: 'Open Space', description: 'Designated outdoor areas for networking, lunch, and casual gatherings.', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop&q=80' },
  { name: 'Registration Desk', description: 'The central point for all delegate registrations and documentation.', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop&q=80' },
  { name: 'LOC Room', description: 'The dedicated operations room for the Local Organizing Committee.', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop&q=80' },
  { name: 'Hotel Restaurants', description: 'Various restaurants within the resort hotels serving meals.', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop&q=80' },
  { name: 'Pool Side', description: 'The area around the swimming pool, used for informal meetings and relaxation.', image: 'https://images.unsplash.com/photo-1561044347-9c6a9c720b48?w=600&h=400&fit=crop&q=80' },
  { name: 'Car Parks', description: 'Designated parking areas for attendees\' vehicles.', image: 'https://images.unsplash.com/photo-1524588893765-a8a287a937a1?w=600&h=400&fit=crop&q=80' },
  { name: 'Ilaji Resort', description: 'The main resort complex hosting the convention.', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&q=80' },
];

const dressCodeDetails = {
  'Casual': {
    title: 'Casual',
    details: [
      'Comfort is key. Feel free to wear jeans, t-shirts, and sneakers.',
      'Relaxed and informal attire is appropriate.',
      'Perfect for social gatherings and informal events.'
    ]
  },
  'Formal': {
    title: 'Formal',
    details: [
      'Also known as Business Formal.',
      'A full matching business suit, including a jacket and dress pants or a dress skirt.',
      'Pair with a button-down shirt, a blouse, or a shell.',
      'Appropriate footwear includes classic heels, flats, or dress shoes.',
      'Keep accessories professional and understated.'
    ]
  },
  'Business': {
    title: 'Business',
    details: [
       'A professional standard of dress.',
       'For men: A suit or dress slacks with a blazer and tie.',
       'For women: A suit, a dress with a jacket, or a skirt with a blouse.',
       'Closed-toe shoes are recommended.'
    ]
  },
  'Sports Wear': {
    title: 'Sports Wear',
    details: [
      'Athletic attire suitable for physical activity.',
      'Think tracksuits, shorts, t-shirts, and athletic shoes.',
      'Comfort and freedom of movement are the priorities.'
    ]
  },
  'Local Fabric': {
    title: 'Local Fabric',
    details: [
      'Celebrate culture with traditional attire.',
      'Wear garments made from local textiles and patterns.',
      'A vibrant and festive dress code.'
    ]
  },
  'Torch of Black (Formal)': {
    title: 'Torch of Black (Formal)',
    details: [
      'A formal dress code with a specific theme.',
      'Men should aim for a dark suit or tuxedo.',
      'Women should wear an elegant evening gown or cocktail dress, preferably in black.',
      'Think sophisticated and classic formalwear.'
    ]
  },
  'JCI T-shirt/Sports Wear': {
    title: 'JCI T-shirt/Sports Wear',
    details: [
      'Show your JCI pride while staying active.',
      'Official JCI t-shirts paired with athletic shorts or pants.',
      'Comfortable and suitable for sports or casual team activities.'
    ]
  },
  'Not stated': {
    title: 'Not Stated',
    details: [
      'There is no specific dress code for this event.',
      'Please dress comfortably and appropriately for the occasion.'
    ]
  },
};

export const events: Event[] = [
  // Wednesday
  {
    id: 'w1',
    date: 'Wednesday, 2nd July 2025',
    time: '9:00 am–4:00 pm',
    title: 'COC/LOC Arrival',
    location: 'LOC Room',
    role: 'LOC/COC',
    description: 'Arrival and check-in for the Convention Organizing Committee and Local Organizing Committee members.',
    dressCode: dressCodeDetails['Casual']
  },
  {
    id: 'w2',
    date: 'Wednesday, 2nd July 2025',
    time: '9:00 am–7:00 pm',
    title: 'JCI Nigeria Social Enterprise Academy – Day I',
    location: 'Training Hall',
    role: 'Registered Trainers',
    description: 'The first day of an intensive academy for registered trainers focusing on social enterprise.',
    dressCode: dressCodeDetails['Formal']
  },
  {
    id: 'w3',
    date: 'Wednesday, 2nd July 2025',
    time: '4:00 pm–6:00 pm',
    title: 'COC/LOC Meeting',
    location: 'Ilaji Resort',
    role: 'LOC/COC',
    description: 'An important coordination meeting for all COC and LOC members to finalize preparations.',
    dressCode: dressCodeDetails['Casual']
  },
  {
    id: 'w4',
    date: 'Wednesday, 2nd July 2025',
    time: '6:00 pm–10:00 pm',
    title: 'Branding/Setup (Registration Desk, Event Halls)',
    location: 'Main Hall',
    role: 'LOC/COC',
    description: 'Final branding and setup of key event areas by the organizing committees.',
    dressCode: dressCodeDetails['Casual']
  },
  // Thursday
  {
    id: 'th1',
    date: 'Thursday, 3rd July 2025',
    time: '9:00 am–6:00 pm',
    title: 'JCI Nigeria Social Enterprise Academy – Day II',
    location: 'Training Hall',
    role: 'Registered Trainers',
    description: 'The second day of the Social Enterprise Academy, continuing the deep-dive sessions.',
    dressCode: dressCodeDetails['Formal']
  },
  {
    id: 'th2',
    date: 'Thursday, 3rd July 2025',
    time: '9:00 am–6:00 pm',
    title: 'Registration/Documentation',
    location: 'Registration Desk',
    role: 'General Delegates',
    description: 'Official registration and documentation for all arriving delegates.',
    dressCode: dressCodeDetails['Not stated']
  },
  {
    id: 'th3',
    date: 'Thursday, 3rd July 2025',
    time: '10:00 am–12:00 pm',
    title: 'Media Rounds',
    location: 'TBA',
    role: 'Council Members',
    description: 'Media engagement sessions for committee and leadership members.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 'th4',
    date: 'Thursday, 3rd July 2025',
    time: '12:00 pm–2:00 pm',
    title: 'Courtesy Visit',
    location: 'TBA',
    role: 'Council Members',
    description: 'Official courtesy visits by the convention leadership.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 'th5',
    date: 'Thursday, 3rd July 2025',
    time: '12:00 pm–2:00 pm',
    title: 'Lunch',
    location: 'Open Space',
    role: 'All',
    description: 'A casual lunch break for delegates to refresh and network.',
    dressCode: dressCodeDetails['Casual']
  },
  {
    id: 'th6',
    date: 'Thursday, 3rd July 2025',
    time: '2:15 pm–3:45 pm',
    title: 'Skill Development Session I (Training 1)',
    location: 'Favour Hall',
    role: 'General Delegates',
    description: 'The first training session aimed at skill development for delegates.',
    dressCode: dressCodeDetails['Formal']
  },
  {
    id: 'th7',
    date: 'Thursday, 3rd July 2025',
    time: '4:00 pm–6:30 pm',
    title: 'Football Competition Preliminaries',
    location: 'Main Bowl',
    role: 'All',
    description: 'The exciting preliminary matches of the inter-organization football competition.',
    dressCode: dressCodeDetails['Sports Wear']
  },
  {
    id: 'th8',
    date: 'Thursday, 3rd July 2025',
    time: '7:00 pm–8:30 pm',
    title: 'Collegiate Council Meeting',
    location: 'Favour Hall',
    role: 'Council Members',
    description: 'A formal meeting for all members of the Collegiate Council.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 'th9',
    date: 'Thursday, 3rd July 2025',
    time: '8:00 pm–11:00 pm',
    title: 'Storytelling Time / Campfire',
    location: 'Main Bowl',
    role: 'All',
    description: 'A relaxing evening of storytelling and networking around a campfire.',
    dressCode: dressCodeDetails['Casual']
  },
  // Friday
  {
    id: 'f1',
    date: 'Friday, 4th July 2025',
    time: '7:00 am–8:00 am',
    title: 'Hotel Breakfast',
    location: 'Hotel Restaurants',
    role: 'All',
    description: 'Breakfast available for all convention attendees at their respective hotels.',
    dressCode: dressCodeDetails['Casual']
  },
  {
    id: 'f2',
    date: 'Friday, 4th July 2025',
    time: '8:30 am–9:45 am',
    title: 'Morning Show',
    location: 'Marquee Hall',
    role: 'All',
    description: 'An engaging morning show to kickstart the day with news, interviews, and updates.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 'f3',
    date: 'Friday, 4th July 2025',
    time: '10:00 am–11:45 am',
    title: 'Skill Dev. Session II (Training 2 & 3)',
    location: 'Marquee Hall, Favour Hall',
    role: 'All',
    description: 'Two parallel training sessions focusing on different skill development tracks.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 'f4',
    date: 'Friday, 4th July 2025',
    time: '12:00 pm–1:30 pm',
    title: 'Speech Contest / Debate Championship',
    location: 'Favour Hall',
    role: 'All',
    description: 'Witness the final rounds of the thrilling speech and debate competitions.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 'f5',
    date: 'Friday, 4th July 2025',
    time: '12:00 pm–2:15 pm',
    title: 'Collegiate General Assembly',
    location: 'Marquee Hall',
    role: 'Council Members',
    description: 'The formal general assembly for the collegiate council and local presidents.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 'f6',
    date: 'Friday, 4th July 2025',
    time: '1:30 pm–2:15 pm',
    title: 'Lunch',
    location: 'Open Space',
    role: 'All',
    description: 'A well-deserved lunch break for all attendees.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 'f7',
    date: 'Friday, 4th July 2025',
    time: '2:30 pm–4:30 pm',
    title: 'Skill Dev. Session III (Training 4)',
    location: 'Favour Hall',
    role: 'All',
    description: 'The third skill development session, open to all attendees.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 'f8',
    date: 'Friday, 4th July 2025',
    time: '2:30 pm–4:30 pm',
    title: 'Life After School',
    location: 'Marquee Hall',
    role: 'All',
    description: 'An insightful session preparing members for professional life after their academic journey.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 'f9',
    date: 'Friday, 4th July 2025',
    time: '6:00 pm–6:45 pm',
    title: 'Opening Ceremony Red Carpet',
    location: 'Marquee Hall',
    role: 'All',
    description: 'Walk the red carpet and get your photo taken before the grand opening ceremony.',
    dressCode: dressCodeDetails['Local Fabric']
  },
  {
    id: 'f10',
    date: 'Friday, 4th July 2025',
    time: '7:00 pm–9:00 pm',
    title: 'OJUDE LAYIPO Opening Ceremony',
    location: 'Marquee Hall',
    role: 'All',
    description: 'The official grand opening ceremony of the convention.',
    dressCode: dressCodeDetails['Local Fabric']
  },
  {
    id: 'f11',
    date: 'Friday, 4th July 2025',
    time: '9:00 pm–12:00 am',
    title: 'Mr & Miss Collegiate',
    location: 'Marquee Hall',
    role: 'All',
    description: 'A fun and glamorous pageant to crown Mr & Miss Collegiate.',
    dressCode: dressCodeDetails['Casual']
  },
  // Saturday
  {
    id: 's1',
    date: 'Saturday, 5th July 2025',
    time: '6:30 am–7:00 am',
    title: 'Aerobics',
    location: 'Main Bowl',
    role: 'All',
    description: 'An energizing morning aerobics session to get your body moving.',
    dressCode: dressCodeDetails['JCI T-shirt/Sports Wear']
  },
  {
    id: 's2',
    date: 'Saturday, 5th July 2025',
    time: '7:45 am–9:15 am',
    title: 'JCI Nigeria Noble House Breakfast Meeting',
    location: 'Main Bowl',
    role: 'Noble House Members',
    description: 'An exclusive breakfast meeting for members of the JCI Nigeria Noble House.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 's3',
    date: 'Saturday, 5th July 2025',
    time: '9:30 am–11:00 am',
    title: 'Morning Show',
    location: 'Marquee Hall',
    role: 'All',
    description: 'The daily morning show with highlights, interviews, and a look at the day ahead.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 's4',
    date: 'Saturday, 5th July 2025',
    time: '11:10 am–12:30 am',
    title: 'Ask the Presidency',
    location: 'Marquee Hall',
    role: 'All',
    description: 'An open Q&A session with the JCI presidency. Your questions answered live.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 's5',
    date: 'Saturday, 5th July 2025',
    time: '12:30 am–1:00 pm',
    title: 'Strategy Review Plan Session',
    location: 'Marquee Hall',
    role: 'All',
    description: 'A session dedicated to reviewing and discussing strategic plans.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 's6',
    date: 'Saturday, 5th July 2025',
    time: '1:05 pm–2:20 pm',
    title: 'Theme/Panel Discussion Session',
    location: 'Marquee Hall',
    role: 'All',
    description: 'A deep dive into the convention\'s main theme with a panel of expert speakers.',
    dressCode: dressCodeDetails['Business']
  },
  {
    id: 's7',
    date: 'Saturday, 5th July 2025',
    time: '2:30 pm–4:00 pm',
    title: 'Football Competition Finals',
    location: 'Main Bowl',
    role: 'All',
    description: 'The final match of the football competition. Come cheer for the finalists!',
    dressCode: dressCodeDetails['Casual']
  },
  {
    id: 's8',
    date: 'Saturday, 5th July 2025',
    time: '6:00 pm–7:00 pm',
    title: 'Closing Ceremony Red Carpet',
    location: 'Marquee Hall',
    role: 'All',
    description: 'Red carpet arrivals for the elegant closing ceremony and banquet.',
    dressCode: dressCodeDetails['Torch of Black (Formal)']
  },
  {
    id: 's9',
    date: 'Saturday, 5th July 2025',
    time: '7:00 pm–10:00 pm',
    title: 'Banquet/Closing Ceremony',
    location: 'Marquee Hall',
    role: 'All',
    description: 'The official closing banquet and awards ceremony to conclude the convention.',
    dressCode: dressCodeDetails['Torch of Black (Formal)']
  },
  {
    id: 's10',
    date: 'Saturday, 5th July 2025',
    time: '10:00 pm–12:00 am',
    title: 'Tungba Night',
    location: 'Marquee Hall',
    role: 'All',
    description: 'A night of music, dance, and celebration to close out the convention.',
    dressCode: dressCodeDetails['Casual']
  },
  // Sunday
  {
    id: 'su1',
    date: 'Sunday, 6th July 2025',
    time: '6:00 am–6:00 pm',
    title: 'Departure',
    location: 'Car Parks',
    role: 'All',
    description: 'Official departure day for all attendees.',
    dressCode: dressCodeDetails['Not stated']
  },
  {
    id: 'su2',
    date: 'Sunday, 6th July 2025',
    time: '7:00 am–9:00 am',
    title: 'Post Conference Evaluation Meeting',
    location: 'Pool Side',
    role: 'LOC/COC',
    description: 'A final evaluation meeting for the organizing committees and host president.',
    dressCode: dressCodeDetails['Not stated']
  },
];


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
}

export const rewards: Reward[] = [
    { id: '1', title: 'JCI Branded Mug', cost: 500, description: 'Start your day with a reminder of your JCI journey.', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&h=400&fit=crop&q=80' },
    { id: '2', title: 'Exclusive T-Shirt', cost: 1500, description: 'A limited edition T-shirt, only available to top point earners.', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=400&fit=crop&q=80' },
    { id: '3', title: 'VIP Seating Voucher', cost: 3000, description: 'Get front-row seats at the next keynote session.', image: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=600&h=400&fit=crop&q=80' },
    { id: '4', title: 'Mentorship Session', cost: 5000, description: 'A one-on-one session with a JCI National President.', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=400&fit=crop&q=80' },
];

export const trainings: Training[] = [
  {
    id: 't1',
    date: 'Thursday, 3rd July 2025',
    time: '2:15 PM - 3:45 PM',
    topic: 'Personal Branding & Advocacy for Sustainable Leadership',
    trainer: 'JCIN AMb. Adepoju Joel',
    trainerImage: 'https://i.pravatar.cc/150?u=AdepojuJoel',
    trainerProfile: 'A renowned expert in leadership and personal development, JCIN Amb. Adepoju Joel specializes in empowering young leaders to create sustainable impact. His dynamic approach combines personal branding with actionable advocacy strategies.',
    venue: 'Favour Hall',
    theme: 'From vision to action: rising together for a sustainable tomorrow',
  },
  {
    id: 't2',
    date: 'Friday, 4th July 2025',
    time: '10:00 AM - 11:45 AM',
    topic: 'Digital Skills for the Future-Leveraging AI & Tech for Social Impact',
    trainer: 'Taiwo Tayo Babalola',
    trainerImage: 'https://i.pravatar.cc/150?u=TaiwoTayoBabalola',
    trainerProfile: 'A tech evangelist and AI specialist, Taiwo Tayo Babalola is passionate about leveraging technology for social good. He has a proven track record of helping organizations and individuals navigate the digital landscape.',
    venue: 'Favour Hall',
  },
  {
    id: 't3',
    date: 'Friday, 4th July 2025',
    time: '10:00 AM - 11:45 AM',
    topic: 'Design Thinking For Social Innovation',
    trainer: 'Tomiwa Anjorin',
    trainerImage: 'https://i.pravatar.cc/150?u=TomiwaAnjorin',
    trainerProfile: 'As a leading voice in social innovation, Tomiwa Anjorin champions design thinking as a core methodology for solving complex community problems. His workshops are known for being highly interactive and outcome-driven.',
    venue: 'Marquee Hall',
  },
  {
    id: 't4',
    date: 'Saturday, 5th July 2025',
    time: '2:30 PM - 3:45 PM',
    topic: 'Inclusive Leadership- Building Teams That Thrive',
    trainer: 'Dr. Oyenike Adeleke',
    trainerImage: 'https://i.pravatar.cc/150?u=DrOyenikeAdeleke',
    trainerProfile: 'With a Ph.D. in Organizational Psychology, Dr. Oyenike Adeleke is a sought-after consultant on inclusive leadership. Her work focuses on building high-performance teams where diversity and collaboration thrive.',
    venue: 'Favour Hall',
  },
  {
    id: 't5',
    date: 'Saturday, 5th July 2025',
    time: '2:30 PM - 4:30 PM',
    topic: 'Life After School',
    trainer: 'JCI Eko',
    trainerImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop&q=80',
    trainerProfile: 'JCI Eko is a premier local organization known for its impactful community projects and professional development programs. Their flagship "Life After School" initiative has guided thousands of graduates in their transition to the professional world.',
    venue: 'Marquee Hall',
    theme: 'Post-grad Playbook: Mindset, moves, & mastery',
    special: true,
  },
];
