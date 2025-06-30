
'use server';

export type EventCategory = 
  | 'Main Events & Ceremonies' 
  | 'Competitions & Pageants' 
  | 'Skill Development' 
  | 'Networking & Socials' 
  | 'Meetings & Assemblies';

export type Event = {
  id: string;
  date: string;
  time: string;
  title:string;
  location: string;
  role: string;
  description: string;
  dressCode: string;
  image?: string;
  dataAiHint?: string;
  href?: string;
  category: EventCategory;
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
  category: 'Skill Development';
};
