



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
  image?: string;
  dataAiHint?: string;
  href?: string;
};

export type Venue = {
  name: string;
  description: string;
  image: string;
  dataAiHint: string;
};

// Represents the public profile of a user, used for connections.
export type PublicUserProfile = {
  name: string;
  localOrganisation: string;
  whatsappNumber: string;
  imageUrl?: string;
};

// Represents the full profile of the currently logged-in user.
export type UserProfile = PublicUserProfile & {
  bookmarkedEventIds: string[];
  connections: PublicUserProfile[];
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
  { name: 'Training Hall', description: 'Dedicated space for workshops and training sessions.', image: 'https://placehold.co/600x400.png', dataAiHint: 'training hall' },
  { name: 'Main Hall', description: 'The primary hall for large gatherings and keynote presentations.', image: 'https://placehold.co/600x400.png', dataAiHint: 'conference hall' },
  { name: 'Favour Hall', description: 'A secondary hall used for parallel sessions and smaller events.', image: 'https://placehold.co/600x400.png', dataAiHint: 'meeting room' },
  { name: 'Marquee Hall', description: 'A large, elegant marquee for major ceremonies and banquets.', image: 'https://placehold.co/600x400.png', dataAiHint: 'event marquee' },
  { name: 'Main Bowl', description: 'The main outdoor arena for sports and large-scale activities.', image: 'https://placehold.co/600x400.png', dataAiHint: 'sports arena' },
  { name: 'Open Space', description: 'Designated outdoor areas for networking, lunch, and casual gatherings.', image: 'https://placehold.co/600x400.png', dataAiHint: 'park networking' },
  { name: 'Registration Desk', description: 'The central point for all delegate registrations and documentation.', image: 'https://placehold.co/600x400.png', dataAiHint: 'registration desk' },
  { name: 'LOC Room', description: 'The dedicated operations room for the Local Organizing Committee.', image: 'https://placehold.co/600x400.png', dataAiHint: 'operations room' },
  { name: 'Hotel Restaurants', description: 'Various restaurants within the resort hotels serving meals.', image: 'https://placehold.co/600x400.png', dataAiHint: 'hotel restaurant' },
  { name: 'Pool Side', description: 'The area around the swimming pool, used for informal meetings and relaxation.', image: 'https://placehold.co/600x400.png', dataAiHint: 'poolside lounge' },
  { name: 'Car Parks', description: 'Designated parking areas for attendees\' vehicles.', image: 'https://placehold.co/600x400.png', dataAiHint: 'parking lot' },
  { name: 'Ilaji Resort', description: 'The main resort complex hosting the convention.', image: 'https://placehold.co/600x400.png', dataAiHint: 'luxury resort' },
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
    date: 'Wed, 2nd July 2025',
    time: '9:00 am–4:00 pm',
    title: 'COC/LOC Arrival',
    location: 'LOC Room',
    role: 'LOC/COC',
    description: 'Arrival and check-in for the Convention Organizing Committee and Local Organizing Committee members.',
    dressCode: dressCodeDetails['Casual'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'committee meeting',
  },
  {
    id: 'w2',
    date: 'Wed, 2nd July 2025',
    time: '9:00 am–7:00 pm',
    title: 'JCI Social Enterprise Academy – Day I',
    location: 'Training Hall',
    role: 'Registered Trainers',
    description: 'The first day of an intensive academy for registered trainers focusing on social enterprise.',
    dressCode: dressCodeDetails['Formal'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'business workshop',
  },
  {
    id: 'w3',
    date: 'Wed, 2nd July 2025',
    time: '4:00 pm–6:00 pm',
    title: 'COC/LOC Meeting',
    location: 'Ilaji Resort',
    role: 'LOC/COC',
    description: 'An important coordination meeting for all COC and LOC members to finalize preparations.',
    dressCode: dressCodeDetails['Casual'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'team meeting',
  },
  {
    id: 'w4',
    date: 'Wed, 2nd July 2025',
    time: '6:00 pm–10:00 pm',
    title: 'Branding/Setup (Registration Desk, Event Halls)',
    location: 'Main Hall, Ilaji Resort',
    role: 'LOC/COC',
    description: 'Final branding and setup of key event areas by the organizing committees.',
    dressCode: dressCodeDetails['Casual'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'event setup',
  },
  // Thursday
  {
    id: 'th1',
    date: 'Thursday, 3rd July 2025',
    time: '9:00 am–6:00 pm',
    title: 'JCI Social Enterprise Academy – Day II',
    location: 'Training Hall',
    role: 'Registered Trainers',
    description: 'The second day of the Social Enterprise Academy, continuing the deep-dive sessions.',
    dressCode: dressCodeDetails['Formal'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'business workshop',
  },
  {
    id: 'th2',
    date: 'Thursday, 3rd July 2025',
    time: '9:00 am–6:00 pm',
    title: 'Registration/Documentation',
    location: 'Registration Desk',
    role: 'General Delegates',
    description: 'Official registration and documentation for all arriving delegates.',
    dressCode: dressCodeDetails['Not stated'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'registration desk',
  },
  {
    id: 'th3',
    date: 'Thursday, 3rd July 2025',
    time: '10:00 am–12:00 pm',
    title: 'Media Rounds',
    location: 'TBA',
    role: 'Council Members',
    description: 'Media engagement sessions for committee and leadership members.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'media interview',
  },
  {
    id: 'th4',
    date: 'Thursday, 3rd July 2025',
    time: '12:00 pm–2:00 pm',
    title: 'Courtesy Visit',
    location: 'TBA',
    role: 'Council Members',
    description: 'Official courtesy visits by the convention leadership.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'official visit',
  },
  {
    id: 'th5',
    date: 'Thursday, 3rd July 2025',
    time: '12:00 pm–2:00 pm',
    title: 'Lunch',
    location: 'Open Space',
    role: 'All',
    description: 'A casual lunch break for delegates to refresh and network.',
    dressCode: dressCodeDetails['Casual'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'group lunch',
  },
  {
    id: 'th6',
    date: 'Thursday, 3rd July 2025',
    time: '2:15 pm–3:45 pm',
    title: 'Skill Development Session I: Personal Branding & Advocacy for Sustainable Leadership',
    location: 'Favour Hall',
    role: 'General Delegates',
    description: 'A powerful session with JCIN Amb. Adepoju Joel on building impactful leadership. Theme: From vision to action: rising together for a sustainable tomorrow.',
    dressCode: dressCodeDetails['Formal'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'leadership seminar',
  },
  {
    id: 'th7',
    date: 'Thursday, 3rd July 2025',
    time: '4:00 pm–6:30 pm',
    title: 'Football Competition Preliminaries',
    location: 'Main Bowl',
    role: 'All',
    description: 'The exciting preliminary matches of the inter-organization football competition.',
    dressCode: dressCodeDetails['Sports Wear'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'football match',
  },
  {
    id: 'th8',
    date: 'Thursday, 3rd July 2025',
    time: '7:00 pm–8:30 pm',
    title: 'Collegiate Council Meeting',
    location: 'Favour Hall',
    role: 'Council Members',
    description: 'A formal meeting for all members of the Collegiate Council.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'council meeting',
  },
  {
    id: 'th9',
    date: 'Thursday, 3rd July 2025',
    time: '8:00 pm–11:00 pm',
    title: 'Storytelling Time / Campfire',
    location: 'Main Bowl',
    role: 'All',
    description: 'A relaxing evening of storytelling and networking around a campfire.',
    dressCode: dressCodeDetails['Casual'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'campfire stories',
  },
  // Friday
  {
    id: 'f1',
    date: 'Friday, 4th July 2025',
    time: '7:00 am–8:00 am',
    title: 'Hotels Breakfast',
    location: 'Hotel Restaurants',
    role: 'All',
    description: 'Breakfast available for all convention attendees at their respective hotels.',
    dressCode: dressCodeDetails['Casual'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'hotel breakfast',
  },
  {
    id: 'f2',
    date: 'Friday, 4th July 2025',
    time: '8:30 am–9:45 am',
    title: 'Morning Show',
    location: 'Marquee Hall',
    role: 'All',
    description: 'An engaging morning show to kickstart the day with news, interviews, and updates.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'morning show',
  },
  {
    id: 'f3',
    date: 'Friday, 4th July 2025',
    time: '10:00 am–11:45 am',
    title: 'Skill Dev. Session II: Digital Skills for the Future',
    location: 'Favour Hall',
    role: 'All',
    description: 'Leveraging AI & Tech for Social Impact with trainer Taiwo Tayo Babalola.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'tech workshop',
  },
   {
    id: 'f3b',
    date: 'Friday, 4th July 2025',
    time: '10:00 am–11:45 am',
    title: 'Skill Dev. Session II: Design Thinking for Social Innovation',
    location: 'Marquee Hall',
    role: 'All',
    description: 'Unlock the power of design thinking and strategy for meaningful change with trainer Tomiwa Anjorin.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'design thinking',
  },
  {
    id: 'f4',
    date: 'Friday, 4th July 2025',
    time: '12:00 pm–1:30 pm',
    title: 'Speech Contest / Debate Championship',
    location: 'Favour Hall',
    role: 'All',
    description: 'Witness the final rounds of the thrilling speech and debate competitions.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'public speaking',
  },
  {
    id: 'f5',
    date: 'Friday, 4th July 2025',
    time: '12:00 pm–2:15 pm',
    title: 'Collegiate General Assembly',
    location: 'Marquee Hall',
    role: 'Council Members',
    description: 'The formal general assembly for the collegiate council and local presidents.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'general assembly',
  },
  {
    id: 'f6',
    date: 'Friday, 4th July 2025',
    time: '1:30 pm–2:15 pm',
    title: 'Lunch',
    location: 'Open Space',
    role: 'All',
    description: 'A well-deserved lunch break for all attendees.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'group lunch',
  },
  {
    id: 'f7',
    date: 'Friday, 4th July 2025',
    time: '2:30 pm–4:30 pm',
    title: 'Skill Dev. Session III: Inclusive Leadership',
    location: 'Favour Hallt',
    role: 'All',
    description: 'Building Teams That Thrive with trainer Dr. Oyenike Adeleke.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'leadership workshop',
  },
   {
    id: 'f8',
    date: 'Friday, 4th July 2025',
    time: '2:30 pm–4:30 pm',
    title: 'Skill Dev. Session III: Life After School',
    location: 'Marquee Hall',
    role: 'All',
    description: 'A special session by JCI Eko. Theme: Post-grad Playbook: Mindset, Moves, & Mastery.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'career seminar',
  },
  {
    id: 'f9',
    date: 'Friday, 4th July 2025',
    time: '6:00 pm–6:45 pm',
    title: 'Opening Ceremony Red Carpet',
    location: 'Marquee Hall',
    role: 'All',
    description: 'Walk the red carpet and get your photo taken before the grand opening ceremony.',
    dressCode: dressCodeDetails['Local Fabric'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'red carpet',
  },
  {
    id: 'f10',
    date: 'Friday, 4th July 2025',
    time: '7:00 pm–9:00 pm',
    title: 'OJUDE LAYIPO Opening Ceremony',
    location: 'Marquee Hall',
    role: 'All',
    description: 'The official grand opening ceremony of the convention.',
    dressCode: dressCodeDetails['Local Fabric'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'opening ceremony',
  },
  {
    id: 'f11',
    date: 'Friday, 4th July 2025',
    time: '9:00 pm–12:00 am',
    title: 'Mr & Miss Collegiate',
    location: 'Marquee Hall',
    role: 'All',
    description: 'A fun and glamorous pageant to crown Mr & Miss Collegiate.',
    dressCode: dressCodeDetails['Casual'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'beauty pageant',
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
    dressCode: dressCodeDetails['JCI T-shirt/Sports Wear'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'group aerobics',
  },
  {
    id: 's2',
    date: 'Saturday, 5th July 2025',
    time: '7:45 am–9:15 am',
    title: 'JCI Nigeria Noble House Breakfast Meeting',
    location: 'Main Bowl',
    role: 'Noble House Members',
    description: 'An exclusive breakfast meeting for members of the JCI Nigeria Noble House.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'breakfast meeting',
  },
  {
    id: 's3',
    date: 'Saturday, 5th July 2025',
    time: '9:30 AM',
    title: 'ASCEND COFFEE CHAT',
    location: 'Marquee Hall',
    role: 'All',
    description: 'Join the Collegiate Chairperson for a special Townhall Meeting where voices will be heard, ideas will flow, and leadership will get personal.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'coffee chat meeting',
    href: '/coffee-chat'
  },
  {
    id: 's4',
    date: 'Saturday, 5th July 2025',
    time: '11:10 am–12:30 am',
    title: 'Ask Presidency',
    location: 'Marquee Hall',
    role: 'All',
    description: 'An open Q&A session with the JCI presidency. Your questions answered live.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'q a session',
  },
  {
    id: 's5',
    date: 'Saturday, 5th July 2025',
    time: '12:30 am–1:00 pm',
    title: 'Strategy Review Plan Session',
    location: 'Marquee Hall',
    role: 'All',
    description: 'A session dedicated to reviewing and discussing strategic plans.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'strategy meeting',
  },
  {
    id: 's6',
    date: 'Saturday, 5th July 2025',
    time: '1:05 pm–2:20 pm',
    title: 'Theme / Panel Discussion Session',
    location: 'Marquee Hall',
    role: 'All',
    description: 'A deep dive into the convention\'s main theme with a panel of expert speakers.',
    dressCode: dressCodeDetails['Business'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'panel discussion',
  },
  {
    id: 's7',
    date: 'Saturday, 5th July 2025',
    time: '2:30 pm–4:00 pm',
    title: 'Football Competition Finals',
    location: 'Main Bowl',
    role: 'All',
    description: 'The final match of the football competition. Come cheer for the finalists!',
    dressCode: dressCodeDetails['Casual'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'football final',
  },
  {
    id: 's8',
    date: 'Saturday, 5th July 2025',
    time: '6:00 pm–7:00 pm',
    title: 'Closing Ceremony Red Carpet',
    location: 'Marquee Hall',
    role: 'All',
    description: 'Red carpet arrivals for the elegant closing ceremony and banquet.',
    dressCode: dressCodeDetails['Torch of Black (Formal)'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'red carpet',
  },
  {
    id: 's9',
    date: 'Saturday, 5th July 2025',
    time: '7:00 pm–10:00 pm',
    title: 'Banquet / Closing Ceremony',
    location: 'Marquee Hall',
    role: 'All',
    description: 'The official closing banquet and awards ceremony to conclude the convention.',
    dressCode: dressCodeDetails['Torch of Black (Formal)'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'awards banquet',
  },
  {
    id: 's10',
    date: 'Saturday, 5th July 2025',
    time: '10:00 pm–12:00 am',
    title: 'Tungba Night',
    location: 'Marquee Hall',
    role: 'All',
    description: 'A night of music, dance, and celebration to close out the convention.',
    dressCode: dressCodeDetails['Casual'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'party night',
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
    dressCode: dressCodeDetails['Not stated'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'people leaving',
  },
  {
    id: 'su2',
    date: 'Sunday, 6th July 2025',
    time: '7:00 am–9:00 am',
    title: 'Post Conference Evaluation Meeting',
    location: 'Pool Side',
    role: 'LOC/COC',
    description: 'A final evaluation meeting for the organizing committees and host president.',
    dressCode: dressCodeDetails['Not stated'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'evaluation meeting',
  },
];

export const trainings: Training[] = [
  {
    id: 't1',
    date: 'Thursday, 3rd July 2025',
    time: '2:15 PM - 3:45 PM',
    topic: 'Personal Branding & Advocacy for Sustainable Leadership',
    trainer: 'JCIN AMb. Adepoju Joel',
    trainerImage: 'https://i.pravatar.cc/150?u=AdepojuJoel',
    trainerProfile: "When you talk about shaping minds and transforming lives, Joel doesn’t just teach it—he lives it. From leading massive youth trainings in Oyo State to speaking on global platforms, he’s been at the frontlines of building a generation of bold, capable, and impactful leaders. A powerful voice in leadership, learning, and soft skills, Joel Adepoju brings energy, clarity, and real stories that stick.",
    venue: 'Favour Hall, Ilaji Resort',
    theme: 'From vision to action: rising together for a sustainable tomorrow',
  },
  {
    id: 't2',
    date: 'Friday, 4th July 2025',
    time: '10:00 AM - 11:45 AM',
    topic: 'Digital Skills for the Future-Leveraging AI & Tech for Social Impact',
    trainer: 'Taiwo Tayo Babalola',
    trainerImage: 'https://i.pravatar.cc/150?u=TaiwoTayoBabalola',
    trainerProfile: "When it comes to turning numbers into real-life impact, Taiwo Babalola knows the drill. With over ten years of experience in digital transformation and business intelligence, he’s helped big names like Sterling Bank and Airtel make smarter decisions and grow faster. This session isn’t just about skills, it’s about seeing the future and stepping into it with confidence.",
    venue: 'Favour Hall, Ilaji Resort',
  },
  {
    id: 't3',
    date: 'Friday, 4th July 2025',
    time: '10:00 AM - 11:45 AM',
    topic: 'Design Thinking For Social Innovation',
    trainer: 'Tomiwa Anjorin',
    trainerImage: 'https://i.pravatar.cc/150?u=TomiwaAnjorin',
    trainerProfile: "When big organizations need to rethink, reset, or rise, Tomiwa Anjorin is the man they call. With a solid track record of helping both government and private institutions build smart strategies and systems that actually work, Tomiwa brings the kind of experience that goes beyond theory. He doesn’t just talk innovation, he teaches how to design it for meaningful change.",
    venue: 'Marquee Hall, Ilaji Resort',
  },
  {
    id: 't4',
    date: 'Friday, 4th July 2025',
    time: '2:30 PM - 4:30 PM',
    topic: 'Inclusive Leadership- Building Teams That Thrive',
    trainer: 'Dr. Oyenike Adeleke',
    trainerImage: 'https://i.pravatar.cc/150?u=DrOyenikeAdeleke',
    trainerProfile: 'With a Ph.D. in Organizational Psychology, Dr. Oyenike Adeleke is a sought-after consultant on inclusive leadership. Her work focuses on building high-performance teams where diversity and collaboration thrive.',
    venue: 'Favour Hall, Ilaji Resort',
  },
  {
    id: 't5',
    date: 'Friday, 4th July 2025',
    time: '2:30 PM - 4:30 PM',
    topic: 'Life After School',
    trainer: 'JCI Eko',
    trainerImage: 'https://placehold.co/150x150.png',
    trainerProfile: 'JCI Eko is a premier local organization known for its impactful community projects and professional development programs. Their flagship "Life After School" initiative has guided thousands of graduates in their transition to the professional world.',
    venue: 'Marquee Hall, Ilaji Resort',
    theme: 'Post-grad Playbook: Mindset, moves, & mastery',
    special: true,
  },
];
